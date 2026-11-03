import React, { useState } from 'react';
import { Gauge, Search, ShieldAlert, Award, ArrowUpRight, CheckCircle2, Bookmark, Download } from 'lucide-react';
import { KeywordMetric } from '../../types/seo';
import { getKeywordMetrics } from '../../services/keywordEngine';

interface KeywordDifficultyViewProps {
  initialKeyword?: string;
  onSaveKeyword: (metric: KeywordMetric) => void;
}

export const KeywordDifficultyView: React.FC<KeywordDifficultyViewProps> = ({
  initialKeyword = 'keyword research',
  onSaveKeyword,
}) => {
  const [query, setQuery] = useState(initialKeyword);
  const [metric, setMetric] = useState<KeywordMetric>(() => getKeywordMetrics(initialKeyword));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setMetric(getKeywordMetrics(query));
  };

  const kd = metric.difficulty;
  const isEasy = kd < 35;
  const isModerate = kd >= 35 && kd < 70;
  const isHard = kd >= 70;

  const kdColor = isEasy ? '#059669' : isModerate ? '#d97706' : '#e11d48';
  const kdTier = isEasy ? 'Easy to Rank' : isModerate ? 'Moderate Competition' : 'Highly Competitive';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Difficulty Checker</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Difficulty (KD) &amp; Ranking Potential
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Evaluate how difficult it is to rank on Google page 1 for any search term based on backlink requirements, domain authority thresholds, and competitor strength.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter search term to analyze difficulty..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            Analyze Difficulty
          </button>
        </form>
      </div>

      {/* Main KD Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Gauge Box */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Target Keyword: "{metric.keyword}"
          </span>

          {/* Circular Metric Gauge */}
          <div className="relative w-44 h-44 my-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={kdColor}
                strokeWidth="10"
                strokeDasharray={`${(kd / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                {kd}
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase">out of 100</span>
            </div>
          </div>

          <div
            className="text-sm font-bold px-3 py-1 rounded-full mb-3"
            style={{
              backgroundColor: isEasy ? '#ecfdf5' : isModerate ? '#fffbeb' : '#fff1f2',
              color: kdColor,
            }}
          >
            {kdTier}
          </div>

          <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
            {isEasy
              ? 'New or emerging websites can target and rank for this query with comprehensive on-page content and minimal backlink acquisition.'
              : isModerate
              ? 'Achievable with high-quality content, targeted internal linking, and 10 to 30 quality referring domain backlinks.'
              : 'Dominated by high-authority enterprise domains. Ranking in the top 3 will require sustained link building and high DR.'}
          </p>

          <div className="mt-5 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
            <button
              onClick={() => onSaveKeyword(metric)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Keyword</span>
            </button>
          </div>
        </div>

        {/* Right Breakdown Box */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Ranking Requirements &amp; SERP Architecture
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Empirical signals derived from analyzing current top 10 search results.
            </p>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Estimated Backlinks Required: ~{metric.referringDomainsNeeded} Referring Domains
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    To compete effectively in Google positions #1 through #5 against current ranking incumbents.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Recommended Content Length: {kd > 70 ? '2,800 - 3,500 words' : kd > 40 ? '1,800 - 2,400 words' : '1,200 - 1,600 words'}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Average word count among existing top-ranking competitor pages.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Expected Ranking Timeline
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {isEasy ? '2 to 8 weeks for indexed websites with solid technical foundations.' : isModerate ? '2 to 5 months with proactive internal linking and outreach.' : '6 to 12+ months requiring consistent authority signals.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Intent: <strong className="text-slate-800">{metric.intent}</strong></span>
            <span>Monthly Volume: <strong className="text-slate-800 font-mono">{metric.volume.toLocaleString()}</strong></span>
            <span>CPC: <strong className="text-slate-800 font-mono">${metric.cpc.toFixed(2)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
