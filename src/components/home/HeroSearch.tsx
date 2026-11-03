import React, { useState } from 'react';
import { Search, Globe, ArrowUpRight, TrendingUp, Bookmark, Sparkles, AlertCircle } from 'lucide-react';
import { KeywordMetric, ActiveTab } from '../../types/seo';
import { getKeywordMetrics } from '../../services/keywordEngine';

interface HeroSearchProps {
  onSelectKeyword: (keyword: string) => void;
  onSaveKeyword: (metric: KeywordMetric) => void;
  onNavigateTool: (toolId: ActiveTab) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'IN', name: 'India' },
  { code: 'GL', name: 'Global' },
];

const QUICK_SUGGESTIONS = [
  'seo tools',
  'keyword research',
  'best crm software',
  'running shoes',
  'email marketing',
  'crypto wallet',
  'how to start a blog',
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSelectKeyword,
  onSaveKeyword,
  onNavigateTool,
}) => {
  const [searchInput, setSearchInput] = useState('seo tools');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [currentMetric, setCurrentMetric] = useState<KeywordMetric>(() =>
    getKeywordMetrics('seo tools', 'United States')
  );
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const metric = getKeywordMetrics(query, selectedCountry);
    setCurrentMetric(metric);
    onSelectKeyword(query);
  };

  const handleSave = () => {
    onSaveKeyword(currentMetric);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-white">
      {/* Background subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Anti-slop zero pill metadata: clean text separated with subtle dot */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-3 tracking-wide">
          <span>Free Keyword Research Suite</span>
          <span aria-hidden="true">·</span>
          <span>No Credit Card Required</span>
          <span aria-hidden="true">·</span>
          <span>Google SERP Calibrated</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-3xl mx-auto text-balance">
          Uncover Exact Search Numbers Without Paywalls
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
          Analyze accurate monthly search demand, ranking difficulty, CPC, and topic clusters in real time. Built for marketers who want reliable data without $100+/mo subscriptions.
        </p>

        {/* Main Search Input Form */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSearch(searchInput);
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2 p-2 bg-white rounded-xl shadow-lg border border-slate-200"
          >
            {/* Country selector */}
            <div className="relative flex items-center pl-3 pr-2 text-slate-600 border-b sm:border-b-0 sm:border-r border-slate-200 py-2 sm:py-0">
              <Globe className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <select
                value={selectedCountry}
                onChange={e => {
                  setSelectedCountry(e.target.value);
                  const metric = getKeywordMetrics(searchInput, e.target.value);
                  setCurrentMetric(metric);
                }}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer pr-4"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Keyword Input */}
            <div className="relative flex-1 flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Enter any keyword, phrase, or topic (e.g. running shoes, crm software)..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Inspect Keyword</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
            <span className="font-medium mr-1 text-slate-400">Popular:</span>
            {QUICK_SUGGESTIONS.map(term => (
              <button
                key={term}
                onClick={() => {
                  setSearchInput(term);
                  handleSearch(term);
                }}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Live Instant Metric Card */}
        {currentMetric && (
          <div className="mt-10 max-w-4xl mx-auto bg-slate-50 rounded-xl border border-slate-200 p-5 sm:p-6 text-left shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    "{currentMetric.keyword}"
                  </h2>
                  <span className="text-xs font-mono text-slate-500">
                    · {currentMetric.country || selectedCountry}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>Intent: <strong className="text-slate-800">{currentMetric.intent}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Competition: <strong className="text-slate-800">{currentMetric.competition}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Est. Backlinks to Rank: <strong className="text-slate-800">~{currentMetric.referringDomainsNeeded} domains</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{savedNotification ? 'Saved to List!' : 'Save to List'}</span>
                </button>
                <button
                  onClick={() => onNavigateTool('tool-volume')}
                  className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors flex items-center gap-1.5"
                >
                  <span>Full Analysis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics 4-grid */}
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Monthly Search Volume
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {currentMetric.volume.toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      currentMetric.trendDirection === 'up'
                        ? 'text-emerald-600'
                        : currentMetric.trendDirection === 'down'
                        ? 'text-amber-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {currentMetric.trendDirection === 'up' ? '↑' : currentMetric.trendDirection === 'down' ? '↓' : '→'}
                    {currentMetric.trendPercentage}%
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Estimated monthly queries</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Keyword Difficulty
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    {currentMetric.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">/ 100</span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      currentMetric.difficulty < 35
                        ? 'bg-emerald-100 text-emerald-800'
                        : currentMetric.difficulty < 70
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {currentMetric.difficulty < 35 ? 'Easy' : currentMetric.difficulty < 70 ? 'Moderate' : 'Hard'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">SERP competitiveness score</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Cost Per Click (CPC)
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                    ${currentMetric.cpc.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-400">USD</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Average Google Ads bid</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Search Intent
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-slate-900">
                    {currentMetric.intent}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {currentMetric.intent === 'Informational'
                    ? 'Guides & tutorials'
                    : currentMetric.intent === 'Commercial'
                    ? 'Reviews & comparisons'
                    : currentMetric.intent === 'Transactional'
                    ? 'Purchase intent'
                    : 'Brand navigational'}
                </span>
              </div>
            </div>

            {/* 12-Month Sparkline Trend Bar */}
            {currentMetric.trend && currentMetric.trend.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    12-Month Search Volume History
                  </span>
                  <span className="font-mono text-[11px]">
                    Peak: {Math.max(...currentMetric.trend.map(t => t.volume)).toLocaleString()} / mo
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1.5 items-end h-16 pt-2">
                  {(() => {
                    const max = Math.max(...currentMetric.trend.map(t => t.volume));
                    return currentMetric.trend.map((point, i) => {
                      const heightPct = Math.max(15, Math.round((point.volume / max) * 100));
                      return (
                        <div key={i} className="flex flex-col items-center h-full justify-end group/bar">
                          <div
                            className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-t transition-all relative"
                            style={{ height: `${heightPct}%` }}
                            title={`${point.month}: ${point.volume.toLocaleString()} searches`}
                          />
                          <span className="text-[9px] text-slate-400 mt-1 font-mono">
                            {point.month}
                          </span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
