import { KeywordMetric, KeywordCluster, QuestionItem, DensityWord, SearchIntent, ContentBrief } from '../types/seo';

// Helper hash function for deterministic metrics
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Well-known benchmark database for high-accuracy standard terms
const KNOWN_KEYWORDS: Record<string, Partial<KeywordMetric>> = {
  'seo tools': { volume: 74000, cpc: 9.40, difficulty: 78, intent: 'Commercial' },
  'keyword research': { volume: 110000, cpc: 8.20, difficulty: 82, intent: 'Informational' },
  'best crm software': { volume: 33100, cpc: 24.50, difficulty: 85, intent: 'Commercial' },
  'running shoes': { volume: 450000, cpc: 1.85, difficulty: 72, intent: 'Transactional' },
  'crypto wallet': { volume: 165000, cpc: 5.60, difficulty: 68, intent: 'Commercial' },
  'email marketing': { volume: 135000, cpc: 12.80, difficulty: 75, intent: 'Informational' },
  'project management software': { volume: 90500, cpc: 18.20, difficulty: 81, intent: 'Commercial' },
  'buy domain name': { volume: 49500, cpc: 6.45, difficulty: 64, intent: 'Transactional' },
  'what is seo': { volume: 246000, cpc: 4.10, difficulty: 88, intent: 'Informational' },
  'how to start a blog': { volume: 60500, cpc: 3.80, difficulty: 79, intent: 'Informational' },
  'vpn': { volume: 1220000, cpc: 14.20, difficulty: 92, intent: 'Commercial' },
  'web hosting': { volume: 201000, cpc: 21.00, difficulty: 89, intent: 'Commercial' },
  'python tutorial': { volume: 301000, cpc: 1.25, difficulty: 62, intent: 'Informational' },
  'fitness tracker': { volume: 165000, cpc: 2.10, difficulty: 65, intent: 'Commercial' },
  'mortgage calculator': { volume: 2240000, cpc: 11.50, difficulty: 90, intent: 'Informational' },
};

const MONTH_NAMES = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

/**
 * Generates 12-month historical search trend based on keyword characteristics
 */
export function generateMonthlyTrend(keyword: string, baseVolume: number): { month: string; volume: number }[] {
  const hash = hashString(keyword.toLowerCase());
  const lower = keyword.toLowerCase();

  // Seasonality detection
  const isFitness = lower.includes('fitness') || lower.includes('gym') || lower.includes('diet') || lower.includes('weight');
  const isShopping = lower.includes('shoes') || lower.includes('gift') || lower.includes('black friday') || lower.includes('buy');
  const isSummer = lower.includes('travel') || lower.includes('hotel') || lower.includes('flight') || lower.includes('swim');

  return MONTH_NAMES.map((month, idx) => {
    let multiplier = 1.0;
    // Base variance
    const variance = ((hash % (15 + idx * 3)) - 7) / 100;
    multiplier += variance;

    if (isFitness && (month === 'Jan' || month === 'Feb')) {
      multiplier += 0.45;
    } else if (isShopping && (month === 'Nov' || month === 'Dec')) {
      multiplier += 0.55;
    } else if (isSummer && (month === 'Jun' || month === 'Jul' || month === 'Aug')) {
      multiplier += 0.40;
    }

    const calculated = Math.max(10, Math.round(baseVolume * multiplier));
    return {
      month,
      volume: calculated,
    };
  });
}

/**
 * Determine search intent from query tokens
 */
export function determineIntent(keyword: string): SearchIntent {
  const lower = keyword.toLowerCase();

  if (
    lower.startsWith('how to') ||
    lower.startsWith('what is') ||
    lower.startsWith('why') ||
    lower.startsWith('guide') ||
    lower.includes('tutorial') ||
    lower.includes('tips') ||
    lower.includes('meaning') ||
    lower.includes('definition')
  ) {
    return 'Informational';
  }

  if (
    lower.includes('buy') ||
    lower.includes('discount') ||
    lower.includes('coupon') ||
    lower.includes('deal') ||
    lower.includes('cheap') ||
    lower.includes('pricing') ||
    lower.includes('for sale') ||
    lower.includes('order')
  ) {
    return 'Transactional';
  }

  if (
    lower.includes('best') ||
    lower.includes('review') ||
    lower.includes('top') ||
    lower.includes('vs') ||
    lower.includes('versus') ||
    lower.includes('comparison') ||
    lower.includes('alternative') ||
    lower.includes('software')
  ) {
    return 'Commercial';
  }

  if (
    lower.includes('login') ||
    lower.includes('portal') ||
    lower.includes('sign in') ||
    lower.includes('account') ||
    lower.includes('dashboard') ||
    lower.includes('official')
  ) {
    return 'Navigational';
  }

  return 'Informational';
}

/**
 * Calculate Keyword Difficulty & required referring domains
 */
export function calculateDifficulty(keyword: string, volume: number): { difficulty: number; referringDomains: number } {
  const hash = hashString(keyword.toLowerCase());
  const words = keyword.trim().split(/\s+/).length;

  let baseKd = 35;
  // Volume factor
  if (volume > 500000) baseKd += 35;
  else if (volume > 100000) baseKd += 25;
  else if (volume > 20000) baseKd += 15;
  else if (volume > 5000) baseKd += 8;

  // Short queries are notoriously harder
  if (words === 1) baseKd += 20;
  else if (words === 2) baseKd += 10;
  else if (words >= 4) baseKd -= 12;

  // Modulate with hash
  const finalKd = Math.min(98, Math.max(8, baseKd + (hash % 15) - 7));
  
  // Referring domains required to rank in top 5
  const referringDomains = Math.round(Math.pow(finalKd / 10, 2.3) + 3);

  return { difficulty: finalKd, referringDomains };
}

/**
 * Main function: Get full metrics for a single keyword
 */
export function getKeywordMetrics(query: string, country = 'United States'): KeywordMetric {
  const clean = query.trim().toLowerCase();
  const hash = hashString(clean);

  // Check known database
  if (KNOWN_KEYWORDS[clean]) {
    const known = KNOWN_KEYWORDS[clean];
    const vol = known.volume || 10000;
    const trend = generateMonthlyTrend(clean, vol);
    const last = trend[trend.length - 1].volume;
    const prev = trend[trend.length - 2].volume;
    const pct = Math.round(((last - prev) / prev) * 100);

    return {
      id: `kw-${clean.replace(/\s+/g, '-')}`,
      keyword: clean,
      volume: vol,
      cpc: known.cpc || 2.5,
      difficulty: known.difficulty || 60,
      intent: known.intent || determineIntent(clean),
      competition: Math.min(1.0, Number(((known.difficulty || 60) / 100 * 0.95).toFixed(2))),
      trend,
      trendDirection: pct > 5 ? 'up' : pct < -5 ? 'down' : 'stable',
      trendPercentage: Math.abs(pct),
      serpFeatures: ['Featured Snippet', 'People Also Ask', 'Site Links', 'Related Searches'],
      referringDomainsNeeded: Math.round(Math.pow((known.difficulty || 60) / 10, 2.3) + 3),
      country,
    };
  }

  // Algorithmic estimation for any other keyword
  const words = clean.split(/\s+/).length;
  let baseVol: number;
  if (words === 1) {
    baseVol = 20000 + (hash % 120000);
  } else if (words === 2) {
    baseVol = 5400 + (hash % 45000);
  } else if (words === 3) {
    baseVol = 1600 + (hash % 15000);
  } else {
    baseVol = 250 + (hash % 3800);
  }

  const { difficulty, referringDomains } = calculateDifficulty(clean, baseVol);
  const cpc = Number((0.50 + ((hash % 1800) / 100)).toFixed(2));
  const intent = determineIntent(clean);
  const trend = generateMonthlyTrend(clean, baseVol);
  const last = trend[trend.length - 1].volume;
  const prev = trend[trend.length - 2].volume;
  const pct = Math.round(((last - prev) / (prev || 1)) * 100);

  const serpFeatures = ['People Also Ask', 'Related Searches'];
  if (intent === 'Informational') serpFeatures.push('Featured Snippet');
  if (intent === 'Transactional' || intent === 'Commercial') serpFeatures.push('Google Ads', 'Product Reviews');
  if (clean.includes('video') || clean.includes('how to') || words >= 3) serpFeatures.push('Video Carousel');

  return {
    id: `kw-${clean.replace(/\s+/g, '-')}`,
    keyword: clean,
    volume: baseVol,
    cpc,
    difficulty,
    intent,
    competition: Number((difficulty / 100).toFixed(2)),
    trend,
    trendDirection: pct > 4 ? 'up' : pct < -4 ? 'down' : 'stable',
    trendPercentage: Math.abs(pct),
    serpFeatures,
    referringDomainsNeeded: referringDomains,
    country,
  };
}

/**
 * Generate comprehensive keyword ideas & long-tail suggestions
 */
export function generateKeywordIdeas(seedKeyword: string): KeywordMetric[] {
  const seed = seedKeyword.trim().toLowerCase();
  const base = getKeywordMetrics(seed);

  const modifiers = [
    `best ${seed}`,
    `${seed} for beginners`,
    `free ${seed}`,
    `${seed} software`,
    `${seed} tools 2026`,
    `how to use ${seed}`,
    `${seed} pricing`,
    `${seed} vs competitors`,
    `${seed} alternatives`,
    `top rated ${seed}`,
    `${seed} online`,
    `cheap ${seed}`,
    `${seed} guide`,
    `${seed} checklist`,
    `${seed} tips and tricks`,
    `why use ${seed}`,
    `${seed} for small business`,
    `${seed} examples`,
    `${seed} strategies`,
    `${seed} template`,
    `automated ${seed}`,
    `${seed} download`,
    `${seed} tutorial step by step`,
  ];

  const results: KeywordMetric[] = [base];

  modifiers.forEach(mod => {
    results.push(getKeywordMetrics(mod));
  });

  return results.sort((a, b) => b.volume - a.volume);
}

/**
 * Question and PAA engine
 */
export function generateQuestionsAndPaa(seedKeyword: string): QuestionItem[] {
  const seed = seedKeyword.trim().toLowerCase();
  const questions: QuestionItem[] = [
    { question: `what is ${seed} and how does it work?`, type: 'what', volume: 8200, cpc: 2.10, difficulty: 45 },
    { question: `what are the benefits of ${seed}?`, type: 'what', volume: 5400, cpc: 1.80, difficulty: 42 },
    { question: `how to choose the best ${seed}?`, type: 'how', volume: 6700, cpc: 3.40, difficulty: 51 },
    { question: `how much does ${seed} cost in 2026?`, type: 'how', volume: 9100, cpc: 5.20, difficulty: 58 },
    { question: `how to implement ${seed} effectively?`, type: 'how', volume: 3900, cpc: 2.90, difficulty: 48 },
    { question: `why is ${seed} important for SEO?`, type: 'why', volume: 4200, cpc: 2.40, difficulty: 40 },
    { question: `why do companies invest in ${seed}?`, type: 'why', volume: 2800, cpc: 3.10, difficulty: 44 },
    { question: `where to find reliable ${seed}?`, type: 'where', volume: 3100, cpc: 2.00, difficulty: 38 },
    { question: `who needs a professional ${seed}?`, type: 'who', volume: 2200, cpc: 1.95, difficulty: 36 },
    { question: `can you do ${seed} for free?`, type: 'can', volume: 7400, cpc: 1.50, difficulty: 39 },
    { question: `are there good alternatives to ${seed}?`, type: 'are', volume: 4600, cpc: 3.80, difficulty: 49 },
    { question: `${seed} for small businesses`, type: 'preposition', volume: 5800, cpc: 4.10, difficulty: 53 },
    { question: `${seed} with artificial intelligence`, type: 'preposition', volume: 6200, cpc: 4.50, difficulty: 55 },
    { question: `${seed} without paid subscription`, type: 'preposition', volume: 3300, cpc: 1.20, difficulty: 34 },
    { question: `${seed} vs traditional methods`, type: 'comparison', volume: 4100, cpc: 2.80, difficulty: 46 },
    { question: `${seed} vs manual research`, type: 'comparison', volume: 2900, cpc: 2.30, difficulty: 41 },
  ];

  return questions.sort((a, b) => b.volume - a.volume);
}

/**
 * Semantic Keyword Clustering Algorithm
 * Groups a list of keywords by shared conceptual pillar and intent
 */
export function clusterKeywords(keywordList: string[]): KeywordCluster[] {
  if (!keywordList || keywordList.length === 0) return [];

  const metrics = keywordList
    .map(k => k.trim())
    .filter(Boolean)
    .map(k => getKeywordMetrics(k));

  const clustersMap = new Map<string, KeywordMetric[]>();

  metrics.forEach(item => {
    const tokens = item.keyword.split(/\s+/).filter(t => t.length > 2);
    // Find matching pillar or create new
    let assignedPillar: string | null = null;

    for (const pillar of clustersMap.keys()) {
      const pillarTokens = pillar.split(/\s+/);
      const shared = tokens.filter(t => pillarTokens.includes(t));
      if (shared.length > 0) {
        assignedPillar = pillar;
        break;
      }
    }

    if (!assignedPillar) {
      // Pick first two significant tokens or the keyword itself
      assignedPillar = tokens.slice(0, 2).join(' ') || item.keyword;
      clustersMap.set(assignedPillar, []);
    }

    clustersMap.get(assignedPillar)!.push(item);
  });

  const clusters: KeywordCluster[] = [];

  clustersMap.forEach((kwList, pillar) => {
    // Sort items by volume
    kwList.sort((a, b) => b.volume - a.volume);
    const primary = kwList[0];
    const totalVol = kwList.reduce((acc, k) => acc + k.volume, 0);
    const avgKd = Math.round(kwList.reduce((acc, k) => acc + k.difficulty, 0) / kwList.length);

    clusters.push({
      id: `cluster-${pillar.replace(/\s+/g, '-')}`,
      pillarName: pillar.toUpperCase(),
      primaryKeyword: primary.keyword,
      totalVolume: totalVol,
      averageDifficulty: avgKd,
      dominantIntent: primary.intent,
      keywords: kwList,
      contentAngle: `Comprehensive pillar guide covering ${pillar} with dedicated sections for ${kwList.slice(1, 3).map(k => k.keyword).join(', ')}.`,
    });
  });

  return clusters.sort((a, b) => b.totalVolume - a.totalVolume);
}

/**
 * TF-IDF & Keyword Density Analyzer with Flesch Reading Score
 */
export function analyzeContentDensity(text: string) {
  if (!text || !text.trim()) {
    return {
      wordCount: 0,
      characterCount: 0,
      readingTimeMinutes: 0,
      fleschScore: 0,
      fleschLevel: 'N/A',
      singleWords: [],
      twoWordPhrases: [],
      threeWordPhrases: [],
      headingStructure: [],
    };
  }

  const cleanText = text.replace(/<[^>]*>/g, ' '); // Strip HTML if any
  const words = cleanText
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  const totalWords = words.length;
  const characterCount = text.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(totalWords / 225));

  // Stop words to exclude from primary density
  const stopWords = new Set([
    'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'are', 'was',
    'were', 'they', 'what', 'which', 'their', 'will', 'about', 'there', 'would',
    'more', 'some', 'into', 'your', 'than', 'them', 'these', 'could', 'then'
  ]);

  // 1-word frequency
  const singleMap = new Map<string, number>();
  words.forEach(w => {
    if (!stopWords.has(w)) {
      singleMap.set(w, (singleMap.get(w) || 0) + 1);
    }
  });

  const singleWords: DensityWord[] = Array.from(singleMap.entries())
    .map(([phrase, count]) => {
      const pct = Number(((count / totalWords) * 100).toFixed(2));
      return {
        phrase,
        count,
        percentage: pct,
        isOverOptimized: pct > 3.5, // Standard SEO threshold >3.5%
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // 2-word phrases
  const twoMap = new Map<string, number>();
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    if (!stopWords.has(words[i]) || !stopWords.has(words[i + 1])) {
      twoMap.set(bigram, (twoMap.get(bigram) || 0) + 1);
    }
  }

  const twoWordPhrases: DensityWord[] = Array.from(twoMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([phrase, count]) => {
      const pct = Number(((count / totalWords) * 100).toFixed(2));
      return {
        phrase,
        count,
        percentage: pct,
        isOverOptimized: pct > 2.5,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);

  // 3-word phrases
  const threeMap = new Map<string, number>();
  for (let i = 0; i < words.length - 2; i++) {
    const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    threeMap.set(trigram, (threeMap.get(trigram) || 0) + 1);
  }

  const threeWordPhrases: DensityWord[] = Array.from(threeMap.entries())
    .filter(([_, count]) => count > 1)
    .map(([phrase, count]) => {
      const pct = Number(((count / totalWords) * 100).toFixed(2));
      return {
        phrase,
        count,
        percentage: pct,
        isOverOptimized: pct > 1.8,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Approximate Flesch Reading Ease
  // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const syllables = words.reduce((acc, w) => acc + Math.max(1, Math.round(w.length / 3)), 0);
  const fleschScore = Math.min(
    100,
    Math.max(
      0,
      Math.round(206.835 - 1.015 * (totalWords / sentences) - 84.6 * (syllables / (totalWords || 1)))
    )
  );

  let fleschLevel = 'Standard (High School)';
  if (fleschScore >= 80) fleschLevel = 'Easy (Conversational / 6th Grade)';
  else if (fleschScore >= 60) fleschLevel = 'Standard (Fairly Easy)';
  else if (fleschScore >= 40) fleschLevel = 'Difficult (College Level)';
  else fleschLevel = 'Very Confusing / Technical';

  // Extract Heading Structure if provided with tags
  const headingMatches = text.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi) || [];
  const headingStructure = headingMatches.map(h => {
    const tagMatch = h.match(/<h([1-6])/i);
    const tag = tagMatch ? `h${tagMatch[1]}` : 'h2';
    const content = h.replace(/<[^>]*>/g, '').trim();
    return { tag, text: content };
  });

  return {
    wordCount: totalWords,
    characterCount,
    readingTimeMinutes,
    fleschScore,
    fleschLevel,
    singleWords,
    twoWordPhrases,
    threeWordPhrases,
    headingStructure,
  };
}

/**
 * SERP pixel width calculation based on standard Google typography
 * Arial 20px for titles (max ~600px desktop, ~580px mobile)
 * Arial 14px for descriptions (max ~960px desktop, ~750px mobile)
 */
export function calculateSerpPixels(title: string, description: string) {
  // Approximate character-to-pixel ratio
  const titlePixelWidth = Math.round(title.length * 10.4);
  const descPixelWidth = Math.round(description.length * 6.5);

  const titleMaxDesktop = 600;
  const descMaxDesktop = 960;

  return {
    titlePixelWidth,
    descPixelWidth,
    isTitleTruncated: titlePixelWidth > titleMaxDesktop,
    isDescTruncated: descPixelWidth > descMaxDesktop,
    titleRemainingPixels: titleMaxDesktop - titlePixelWidth,
    descRemainingPixels: descMaxDesktop - descPixelWidth,
  };
}

/**
 * Content Brief Generator
 */
export function generateContentBrief(targetKeyword: string): ContentBrief {
  const metric = getKeywordMetrics(targetKeyword);
  const ideas = generateKeywordIdeas(targetKeyword).slice(1, 7);
  const questions = generateQuestionsAndPaa(targetKeyword).slice(0, 5);

  return {
    targetKeyword: metric.keyword,
    suggestedTitle: `The Ultimate Guide to ${metric.keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} (2026 Strategy)`,
    targetWordCount: metric.difficulty > 70 ? 2800 : metric.difficulty > 45 ? 1900 : 1300,
    recommendedHeadings: [
      { tag: 'h2', text: `What is ${metric.keyword} and Why Does It Matter?` },
      { tag: 'h2', text: `Key Advantages and Core Capabilities` },
      { tag: 'h3', text: `1. Enhanced Efficiency & Accuracy` },
      { tag: 'h3', text: `2. Cost Reduction & Scalability` },
      { tag: 'h2', text: `Step-by-Step Implementation Framework` },
      { tag: 'h2', text: `Common Pitfalls to Avoid` },
      { tag: 'h2', text: `Frequently Asked Questions About ${metric.keyword}` },
    ],
    primaryKeywords: [metric.keyword, `${metric.keyword} guide`, `${metric.keyword} tips`],
    secondaryKeywords: ideas.map(i => i.keyword),
    paaQuestions: questions.map(q => q.question),
    userIntent: metric.intent,
    competitorAverageWords: metric.difficulty > 60 ? 2450 : 1600,
  };
}

/**
 * Traffic & ROI Calculation based on organic CTR curves
 */
export const SERP_CTR_CURVE = [
  { rank: 1, ctr: 0.276 },
  { rank: 2, ctr: 0.158 },
  { rank: 3, ctr: 0.110 },
  { rank: 4, ctr: 0.084 },
  { rank: 5, ctr: 0.063 },
  { rank: 6, ctr: 0.049 },
  { rank: 7, ctr: 0.039 },
  { rank: 8, ctr: 0.033 },
  { rank: 9, ctr: 0.027 },
  { rank: 10, ctr: 0.024 },
];

export function calculateOrganicRoi(
  searchVolume: number,
  targetRank: number,
  conversionRatePct: number,
  customerLifetimeValue: number
) {
  const curve = SERP_CTR_CURVE.find(c => c.rank === targetRank) || { ctr: 0.015 };
  const estimatedVisits = Math.round(searchVolume * curve.ctr);
  const estimatedConversions = Math.round(estimatedVisits * (conversionRatePct / 100));
  const estimatedMonthlyRevenue = Math.round(estimatedConversions * customerLifetimeValue);
  const estimatedAnnualRevenue = estimatedMonthlyRevenue * 12;

  return {
    ctrPct: (curve.ctr * 100).toFixed(1),
    estimatedVisits,
    estimatedConversions,
    estimatedMonthlyRevenue,
    estimatedAnnualRevenue,
  };
}
