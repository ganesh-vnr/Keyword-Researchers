import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { CannibalizationEntry } from '../../types/seo';

const SAMPLE_ENTRIES: CannibalizationEntry[] = [
  {
    url: 'https://mysite.com/blog/best-running-shoes',
    keyword: 'best running shoes',
    currentRank: 12,
    impressions: 45000,
    clicks: 1200,
    status: 'Critical',
    recommendedAction: 'Consolidate via 301 redirect into /reviews/top-running-shoes to eliminate split authority.',
  },
  {
    url: 'https://mysite.com/reviews/top-running-shoes',
    keyword: 'best running shoes',
    currentRank: 18,
    impressions: 38000,
    clicks: 890,
    status: 'Critical',
    recommendedAction: 'Primary recipient URL for 301 consolidation. Upgrade title tag and content depth.',
  },
  {
    url: 'https://mysite.com/products/trail-shoes-marathon',
    keyword: 'trail running shoes for marathon',
    currentRank: 4,
    impressions: 12000,
    clicks: 1450,
    status: 'Good',
    recommendedAction: 'No cannibalization detected. Maintain internal links and update seasonal reviews.',
  },
  {
    url: 'https://mysite.com/guides/running-footwear-guide',
    keyword: 'running shoes guide',
    currentRank: 8,
    impressions: 21000,
    clicks: 1100,
    status: 'Moderate',
    recommendedAction: 'De-optimize H2 tags containing exact match "best running shoes" to avoid dilution.',
  },
];

export const KeywordCannibalizationView: React.FC = () => {
  const [entries, setEntries] = useState<CannibalizationEntry[]>(SAMPLE_ENTRIES);
  const [newUrl, setNewUrl] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newKeyword.trim()) return;

    // Check if keyword already exists in current list
    const hasCollision = entries.some(
      e => e.keyword.toLowerCase() === newKeyword.trim().toLowerCase()
    );

    const newEntry: CannibalizationEntry = {
      url: newUrl.trim(),
      keyword: newKeyword.trim().toLowerCase(),
      currentRank: hasCollision ? 16 : 6,
      impressions: 8500,
      clicks: 420,
      status: hasCollision ? 'Critical' : 'Good',
      recommendedAction: hasCollision
        ? 'Duplicate target keyword detected across multiple URLs. Consolidate into single primary URL.'
        : 'Distinct target query. Safe from cannibalization.',
    };

    setEntries([...entries, newEntry]);
    setNewUrl('');
    setNewKeyword('');
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, idx) => idx !== index));
  };

  const criticalCount = entries.filter(e => e.status === 'Critical').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Content &amp; On-Page</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Cannibalization Detector</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Cannibalization &amp; URL Conflict Detector
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Identify multiple pages on your domain competing for identical search queries. Reclaim split rankings, consolidate link equity, and fix confused search crawlers.
        </p>
      </div>

      {/* Add Pair Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-8">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Add URL &amp; Target Keyword Mapping
        </h2>
        <form onSubmit={addEntry} className="flex flex-col sm:flex-row items-stretch gap-3">
          <input
            type="text"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
            placeholder="URL (e.g. https://yoursite.com/blog/seo-tools)..."
            className="flex-1 p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
          />
          <input
            type="text"
            value={newKeyword}
            onChange={e => setNewKeyword(e.target.value)}
            placeholder="Target Keyword (e.g. best seo tools)..."
            className="flex-1 p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Audit Mapping</span>
          </button>
        </form>
      </div>

      {/* Audit Summary Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              criticalCount > 0
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {criticalCount > 0
                ? `${criticalCount} Potential Cannibalization Conflicts Found`
                : 'Clean Mapping: Zero Direct Cannibalization Conflicts'}
            </h3>
            <p className="text-xs text-slate-500">
              Auditing {entries.length} indexed URLs across your domain architecture.
            </p>
          </div>
        </div>

        <button
          onClick={() => setEntries(SAMPLE_ENTRIES)}
          className="text-xs text-emerald-700 font-semibold hover:underline"
        >
          Reset to Sample Audit
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Target Query</th>
                <th className="py-3 px-5">Indexed URL</th>
                <th className="py-3 px-5">Current Rank</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Action Recommendation</th>
                <th className="py-3 px-5 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {entries.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {item.keyword}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-[11px] text-slate-600 max-w-xs truncate">
                    {item.url}
                  </td>
                  <td className="py-3.5 px-5 font-mono tabular-nums text-slate-700 font-semibold">
                    Position #{item.currentRank}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`font-semibold text-xs px-2 py-0.5 rounded ${
                        item.status === 'Critical'
                          ? 'bg-rose-100 text-rose-800'
                          : item.status === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-700 text-xs max-w-sm">
                    {item.recommendedAction}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => removeEntry(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
