import React, { useState } from 'react';
import { Layers, Download, Play, RefreshCw, Bookmark, Sparkles, ArrowRight } from 'lucide-react';
import { KeywordCluster, KeywordMetric } from '../../types/seo';
import { clusterKeywords } from '../../services/keywordEngine';
import { exportToJSON } from '../../services/storage';

interface KeywordClusteringViewProps {
  onSaveKeyword?: (metric: KeywordMetric) => void;
}

const SAMPLE_LIST = `best crm software
free crm tools
crm for small business
top rated crm systems
crm software pricing
open source crm
cloud crm software
crm for real estate
crm for sales teams
best crm for startups
crm pipeline management
crm software reviews
enterprise crm solutions
crm automation tools
how to choose a crm
simple crm for freelancers
crm software features
crm customer tracking
cheap crm software
crm vs spreadsheet`;

export const KeywordClusteringView: React.FC<KeywordClusteringViewProps> = ({ onSaveKeyword }) => {
  const [rawText, setRawText] = useState(SAMPLE_LIST);
  const [clusters, setClusters] = useState<KeywordCluster[]>(() => {
    const lines = SAMPLE_LIST.split('\n').filter(Boolean);
    return clusterKeywords(lines);
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCluster = () => {
    const lines = rawText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = clusterKeywords(lines);
      setClusters(result);
      setIsProcessing(false);
    }, 300);
  };

  const handleExport = () => {
    exportToJSON(clusters, 'keyword_clusters_export.json');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Clustering &amp; Grouping</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Keyword Clustering &amp; Semantic Topic Pillar Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Group hundreds of disparate search queries into coherent topic clusters. Stop keyword cannibalization and design content architecture that ranks multiple search terms on a single page.
        </p>
      </div>

      {/* Input Textarea Box */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Enter Keywords to Cluster (One per line)
          </label>
          <button
            onClick={() => setRawText(SAMPLE_LIST)}
            className="text-xs text-emerald-700 font-semibold hover:underline"
          >
            Load Sample Keyword List
          </button>
        </div>

        <textarea
          rows={6}
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          placeholder="Paste keywords here (e.g. best crm, free crm, crm pricing)..."
          className="w-full p-3 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900"
        />

        <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {rawText.split('\n').filter(Boolean).length} keywords ready for semantic analysis
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRawText('')}
              className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
            >
              Clear
            </button>
            <button
              onClick={handleCluster}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isProcessing ? 'Clustering...' : 'Cluster Keywords'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Clusters View */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Identified Topic Clusters ({clusters.length})
            </h2>
            <p className="text-xs text-slate-500">
              Target one comprehensive article per cluster to dominate search results.
            </p>
          </div>
          <button
            onClick={handleExport}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export All Clusters (JSON)</span>
          </button>
        </div>

        <div className="space-y-5">
          {clusters.map((cluster, idx) => (
            <div
              key={cluster.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Cluster Header */}
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Pillar #{idx + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {cluster.pillarName}
                    </h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>Primary Keyword: <strong className="text-slate-800">"{cluster.primaryKeyword}"</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Dominant Intent: <strong className="text-slate-800">{cluster.dominantIntent}</strong></span>
                    <span aria-hidden="true">·</span>
                    <span>Keywords: <strong className="text-slate-800">{cluster.keywords.length}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Volume</span>
                    <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                      {cluster.totalVolume.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Avg Difficulty</span>
                    <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                      {cluster.averageDifficulty} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Content Angle */}
              <div className="px-5 py-3 bg-emerald-50/40 border-b border-emerald-100 text-xs text-slate-700 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Recommended Content Strategy:</strong> {cluster.contentAngle}
                </span>
              </div>

              {/* Keywords Table in this cluster */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-2.5 px-5">Target Term</th>
                      <th className="py-2.5 px-5">Search Volume</th>
                      <th className="py-2.5 px-5">Difficulty</th>
                      <th className="py-2.5 px-5">Est. CPC</th>
                      <th className="py-2.5 px-5 text-right">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {cluster.keywords.map((kw, kIdx) => (
                      <tr key={kw.id} className="hover:bg-slate-50/60">
                        <td className="py-2.5 px-5 font-medium text-slate-900">
                          {kw.keyword}
                        </td>
                        <td className="py-2.5 px-5 font-mono tabular-nums text-slate-700">
                          {kw.volume.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-5 font-mono tabular-nums text-slate-600">
                          {kw.difficulty}
                        </td>
                        <td className="py-2.5 px-5 font-mono tabular-nums text-slate-600">
                          ${kw.cpc.toFixed(2)}
                        </td>
                        <td className="py-2.5 px-5 text-right">
                          <span
                            className={`text-[11px] font-semibold ${
                              kIdx === 0 ? 'text-emerald-700 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {kIdx === 0 ? 'Primary H1 / Title' : 'Secondary H2 Subheading'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
