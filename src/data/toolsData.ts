import { ActiveTab } from '../types/seo';

export interface ToolDefinition {
  id: ActiveTab;
  name: string;
  category: 'Keyword Research' | 'Content & On-Page' | 'Technical SEO' | 'Video & ROI';
  description: string;
  badge?: string;
  iconName: string;
  popular?: boolean;
}

export const TOOLS_CATALOG: ToolDefinition[] = [
  // Keyword Research
  {
    id: 'tool-volume',
    name: 'Keyword Search Volume & Trends',
    category: 'Keyword Research',
    description: 'Check exact estimated monthly search volumes, CPC, competition score, and 12-month historical trends with seasonal spikes.',
    iconName: 'TrendingUp',
    popular: true,
  },
  {
    id: 'tool-difficulty',
    name: 'Keyword Difficulty Checker',
    category: 'Keyword Research',
    description: 'Accurately assess ranking difficulty (0-100), estimated referring domains required, and top 10 SERP competitor strength.',
    iconName: 'Gauge',
    popular: true,
  },
  {
    id: 'tool-ideas',
    name: 'Keyword Ideas & Long-Tail Suggester',
    category: 'Keyword Research',
    description: 'Discover hundreds of high-potential long-tail keyword variations with intent filtering, volume ranges, and one-click export.',
    iconName: 'Sparkles',
    popular: true,
  },
  {
    id: 'tool-clustering',
    name: 'Keyword Clustering Tool',
    category: 'Keyword Research',
    description: 'Group dozens of raw keywords into organized semantic topic pillars and content clusters to eliminate cannibalization.',
    iconName: 'Layers',
    popular: true,
  },
  {
    id: 'tool-questions',
    name: 'Question & People Also Ask Finder',
    category: 'Keyword Research',
    description: 'Extract real question searches (How, What, Why, Who, Can) and prepositional queries to dominate Google featured snippets.',
    iconName: 'HelpCircle',
    popular: true,
  },
  {
    id: 'tool-intent',
    name: 'Search Intent Classifier',
    category: 'Keyword Research',
    description: 'Automatically classify queries into Informational, Commercial, Transactional, or Navigational intent with SERP feature mapping.',
    iconName: 'Compass',
  },

  // Content & On-Page
  {
    id: 'tool-density',
    name: 'Keyword Density & Content Analyzer',
    category: 'Content & On-Page',
    description: 'Analyze 1-word, 2-word, and 3-word n-gram density, word count, Flesch reading score, and over-optimization warning flags.',
    iconName: 'FileText',
    popular: true,
  },
  {
    id: 'tool-serp-preview',
    name: 'Google SERP Snippet Preview Tool',
    category: 'Content & On-Page',
    description: 'Simulate Google desktop and mobile search snippets with real-time pixel-width calculation (600px desktop, 580px mobile).',
    iconName: 'Eye',
    popular: true,
  },
  {
    id: 'tool-brief',
    name: 'SEO Content Brief Generator',
    category: 'Content & On-Page',
    description: 'Create ready-to-write content briefs with target word counts, primary/secondary keywords, and recommended H2/H3 outline.',
    iconName: 'BookOpen',
    popular: true,
  },
  {
    id: 'tool-cannibalization',
    name: 'Keyword Cannibalization Detector',
    category: 'Content & On-Page',
    description: 'Identify multiple URLs on your domain competing for the identical search query and receive consolidation fixes.',
    iconName: 'AlertTriangle',
  },

  // Technical SEO
  {
    id: 'tool-robots-sitemap',
    name: 'Robots.txt & XML Sitemap Generator',
    category: 'Technical SEO',
    description: 'Generate and validate compliant robots.txt files with crawler directives and XML sitemaps with priority tags.',
    iconName: 'Cpu',
  },
  {
    id: 'tool-redirect',
    name: 'HTTP Redirect & Status Code Checker',
    category: 'Technical SEO',
    description: 'Inspect HTTP response status codes (200, 301, 302, 404, 500), canonical redirect hops, and latency.',
    iconName: 'ArrowRightLeft',
  },
  {
    id: 'tool-security-dns',
    name: 'Security Headers & DNS Inspector',
    category: 'Technical SEO',
    description: 'Check HSTS, Content-Security-Policy, X-Frame-Options headers, SSL status, and verify DNS records.',
    iconName: 'ShieldCheck',
  },

  // Video & ROI
  {
    id: 'tool-youtube',
    name: 'YouTube Tag & Video SEO Optimizer',
    category: 'Video & ROI',
    description: 'Extract tags, evaluate title click-worthiness, and discover high-ranking video tags under the 500-character limit.',
    iconName: 'Video',
  },
  {
    id: 'tool-roi',
    name: 'Organic Traffic & Revenue ROI Calculator',
    category: 'Video & ROI',
    description: 'Forecast monthly organic visitors, conversions, and revenue based on target search volume and SERP rank CTR curves.',
    iconName: 'DollarSign',
    popular: true,
  },
  {
    id: 'tool-gap',
    name: 'Keyword Gap & Competitor Comparison',
    category: 'Video & ROI',
    description: 'Compare keyword portfolios between your domain and competitors to uncover missing content opportunities.',
    iconName: 'BarChart2',
  },
];
