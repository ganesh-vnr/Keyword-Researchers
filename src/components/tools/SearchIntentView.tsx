import React, { useState } from 'react';
import { Compass, Search, Layout, CheckCircle, Info, Sparkles } from 'lucide-react';
import { SearchIntent } from '../../types/seo';
import { determineIntent, getKeywordMetrics } from '../../services/keywordEngine';

export const SearchIntentView: React.FC = () => {
  const [query, setQuery] = useState('best project management software');
  const [result, setResult] = useState(() => analyzeIntent('best project management software'));

  function analyzeIntent(searchTerm: string) {
    const clean = searchTerm.trim().toLowerCase();
    const primary = determineIntent(clean);
    const metric = getKeywordMetrics(clean);

    let infoPct = 20;
    let commPct = 25;
    let transPct = 15;
    let navPct = 10;

    if (primary === 'Informational') {
      infoPct = 70;
      commPct = 15;
      transPct = 10;
      navPct = 5;
    } else if (primary === 'Commercial') {
      commPct = 65;
      infoPct = 20;
      transPct = 12;
      navPct = 3;
    } else if (primary === 'Transactional') {
      transPct = 70;
      commPct = 18;
      infoPct = 8;
      navPct = 4;
    } else {
      navPct = 75;
      infoPct = 10;
      commPct = 10;
      transPct = 5;
    }

    return {
      keyword: clean,
      primary,
      volume: metric.volume,
      difficulty: metric.difficulty,
      cpc: metric.cpc,
      distribution: {
        informational: infoPct,
        commercial: commPct,
        transactional: transPct,
        navigational: navPct,
      },
      serpFeatures: metric.serpFeatures || ['People Also Ask', 'Related Searches'],
    };
  }

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setResult(analyzeIntent(query));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Intent Classifier</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Search Intent Classifier &amp; SERP Alignment
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Classify Google user queries into Informational, Commercial, Transactional, or Navigational intent to guarantee your content format matches user expectations.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleAnalyze} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter search query to classify intent..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            Classify Intent
          </button>
        </form>
      </div>

      {/* Main Results Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Intent Scorecard */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Primary Intent Classification
          </span>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {result.primary}
            </h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
              High Confidence
            </span>
          </div>

          <div className="mt-6 space-y-3">
            <span className="text-xs font-semibold text-slate-700 block">
              Intent Distribution Breakdown
            </span>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Informational</span>
                <span className="font-mono">{result.distribution.informational}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${result.distribution.informational}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Commercial</span>
                <span className="font-mono">{result.distribution.commercial}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${result.distribution.commercial}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Transactional</span>
                <span className="font-mono">{result.distribution.transactional}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${result.distribution.transactional}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Navigational</span>
                <span className="font-mono">{result.distribution.navigational}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full"
                  style={{ width: `${result.distribution.navigational}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Query: <strong className="text-slate-800">"{result.keyword}"</strong> · Monthly Demand:{' '}
            <strong className="font-mono text-slate-800">{result.volume.toLocaleString()}</strong>
          </div>
        </div>

        {/* Right Recommended Content Strategy */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Recommended Page Architecture &amp; User Experience
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Aligning with Google's Quality Rater Guidelines for {result.primary} queries.
            </p>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">
                  Optimal Page Template
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {result.primary === 'Informational' &&
                    'Comprehensive Ultimate Guide or How-To tutorial with clear H2 step headers, jump links, definition callout boxes, and an FAQ block.'}
                  {result.primary === 'Commercial' &&
                    'Comparison guide / Top 10 listicle featuring side-by-side pricing matrices, feature evaluation rubrics, pros & cons, and clear editorial verdicts.'}
                  {result.primary === 'Transactional' &&
                    'Clean conversion-focused product or pricing landing page with instant CTA, security badges, customer testimonials, and zero unnecessary reading barriers.'}
                  {result.primary === 'Navigational' &&
                    'Direct login portal or dedicated product homepage with explicit brand identity and navigation menu.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-800 mb-1">
                  Expected SERP Features in Google
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.serpFeatures.map((feat, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>CPC Value: <strong className="font-mono text-slate-800">${result.cpc.toFixed(2)}</strong></span>
            <span>Difficulty: <strong className="font-mono text-slate-800">{result.difficulty}/100</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
