import React, { useState } from 'react';
import { BarChart2, Search, Download, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { exportKeywordsToCSV } from '../../services/storage';

interface GapRow {
  keyword: string;
  volume: number;
  difficulty: number;
  myRank: number | null;
  comp1Rank: number;
  comp2Rank: number;
  type: 'Missing' | 'Weak' | 'Shared' | 'Unique';
}

const SAMPLE_GAP_DATA: GapRow[] = [
  { keyword: 'crm software for small business', volume: 22000, difficulty: 64, myRank: null, comp1Rank: 3, comp2Rank: 5, type: 'Missing' },
  { keyword: 'free crm email marketing', volume: 14500, difficulty: 58, myRank: 19, comp1Rank: 2, comp2Rank: 6, type: 'Weak' },
  { keyword: 'best cloud based crm', volume: 18000, difficulty: 72, myRank: 4, comp1Rank: 7, comp2Rank: 9, type: 'Unique' },
  { keyword: 'simple sales pipeline tool', volume: 9800, difficulty: 45, myRank: 8, comp1Rank: 5, comp2Rank: 11, type: 'Shared' },
  { keyword: 'crm contact management automation', volume: 12400, difficulty: 61, myRank: null, comp1Rank: 4, comp2Rank: 8, type: 'Missing' },
  { keyword: 'freelancer client crm software', volume: 6200, difficulty: 38, myRank: 2, comp1Rank: 12, comp2Rank: 14, type: 'Unique' },
  { keyword: 'b2b crm platform reviews', volume: 16000, difficulty: 69, myRank: 22, comp1Rank: 3, comp2Rank: 4, type: 'Weak' },
];

export const KeywordGapView: React.FC = () => {
  const [myDomain, setMyDomain] = useState('mysite.com');
  const [comp1, setComp1] = useState('hubspot.com');
  const [comp2, setComp2] = useState('salesforce.com');
  const [gapData, setGapData] = useState<GapRow[]>(SAMPLE_GAP_DATA);
  const [filterType, setFilterType] = useState<string>('All');
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
    }, 400);
  };

  const filtered =
    filterType === 'All' ? gapData : gapData.filter(g => g.type === filterType);

  const missingCount = gapData.filter(g => g.type === 'Missing').length;
  const weakCount = gapData.filter(g => g.type === 'Weak').length;
  const uniqueCount = gapData.filter(g => g.type === 'Unique').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Video &amp; ROI</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Keyword Gap Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Competitor Keyword Gap &amp; Content Opportunity Finder
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Compare your organic ranking footprint against direct market competitors. Discover missing high-volume keywords your competitors rank for that your website doesn't.
        </p>
      </div>

      {/* Domain inputs */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleCompare} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Your Domain</label>
            <input
              type="text"
              value={myDomain}
              onChange={e => setMyDomain(e.target.value)}
              className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Competitor #1</label>
            <input
              type="text"
              value={comp1}
              onChange={e => setComp1(e.target.value)}
              className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Competitor #2</label>
            <input
              type="text"
              value={comp2}
              onChange={e => setComp2(e.target.value)}
              className="w-full p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
            >
              {isComparing ? 'Comparing...' : 'Run Gap Analysis'}
            </button>
          </div>
        </form>
      </div>

      {/* 3 Opportunity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Missing Keyword Opportunities
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-600 font-mono tabular-nums">
              {missingCount}
            </span>
            <span className="text-xs text-slate-500">unranked queries</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Competitors rank in top 10; your domain does not rank at all.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Weak Keywords (Rank Behind)
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-600 font-mono tabular-nums">
              {weakCount}
            </span>
            <span className="text-xs text-slate-500">optimizable queries</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            You rank on page 2 or 3 while competitor holds top 5.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Unique Ranking Wins
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
              {uniqueCount}
            </span>
            <span className="text-xs text-slate-500">leading queries</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Your domain outranks both competitors on these search terms.
          </p>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['All', 'Missing', 'Weak', 'Shared', 'Unique'].map(f => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  filterType === f
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f} ({f === 'All' ? gapData.length : gapData.filter(g => g.type === f).length})
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500">
            Sorted by highest search volume demand
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Target Keyword</th>
                <th className="py-3 px-5">Search Volume</th>
                <th className="py-3 px-5">KD</th>
                <th className="py-3 px-5 font-mono text-emerald-700">{myDomain}</th>
                <th className="py-3 px-5 font-mono">{comp1}</th>
                <th className="py-3 px-5 font-mono">{comp2}</th>
                <th className="py-3 px-5 text-right">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-5 font-bold text-slate-900">
                    {row.keyword}
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-700">
                    {row.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                    {row.difficulty}
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums font-bold">
                    {row.myRank ? `#${row.myRank}` : <span className="text-rose-500">Unranked</span>}
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                    #{row.comp1Rank}
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                    #{row.comp2Rank}
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span
                      className={`font-semibold text-xs px-2 py-0.5 rounded ${
                        row.type === 'Missing'
                          ? 'bg-rose-100 text-rose-800'
                          : row.type === 'Weak'
                          ? 'bg-amber-100 text-amber-800'
                          : row.type === 'Unique'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {row.type}
                    </span>
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
