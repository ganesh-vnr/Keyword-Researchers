import React, { useState } from 'react';
import { Sparkles, Search, Filter, Download, Bookmark, Plus, Check } from 'lucide-react';
import { KeywordMetric, SearchIntent } from '../../types/seo';
import { generateKeywordIdeas, getKeywordMetrics } from '../../services/keywordEngine';
import { exportKeywordsToCSV } from '../../services/storage';

interface KeywordIdeasViewProps {
  initialKeyword?: string;
  onSaveKeyword: (metric: KeywordMetric) => void;
  onSelectKeyword: (kw: string) => void;
}

export const KeywordIdeasView: React.FC<KeywordIdeasViewProps> = ({
  initialKeyword = 'seo tools',
  onSaveKeyword,
  onSelectKeyword,
}) => {
  const [seed, setSeed] = useState(initialKeyword);
  const [allIdeas, setAllIdeas] = useState<KeywordMetric[]>(() =>
    generateKeywordIdeas(initialKeyword)
  );
  const [intentFilter, setIntentFilter] = useState<string>('All');
  const [maxKd, setMaxKd] = useState<number>(100);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seed.trim()) return;
    const generated = generateKeywordIdeas(seed);
    setAllIdeas(generated);
    setSelectedIds(new Set());
    onSelectKeyword(seed);
  };

  const filtered = allIdeas.filter(item => {
    if (intentFilter !== 'All' && item.intent !== intentFilter) return false;
    if (item.difficulty > maxKd) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(f => f.id)));
    }
  };

  const handleExport = () => {
    const toExport =
      selectedIds.size > 0 ? filtered.filter(f => selectedIds.has(f.id)) : filtered;
    exportKeywordsToCSV(toExport, `${seed}_keyword_ideas.csv`);
  };

  const handleSaveSelected = () => {
    const toSave =
      selectedIds.size > 0 ? filtered.filter(f => selectedIds.has(f.id)) : filtered;
    toSave.forEach(k => onSaveKeyword(k));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Ideas &amp; Long-Tail Suggester</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Ideas &amp; Long-Tail Variations Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Discover high-intent long-tail keywords, modifier combinations, and niche variations with search demand and competition metrics.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={seed}
              onChange={e => setSeed(e.target.value)}
              placeholder="Enter seed topic (e.g. email marketing, fitness app)..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm shrink-0"
          >
            Generate Ideas
          </button>
        </form>
      </div>

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Intent filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Intent:</span>
            {['All', 'Informational', 'Commercial', 'Transactional'].map(intent => (
              <button
                key={intent}
                onClick={() => setIntentFilter(intent)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  intentFilter === intent
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {intent}
              </button>
            ))}
          </div>

          {/* KD ceiling filter */}
          <div className="flex items-center gap-2 text-xs text-slate-600 sm:ml-4 sm:border-l sm:border-slate-200 sm:pl-4">
            <span className="font-semibold">Max KD:</span>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={maxKd}
              onChange={e => setMaxKd(Number(e.target.value))}
              className="w-24 accent-teal-600"
            />
            <span className="font-mono tabular-nums text-slate-800 font-bold">{maxKd}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSaveSelected}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save ({selectedIds.size > 0 ? selectedIds.size : 'All'})</span>
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Ideas Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.size === filtered.length && filtered.length > 0}
              onChange={selectAll}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="font-semibold text-slate-700">
              Showing {filtered.length} keyword variations
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Total Aggregate Volume:{' '}
            <strong className="font-mono text-slate-800">
              {filtered.reduce((acc, k) => acc + k.volume, 0).toLocaleString()}
            </strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4 w-10"></th>
                <th className="py-3 px-4">Keyword Idea</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4">KD</th>
                <th className="py-3 px-4">CPC (USD)</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map(item => {
                const isSelected = selectedIds.has(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.keyword}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-700 font-semibold">
                      {item.volume.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                          item.difficulty < 35
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.difficulty < 70
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-slate-600">
                      ${item.cpc.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-slate-600">
                        {item.intent}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onSaveKeyword(item)}
                        className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                        title="Save to list"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
