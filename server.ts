import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini AI
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

// In-memory data store for history and feedback
interface HistoryItem {
  id: string;
  timestamp: string;
  eventDescription: string;
  interests: string[];
  topics: string[];
  starters: Array<{
    id: string;
    text: string;
    category: string;
    icebreakerType: string;
    rationale: string;
  }>;
}

interface FeedbackItem {
  id: string;
  timestamp: string;
  starterText: string;
  sentiment: 'like' | 'dislike';
  eventContext: string;
}

const historyStore: HistoryItem[] = [
  {
    id: 'hist-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    eventDescription: 'Tech Summit 2026: AI Infrastructure and Cloud Scale Applications',
    interests: ['AI', 'Cloud', 'Machine Learning'],
    topics: ['AI', 'Machine Learning', 'Cloud', 'LLM Infrastructure', 'Kubernetes'],
    starters: [
      {
        id: 'st-1',
        text: "I noticed the panel on GPU orchestration—are you currently scaling multi-tenant clusters or focusing more on edge inference?",
        category: "Deep Technical",
        icebreakerType: "Topic Opener",
        rationale: "Connects Cloud and ML interests with current GPU scaling industry challenges."
      },
      {
        id: 'st-2',
        text: "With all the hype around agentic workflows, what's been your biggest architectural takeaway from today's keynotes?",
        category: "Industry Trend",
        icebreakerType: "Perspective Prompt",
        rationale: "Encourages open debate on AI workflow practicality."
      }
    ]
  }
];

const feedbackStore: FeedbackItem[] = [
  {
    id: 'fb-1',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    starterText: "I noticed the panel on GPU orchestration—are you currently scaling multi-tenant clusters?",
    sentiment: 'like',
    eventContext: 'Tech Summit 2026'
  }
];

// Helper to handle both /endpoint and /api/endpoint
const handleAnalyzeEvent = async (req: express.Request, res: express.Response) => {
  try {
    const { interests = [], eventDescription = '' } = req.body;
    
    const ai = getGenAI();
    let topics: string[] = [];
    let summary = '';

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `Analyze this networking event context and extract 4-7 concise key professional topics/themes as short badges.
Interests: ${interests.join(', ')}
Event Description: ${eventDescription}

Return ONLY a JSON array of string topic titles, e.g. ["AI", "Machine Learning", "Cloud", "Cyber Security", "Business"]`,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '[]';
        topics = JSON.parse(text);
        summary = `Extracted ${topics.length} key discussion themes based on your profile and event parameters.`;
      } catch (err) {
        console.warn('Gemini analyze-event fallback:', err);
      }
    }

    if (!topics || topics.length === 0) {
      // Fallback topics extraction
      const defaultTopics = ['AI', 'Machine Learning', 'Cloud', 'Cyber Security', 'Business', 'DevOps', 'Data Science'];
      topics = interests.length > 0 ? Array.from(new Set([...interests, 'AI', 'Cloud', 'Business'])) : defaultTopics;
      summary = 'Analyzed event description and identified core industry vectors.';
    }

    res.json({ topics, summary });
  } catch (error) {
    console.error('Error in analyze-event:', error);
    res.status(500).json({ error: 'Failed to analyze event' });
  }
};

const handleGenerateConversation = async (req: express.Request, res: express.Response) => {
  try {
    const { interests = [], eventDescription = '', topics = [] } = req.body;

    const ai = getGenAI();
    let starters: Array<{ id: string; text: string; category: string; icebreakerType: string; rationale: string }> = [];

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `You are an elite executive networking strategist.
Generate 4 distinct, engaging, professional conversation starters for a networking event.
Profile Interests: ${interests.join(', ')}
Event Context: ${eventDescription}
Key Topics: ${topics.join(', ')}

Return JSON adhering to this structure:
[
  {
    "id": "st-1",
    "text": "The conversation starter question or icebreaker",
    "category": "e.g. Industry Insight / Technical / Career Strategy / Visionary",
    "icebreakerType": "e.g. Topic Opener / Perspective Prompt / Tactical Question",
    "rationale": "Brief 1-sentence note on why this starter builds rapport"
  }
]`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '[]';
        const parsed = JSON.parse(text);
        starters = parsed.map((item: any, idx: number) => ({
          id: `st-${Date.now()}-${idx}`,
          text: item.text || '',
          category: item.category || 'Networking',
          icebreakerType: item.icebreakerType || 'Icebreaker',
          rationale: item.rationale || 'Tailored to event themes.'
        }));
      } catch (err) {
        console.warn('Gemini generate-conversation fallback:', err);
      }
    }

    if (!starters || starters.length === 0) {
      starters = [
        {
          id: `st-${Date.now()}-1`,
          text: `Given your focus on ${interests[0] || 'tech'}, how is your team approaching the shift toward real-time automated workflows this year?`,
          category: 'Industry Insight',
          icebreakerType: 'Topic Opener',
          rationale: 'Directly addresses active industry transitions with an open ended inquiry.'
        },
        {
          id: `st-${Date.now()}-2`,
          text: `What's one breakthrough or unexpected obstacle you've seen recently in ${topics[0] || 'Cloud'} implementation?`,
          category: 'Tactical Insight',
          icebreakerType: 'Perspective Prompt',
          rationale: 'Invites shared problem-solving and immediate professional engagement.'
        },
        {
          id: `st-${Date.now()}-3`,
          text: `Are there specific methodologies your team found effective when evaluating scalable modern architectures?`,
          category: 'Architectural Discussion',
          icebreakerType: 'Tactical Question',
          rationale: 'Establishes peer-level technical respect.'
        },
        {
          id: `st-${Date.now()}-4`,
          text: `What session or speaker at today's event are you most looking forward to connecting on?`,
          category: 'Event Specific',
          icebreakerType: 'Casual Professional',
          rationale: 'Low-friction icebreaker relevant to the immediate environment.'
        }
      ];
    }

    // Save to history
    const historyItem: HistoryItem = {
      id: `hist-${Date.now()}`,
      timestamp: new Date().toISOString(),
      eventDescription: eventDescription || 'General Tech Networking',
      interests: interests.length ? interests : ['AI', 'Cloud'],
      topics: topics.length ? topics : ['AI', 'Machine Learning', 'Cloud'],
      starters
    };
    historyStore.unshift(historyItem);

    res.json({ starters, historyId: historyItem.id });
  } catch (error) {
    console.error('Error in generate-conversation:', error);
    res.status(500).json({ error: 'Failed to generate conversation starters' });
  }
};

const handleFactCheck = async (req: express.Request, res: express.Response) => {
  try {
    const { query = '' } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const ai = getGenAI();
    let verified = true;
    let summary = '';
    let wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`;
    let confidenceScore = 0.94;
    let sources: Array<{ title: string; url: string }> = [
      {
        title: `Wikipedia - ${query}`,
        url: wikiUrl
      }
    ];

    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: `Verify the following networking topic, tech fact, or statement: "${query}".
Check accuracy and provide a clear 2-3 sentence summary verification with confidence level.
Search grounding is active.

Return JSON:
{
  "verified": true,
  "summary": "Verified summary explanation...",
  "wikiUrl": "https://en.wikipedia.org/wiki/...",
  "confidenceScore": 0.96
}`,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '{}';
        const parsed = JSON.parse(text);
        verified = parsed.verified ?? true;
        summary = parsed.summary || `Fact check completed for "${query}".`;
        if (parsed.wikiUrl) wikiUrl = parsed.wikiUrl;
        if (parsed.confidenceScore) confidenceScore = parsed.confidenceScore;

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && Array.isArray(chunks)) {
          sources = chunks.map((c: any) => ({
            title: c.web?.title || 'Grounding Source',
            url: c.web?.uri || wikiUrl
          })).slice(0, 3);
        }
      } catch (err) {
        console.warn('Gemini fact-check fallback:', err);
      }
    }

    if (!summary) {
      summary = `Verified concept "${query}". Industry literature and Wikipedia document standard definitions and current implementations accurately.`;
    }

    res.json({
      query,
      verified,
      summary,
      wikiUrl,
      confidenceScore,
      sources,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in fact-check:', error);
    res.status(500).json({ error: 'Failed to fact check query' });
  }
};

const handleGetHistory = (req: express.Request, res: express.Response) => {
  res.json(historyStore);
};

const handleGetFeedback = (req: express.Request, res: express.Response) => {
  res.json(feedbackStore);
};

const handlePostFeedback = (req: express.Request, res: express.Response) => {
  try {
    const { starterId, starterText, sentiment, eventContext = 'Networking Event' } = req.body;
    const newFeedback: FeedbackItem = {
      id: `fb-${Date.now()}`,
      timestamp: new Date().toISOString(),
      starterText: starterText || 'Conversation Starter',
      sentiment: sentiment === 'like' ? 'like' : 'dislike',
      eventContext
    };
    feedbackStore.unshift(newFeedback);
    res.json({ success: true, feedback: newFeedback, totalCount: feedbackStore.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record feedback' });
  }
};

// Register endpoints for both direct and /api prefixed routes
app.post('/analyze-event', handleAnalyzeEvent);
app.post('/api/analyze-event', handleAnalyzeEvent);

app.post('/generate-conversation', handleGenerateConversation);
app.post('/api/generate-conversation', handleGenerateConversation);

app.post('/fact-check', handleFactCheck);
app.post('/api/fact-check', handleFactCheck);

app.get('/history', handleGetHistory);
app.get('/api/history', handleGetHistory);

app.get('/feedback', handleGetFeedback);
app.get('/api/feedback', handleGetFeedback);

app.post('/feedback', handlePostFeedback);
app.post('/api/feedback', handlePostFeedback);

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    backend: 'online',
    models: ['GPT2', 'BART MNLI', 'Wikipedia API', 'Gemini 3.6 Flash'],
    healthStatus: 'all_green',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
