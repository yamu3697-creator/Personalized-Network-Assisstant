export interface TopicTheme {
  name: string;
  category?: string;
}

export interface ConversationStarter {
  id: string;
  text: string;
  category: string;
  icebreakerType: string;
  rationale: string;
  liked?: boolean | null;
}

export interface FactCheckResult {
  query: string;
  verified: boolean;
  summary: string;
  wikiUrl: string;
  confidenceScore: number;
  sources: Array<{ title: string; url: string }>;
  timestamp: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  eventDescription: string;
  interests: string[];
  topics: string[];
  starters: ConversationStarter[];
}

export interface FeedbackItem {
  id: string;
  timestamp: string;
  starterText: string;
  sentiment: 'like' | 'dislike';
  eventContext: string;
}

export interface BackendStatus {
  status: 'online' | 'offline';
  backend: string;
  models: string[];
  healthStatus: 'all_green' | 'degraded';
}

export type ActiveTab = 'generate' | 'factcheck' | 'history' | 'feedback' | 'about' | 'settings';
