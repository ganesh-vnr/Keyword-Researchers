import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Globe,
  Download,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { KeywordMetric } from '../../types/seo';
import { getKeywordMetrics, generateKeywordIdeas } from '../../services/keywordEngine';
import { exportKeywordsToCSV } from '../../services/storage';

interface KeywordVolumeViewProps {
  initialKeyword?: string;
  onSaveKeyword: (metric: KeywordMetric) => void;
  onSelectKeyword: (kw: string) => void;
}

export const KeywordVolumeView: React.FC<KeywordVolumeViewProps> = ({
  initialKeyword = 'seo tools',
  onSaveKeyword,
  onSelectKeyword,
}) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [country, setCountry] = useState('United States');
  const [metric, setMetric] = useState<KeywordMetric>(() =>
    getKeywordMetrics(initialKeyword, 'United States')
  );
  const [ideas, setIdeas] = useState<KeywordMetric[]>(() =>
    generateKeywordIdeas(initialKeyword).slice(1, 11)
  );
  const [copied, setCopied] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;
    const res = getKeywordMetrics(keyword, country);
    setMetric(res);
    setIdeas(generateKeywordIdeas(keyword).slice(1, 11));
    onSelectKeyword(keyword);
  };

  const handleExport = () => {
    exportKeywordsToCSV([metric, ...ideas], `${metric.keyword}_volume_report.csv`);
  };

  const peakMonth = metric.trend.reduce(
    (max, curr) => (curr.volume > max.volume ? curr : max),
    metric.trend[0] || { month: 'N/A', volume: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Search Volume &amp; Trends</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Search Volume &amp; Historical Trends
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Check accurate estimated monthly search queries, cost-per-click benchmarks, and 12-month seasonality patterns across target countries.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Enter search term (e.g. running shoes, cloud hosting)..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Globe className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <select
              value={country}
              onChange={e => {
                setCountry(e.target.value);
                const res = getKeywordMetrics(keyword, e.target.value);
                setMetric(res);
              }}
              className="bg-transparent text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Global">Global</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            Check Volume
          </button>
        </form>
      </div>

      {/* Main KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Monthly Search Volume
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metric.volume.toLocaleString()}
            </span>
            <span
              className={`text-xs font-bold ${
                metric.trendDirection === 'up'
                  ? 'text-emerald-600'
                  : metric.trendDirection === 'down'
                  ? 'text-amber-600'
                  : 'text-slate-500'
              }`}
            >
              {metric.trendDirection === 'up' ? '↑' : metric.trendDirection === 'down' ? '↓' : '→'}
              {metric.trendPercentage}% YoY
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Normalized monthly search demand
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Keyword Difficulty (KD)
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {metric.difficulty}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                metric.difficulty < 35
                  ? 'bg-emerald-100 text-emerald-800'
                  : metric.difficulty < 70
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {metric.difficulty < 35 ? 'Easy' : metric.difficulty < 70 ? 'Medium' : 'Hard'}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            ~{metric.referringDomainsNeeded} referring domains to rank top 5
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Estimated CPC
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ${metric.cpc.toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 font-mono">USD</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Paid search competition: {metric.competition}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Peak Season Month
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700">
              {peakMonth.month}
            </span>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              ({peakMonth.volume.toLocaleString()})
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Highest annual search interest
          </span>
        </div>
      </div>

      {/* 12-Month Interactive Trend Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              12-Month Historical Search Volume Trend
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Historical monthly search trajectory for "{metric.keyword}" in {metric.country || country}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSaveKeyword(metric)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save Keyword</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Bar chart visualization */}
        <div className="pt-8 pb-2">
          {(() => {
            const max = Math.max(...metric.trend.map(t => t.volume));
            return (
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-end h-48">
                {metric.trend.map((pt, i) => {
                  const pct = Math.max(12, Math.round((pt.volume / max) * 100));
                  const isPeak = pt.month === peakMonth.month;
                  return (
                    <div key={i} className="flex flex-col items-center h-full justify-end group">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-900 text-white font-mono px-1.5 py-0.5 rounded mb-1 pointer-events-none whitespace-nowrap">
                        {pt.volume.toLocaleString()}
                      </div>
                      <div
                        className={`w-full rounded-t transition-all ${
                          isPeak
                            ? 'bg-emerald-600'
                            : 'bg-slate-200 group-hover:bg-emerald-400'
                        }`}
                        style={{ height: `${pct}%` }}
                      />
                      <span
                        className={`text-[10px] mt-2 font-mono ${
                          isPeak ? 'font-bold text-emerald-700' : 'text-slate-500'
                        }`}
                      >
                        {pt.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Related Search Variations Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Related Search Queries &amp; Volume Variations
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              High-relevance long-tail variations uncovered for "{metric.keyword}".
            </p>
          </div>
          <button
            onClick={() => exportKeywordsToCSV(ideas, `${metric.keyword}_related.csv`)}
            className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Download All ({ideas.length})</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Keyword</th>
                <th className="py-3 px-5">Search Volume</th>
                <th className="py-3 px-5">Difficulty (KD)</th>
                <th className="py-3 px-5">Est. CPC</th>
                <th className="py-3 px-5">Search Intent</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {ideas.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-900">
                    <button
                      onClick={() => {
                        setKeyword(item.keyword);
                        const res = getKeywordMetrics(item.keyword, country);
                        setMetric(res);
                        setIdeas(generateKeywordIdeas(item.keyword).slice(1, 11));
                        onSelectKeyword(item.keyword);
                      }}
                      className="hover:text-emerald-700 text-left"
                    >
                      {item.keyword}
                    </button>
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-700 font-semibold">
                    {item.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-5">
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
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                    ${item.cpc.toFixed(2)}
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-[11px] text-slate-600 font-medium">
                      {item.intent}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button
                      onClick={() => onSaveKeyword(item)}
                      className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                      title="Save keyword"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
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
