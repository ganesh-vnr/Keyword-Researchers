export type SearchIntent = 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';

export interface MonthlyTrend {
  month: string;
  volume: number;
}

export interface KeywordMetric {
  id: string;
  keyword: string;
  volume: number;
  cpc: number;
  difficulty: number; // 0 to 100
  intent: SearchIntent;
  competition: number; // 0.0 to 1.0
  trend: MonthlyTrend[];
  trendDirection: 'up' | 'down' | 'stable';
  trendPercentage: number;
  serpFeatures?: string[];
  referringDomainsNeeded?: number;
  category?: string;
  country?: string;
}

export interface KeywordCluster {
  id: string;
  pillarName: string;
  primaryKeyword: string;
  totalVolume: number;
  averageDifficulty: number;
  dominantIntent: SearchIntent;
  keywords: KeywordMetric[];
  contentAngle: string;
}

export interface QuestionItem {
  question: string;
  type: 'what' | 'how' | 'why' | 'where' | 'who' | 'can' | 'are' | 'preposition' | 'comparison';
  volume: number;
  cpc: number;
  difficulty: number;
}

export interface DensityWord {
  phrase: string;
  count: number;
  percentage: number;
  isOverOptimized: boolean;
}

export interface ContentBrief {
  targetKeyword: string;
  suggestedTitle: string;
  targetWordCount: number;
  recommendedHeadings: {
    tag: 'h2' | 'h3';
    text: string;
  }[];
  primaryKeywords: string[];
  secondaryKeywords: string[];
  paaQuestions: string[];
  userIntent: SearchIntent;
  competitorAverageWords: number;
}

export interface CannibalizationEntry {
  url: string;
  keyword: string;
  currentRank: number;
  impressions: number;
  clicks: number;
  status: 'Critical' | 'Moderate' | 'Good';
  recommendedAction: string;
}

export interface SavedKeywordList {
  id: string;
  name: string;
  createdAt: string;
  keywords: KeywordMetric[];
}

export type ActiveTab =
  | 'home'
  | 'tools'
  | 'tool-volume'
  | 'tool-difficulty'
  | 'tool-ideas'
  | 'tool-clustering'
  | 'tool-questions'
  | 'tool-intent'
  | 'tool-density'
  | 'tool-serp-preview'
  | 'tool-brief'
  | 'tool-cannibalization'
  | 'tool-robots-sitemap'
  | 'tool-redirect'
  | 'tool-security-dns'
  | 'tool-youtube'
  | 'tool-roi'
  | 'tool-gap'
  | 'extension'
  | 'compare'
  | 'guides'
  | 'guide-detail'
  | 'saved'
  | 'api-docs'
  | 'about'
  | 'privacy'
  | 'terms';
