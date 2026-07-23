import React, { useState, useEffect } from 'react';
import { Menu, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { HeroHeader } from './components/HeroHeader';
import { EventDetailsCard } from './components/EventDetailsCard';
import { TopicsCard } from './components/TopicsCard';
import { ConversationStarters } from './components/ConversationStarters';
import { FactChecker } from './components/FactChecker';
import { HistoryTimeline } from './components/HistoryTimeline';
import { FeedbackTable } from './components/FeedbackTable';
import { AboutSection } from './components/AboutSection';
import { SettingsSection } from './components/SettingsSection';

import {
  ActiveTab,
  ConversationStarter,
  FactCheckResult,
  HistoryItem,
  FeedbackItem,
  BackendStatus,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('generate');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Form State
  const [interests, setInterests] = useState<string[]>(['AI', 'Cloud', 'Machine Learning']);
  const [eventDescription, setEventDescription] = useState<string>(
    'Tech Summit 2026: Scaling AI Infrastructure & Real-Time Agentic Workflows'
  );

  // API Outputs State
  const [topics, setTopics] = useState<string[]>(['AI', 'Machine Learning', 'Cloud', 'Cyber Security', 'Business']);
  const [topicSummary, setTopicSummary] = useState<string>('Extracted themes based on your profile and event context.');
  const [starters, setStarters] = useState<ConversationStarter[]>([
    {
      id: 'init-1',
      text: "I noticed the keynote on agentic orchestration—are you currently scaling multi-tenant clusters or focusing more on edge inference?",
      category: "Deep Technical",
      icebreakerType: "Topic Opener",
      rationale: "Connects Cloud and AI interests with active industry infrastructure challenges.",
      liked: null
    },
    {
      id: 'init-2',
      text: "With all the recent developments in real-time inference, what's been your team's biggest architectural takeaway this quarter?",
      category: "Industry Trend",
      icebreakerType: "Perspective Prompt",
      rationale: "Encourages open debate on AI workflow execution and reliability.",
      liked: null
    },
    {
      id: 'init-3',
      text: "Which session or panel speaker at today's event are you most looking forward to connecting with afterwards?",
      category: "Event Specific",
      icebreakerType: "Casual Professional",
      rationale: "Low-friction icebreaker relevant to the immediate environment.",
      liked: null
    }
  ]);

  // Loading States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Stores
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    status: 'online',
    backend: 'online',
    models: ['GPT2', 'BART MNLI', 'Wikipedia API', 'Gemini 3.6 Flash'],
    healthStatus: 'all_green',
  });

  // Fetch initial history and feedback on load
  useEffect(() => {
    fetchHistory();
    fetchFeedback();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/history');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setHistory(data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch history:', err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/feedback');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setFeedback(data);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch feedback:', err);
    }
  };

  // Generate Action (Section 2 & 3 & 4)
  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMsg(null);

    try {
      // Step 1: Analyze event for topics
      const analyzeRes = await fetch('/analyze-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, eventDescription }),
      });

      let extractedTopics = topics;
      if (analyzeRes.ok) {
        const analyzeData = await analyzeRes.json();
        if (analyzeData.topics && Array.isArray(analyzeData.topics)) {
          extractedTopics = analyzeData.topics;
          setTopics(extractedTopics);
          if (analyzeData.summary) setTopicSummary(analyzeData.summary);
        }
      }

      // Step 2: Generate conversation starters
      const genRes = await fetch('/generate-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, eventDescription, topics: extractedTopics }),
      });

      if (genRes.ok) {
        const genData = await genRes.json();
        if (genData.starters && Array.isArray(genData.starters)) {
          setStarters(genData.starters);
        }
      }

      // Refresh history list
      await fetchHistory();
    } catch (err) {
      console.error('Generation error:', err);
      setErrorMsg('Failed to generate starters. Please check network connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Feedback Action
  const handleFeedback = async (starterId: string, starterText: string, sentiment: 'like' | 'dislike') => {
    // Update local starter state
    setStarters((prev) =>
      prev.map((item) => (item.id === starterId ? { ...item, liked: sentiment === 'like' } : item))
    );

    try {
      const res = await fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          starterId,
          starterText,
          sentiment,
          eventContext: eventDescription.slice(0, 60),
        }),
      });

      if (res.ok) {
        await fetchFeedback();
      }
    } catch (err) {
      console.warn('Feedback post error:', err);
    }
  };

  // Fact Check Action (Section 5)
  const handleFactCheck = async (query: string): Promise<FactCheckResult | null> => {
    try {
      const res = await fetch('/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        return data as FactCheckResult;
      }
    } catch (err) {
      console.error('Fact check error:', err);
    }
    return null;
  };

  // Load selected history item into view
  const handleSelectHistory = (item: HistoryItem) => {
    setEventDescription(item.eventDescription);
    setInterests(item.interests);
    setTopics(item.topics);
    if (item.starters && item.starters.length > 0) {
      setStarters(item.starters);
    }
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-white font-sans antialiased selection:bg-[#7C3AED] selection:text-white flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        status={backendStatus}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header Bar for Mobile */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#171A23]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-white">Networking Assistant</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs text-[#B8B8B8] font-mono">Online</span>
          </div>
        </header>

        {/* Main View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-white/60 hover:text-white text-xs underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: GENERATE / DASHBOARD */}
          {activeTab === 'generate' && (
            <div className="space-y-8">
              {/* Section 1: Hero Header */}
              <HeroHeader />

              {/* Section 2: Event Details Card */}
              <EventDetailsCard
                interests={interests}
                setInterests={setInterests}
                eventDescription={eventDescription}
                setEventDescription={setEventDescription}
                onGenerate={handleGenerate}
                isLoading={isGenerating}
              />

              {/* Section 3: Topics Card */}
              <TopicsCard
                topics={topics}
                summary={topicSummary}
                isLoading={isGenerating}
              />

              {/* Section 4: Conversation Starters */}
              <ConversationStarters
                starters={starters}
                onFeedback={handleFeedback}
                onRegenerateAll={handleGenerate}
                isLoading={isGenerating}
              />

              {/* Section 5: Fact Checker preview */}
              <div className="pt-4">
                <FactChecker onCheck={handleFactCheck} />
              </div>

              {/* Section 6 & 7: History & Feedback Shortcuts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <HistoryTimeline history={history.slice(0, 2)} onSelectHistory={handleSelectHistory} />
                <FeedbackTable feedback={feedback.slice(0, 4)} />
              </div>
            </div>
          )}

          {/* TAB 2: FACT CHECKER */}
          {activeTab === 'factcheck' && (
            <div className="space-y-8">
              <HeroHeader />
              <FactChecker onCheck={handleFactCheck} />
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-8">
              <HeroHeader />
              <HistoryTimeline history={history} onSelectHistory={handleSelectHistory} />
            </div>
          )}

          {/* TAB 4: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="space-y-8">
              <HeroHeader />
              <FeedbackTable feedback={feedback} />
            </div>
          )}

          {/* TAB 5: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              <HeroHeader />
              <AboutSection status={backendStatus} />
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <HeroHeader />
              <SettingsSection />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
