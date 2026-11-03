import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, BarChart, BookOpen, Clock, RefreshCw } from 'lucide-react';
import { analyzeContentDensity } from '../../services/keywordEngine';

const SAMPLE_ARTICLE = `
# The Definitive Guide to Keyword Research for Modern SEO

Keyword research is the fundamental pillar of any successful digital marketing and search engine optimization campaign. When you conduct thorough keyword research, you understand the exact search queries, questions, and commercial intent that your target audience types into Google.

## Why Keyword Research Matters in 2026

Modern search engines utilize advanced semantic natural language processing algorithms. In the past, webmasters could rank pages simply by repeating target terms multiple times. Today, search algorithms prioritize comprehensive topical authority, search intent satisfaction, and high-quality editorial content over simple keyword repetition.

### 1. Uncovering Search Volume and Commercial Intent
Not all search queries are created equal. A keyword with 50,000 monthly searches might have low purchase intent if users are simply seeking a quick definition. Conversely, a long-tail search term with only 800 monthly searches may yield high conversion rates if it indicates commercial buying intent.

### 2. Preventing Keyword Cannibalization
When you structure your website around distinct keyword clusters, you ensure that multiple articles do not compete against each other for the identical search ranking in Google SERPs.

## How to Conduct Systematic Keyword Research

To conduct effective keyword research:
1. Identify broad seed keywords in your industry.
2. Expand seed keywords into hundreds of long-tail phrases using dedicated SEO tools.
3. Group related keywords into topic pillars.
4. Evaluate keyword difficulty and required backlinks before producing content.
5. Continuously monitor your search performance and optimize internal linking.
`;

export const KeywordDensityView: React.FC = () => {
  const [content, setContent] = useState(SAMPLE_ARTICLE);
  const [activeTab, setActiveTab] = useState<'1word' | '2word' | '3word'>('1word');

  const analysis = analyzeContentDensity(content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Content &amp; On-Page</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Keyword Density &amp; Readability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Density &amp; On-Page Content Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Audit single-word, 2-word, and 3-word n-gram frequency, check Flesch Reading Ease scores, and identify over-optimization risks before publishing.
        </p>
      </div>

      {/* Editor & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Input Textarea */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Paste Article Text or Markdown
            </label>
            <button
              onClick={() => setContent(SAMPLE_ARTICLE)}
              className="text-xs text-teal-600 font-semibold hover:underline"
            >
              Load Sample Article
            </button>
          </div>

          <textarea
            rows={14}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Paste your content here to analyze keyword frequency, density, and readability..."
            className="w-full flex-1 p-3.5 text-xs sm:text-sm font-sans bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 leading-relaxed resize-y"
          />

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Character Count: <strong className="font-mono text-slate-800">{analysis.characterCount.toLocaleString()}</strong></span>
            <button
              onClick={() => setContent('')}
              className="text-slate-500 hover:text-slate-800 hover:underline"
            >
              Clear Editor
            </button>
          </div>
        </div>

        {/* Right: Core Metrics & Readability */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Words
              </span>
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
                {analysis.wordCount.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Ideal article length: 1,500+
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Reading Time
              </span>
              <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
                ~{analysis.readingTimeMinutes} min
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                At 225 words per minute
              </span>
            </div>
          </div>

          {/* Flesch Reading Score Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Flesch Reading Ease
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                {analysis.fleschScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                {analysis.fleschLevel}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Google rewards content that is accessible and easy to digest. A score of 60 to 75 is ideal for modern web publishers.
            </p>
          </div>

          {/* Optimization Health */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              On-Page Density Safeguards
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Primary keywords recommended between 1.0% - 2.5%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Densities exceeding 3.5% trigger over-optimization warnings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* N-Gram Keyword Density Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-2">
              Frequency by N-Gram:
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('1word')}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  activeTab === '1word' ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                1-Word ({analysis.singleWords.length})
              </button>
              <button
                onClick={() => setActiveTab('2word')}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  activeTab === '2word' ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                2-Word Phrases ({analysis.twoWordPhrases.length})
              </button>
              <button
                onClick={() => setActiveTab('3word')}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  activeTab === '3word' ? 'bg-slate-900 text-white' : 'text-slate-600'
                }`}
              >
                3-Word Phrases ({analysis.threeWordPhrases.length})
              </button>
            </div>
          </div>

          <span className="text-xs text-slate-500">
            Stopwords filtered automatically for cleaner semantic analysis
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Target Phrase</th>
                <th className="py-3 px-5">Occurrences</th>
                <th className="py-3 px-5">Density Percentage</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {(() => {
                const list =
                  activeTab === '1word'
                    ? analysis.singleWords
                    : activeTab === '2word'
                    ? analysis.twoWordPhrases
                    : analysis.threeWordPhrases;

                if (list.length === 0) {
                  return (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400 text-xs">
                        No phrases detected for this length.
                      </td>
                    </tr>
                  );
                }

                return list.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-5 font-semibold text-slate-900">
                      {item.phrase}
                    </td>
                    <td className="py-3 px-5 font-mono tabular-nums text-slate-700">
                      {item.count} times
                    </td>
                    <td className="py-3 px-5 font-mono tabular-nums text-slate-800 font-semibold">
                      {item.percentage}%
                    </td>
                    <td className="py-3 px-5 text-right">
                      {item.isOverOptimized ? (
                        <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Over-Optimized (&gt;3.5%)
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          Optimal
                        </span>
                      )}
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
