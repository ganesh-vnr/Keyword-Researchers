import React, { useState } from 'react';
import { Bookmark, Plus, Trash2, Download, Layers, ArrowUpRight, Search } from 'lucide-react';
import { SavedKeywordList, KeywordMetric, ActiveTab } from '../../types/seo';
import {
  getSavedLists,
  saveList,
  createNewList,
  deleteList,
  removeKeywordFromList,
  exportKeywordsToCSV,
  exportToJSON,
} from '../../services/storage';

interface SavedKeywordsPageProps {
  onSelectKeyword: (kw: string) => void;
  onNavigateTool: (toolId: ActiveTab) => void;
}

export const SavedKeywordsPage: React.FC<SavedKeywordsPageProps> = ({
  onSelectKeyword,
  onNavigateTool,
}) => {
  const [lists, setLists] = useState<SavedKeywordList[]>(() => getSavedLists());
  const [activeListId, setActiveListId] = useState<string>(() => lists[0]?.id || '');
  const [newListName, setNewListName] = useState('');
  const [isCreatingList, setIsCreatingList] = useState(false);

  const activeList = lists.find(l => l.id === activeListId) || lists[0];

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const created = createNewList(newListName);
    setLists(getSavedLists());
    setActiveListId(created.id);
    setNewListName('');
    setIsCreatingList(false);
  };

  const handleDeleteList = (id: string) => {
    if (lists.length <= 1) return; // Keep at least one
    deleteList(id);
    const updated = getSavedLists();
    setLists(updated);
    setActiveListId(updated[0]?.id || '');
  };

  const handleRemoveKeyword = (keywordStr: string) => {
    if (!activeList) return;
    removeKeywordFromList(activeList.id, keywordStr);
    setLists(getSavedLists());
  };

  const handleExportCSV = () => {
    if (!activeList || activeList.keywords.length === 0) return;
    exportKeywordsToCSV(activeList.keywords, `${activeList.name.replace(/\s+/g, '_')}.csv`);
  };

  const totalVol = activeList?.keywords.reduce((acc, k) => acc + k.volume, 0) || 0;
  const avgKd =
    activeList?.keywords.length > 0
      ? Math.round(
          activeList.keywords.reduce((acc, k) => acc + k.difficulty, 0) /
            activeList.keywords.length
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Workspace</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Saved Keyword Lists</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Saved Keyword Lists &amp; Campaign Workspace
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Organize target search queries into custom lists, analyze aggregate search volume demand, and export clean CSV datasets for content planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Lists Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                My Keyword Lists ({lists.length})
              </span>
              <button
                onClick={() => setIsCreatingList(!isCreatingList)}
                className="text-xs text-teal-700 font-semibold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New List</span>
              </button>
            </div>

            {/* Create new list form */}
            {isCreatingList && (
              <form onSubmit={handleCreateList} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="List name (e.g. Q1 Content Pillars)..."
                  value={newListName}
                  onChange={e => setNewListName(e.target.value)}
                  className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold"
                >
                  Create
                </button>
              </form>
            )}

            {/* Lists selection */}
            <div className="mt-3 space-y-1">
              {lists.map(list => (
                <div
                  key={list.id}
                  onClick={() => setActiveListId(list.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                    activeList?.id === list.id
                      ? 'bg-teal-50 border border-teal-200 text-teal-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="text-xs">{list.name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {list.keywords.length} keywords · {list.createdAt}
                    </span>
                  </div>

                  {lists.length > 1 && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteList(list.id);
                      }}
                      className="p-1 text-slate-300 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Active List Content */}
        <div className="lg:col-span-8 space-y-6">
          {activeList && (
            <>
              {/* Header with KPI cards */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    {activeList.name}
                  </h2>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                    <span>
                      Total Demand:{' '}
                      <strong className="font-mono text-slate-800">
                        {totalVol.toLocaleString()} / mo
                      </strong>
                    </span>
                    <span>·</span>
                    <span>
                      Avg KD:{' '}
                      <strong className="font-mono text-slate-800">
                        {avgKd} / 100
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    disabled={activeList.keywords.length === 0}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {activeList.keywords.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-800">
                      No keywords saved to this list yet
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Use the Keyword Volume or Long-Tail Suggester tools to research and save high-opportunity keywords.
                    </p>
                    <button
                      onClick={() => onNavigateTool('tool-volume')}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Search Keywords
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                          <th className="py-3 px-5">Target Query</th>
                          <th className="py-3 px-5">Search Volume</th>
                          <th className="py-3 px-5">KD</th>
                          <th className="py-3 px-5">CPC</th>
                          <th className="py-3 px-5">Intent</th>
                          <th className="py-3 px-5 text-right">Remove</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {activeList.keywords.map(kw => (
                          <tr key={kw.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-5 font-semibold text-slate-900">
                              <button
                                onClick={() => {
                                  onSelectKeyword(kw.keyword);
                                  onNavigateTool('tool-volume');
                                }}
                                className="hover:text-emerald-700 text-left flex items-center gap-1"
                              >
                                <span>{kw.keyword}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                              </button>
                            </td>
                            <td className="py-3 px-5 font-mono tabular-nums text-slate-700 font-semibold">
                              {kw.volume.toLocaleString()}
                            </td>
                            <td className="py-3 px-5 font-mono tabular-nums">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold ${
                                  kw.difficulty < 35
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : kw.difficulty < 70
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {kw.difficulty}
                              </span>
                            </td>
                            <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                              ${kw.cpc.toFixed(2)}
                            </td>
                            <td className="py-3 px-5 text-slate-600">
                              {kw.intent}
                            </td>
                            <td className="py-3 px-5 text-right">
                              <button
                                onClick={() => handleRemoveKeyword(kw.keyword)}
                                className="p-1 text-slate-300 hover:text-rose-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
