import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ChevronRight, Zap } from 'lucide-react';
import { ActiveTab } from '../../types/seo';
import { TOOLS_CATALOG } from '../../data/toolsData';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedKeywordsCount: number;
  onOpenQuickSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedKeywordsCount,
  onOpenQuickSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: PurelySEO Logo & Wordmark */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left shrink-0 group focus:outline-none"
          >
            <Logo size="md" />
          </button>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('tools')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'tools' || activeTab.startsWith('tool-')
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              All Tools
            </button>
            <button
              onClick={() => setActiveTab('extension')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'extension'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              Chrome Extension
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'compare'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              Comparison
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'guides' || activeTab === 'guide-detail'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              SEO Guides
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
                activeTab === 'saved'
                  ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                  : ''
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Lists</span>
              {savedKeywordsCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-teal-50 text-teal-800 text-xs font-mono font-bold rounded border border-teal-200">
                  {savedKeywordsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuickSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors"
              title="Quick find tool (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search tools...</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-400">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setActiveTab('tool-volume')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Instant Keyword Check</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/50 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActiveTab('home');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  Home &amp; Overview
                </button>
                <button
                  onClick={() => {
                    setActiveTab('tools');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  All 16+ SEO Tools
                </button>
                <button
                  onClick={() => {
                    setActiveTab('extension');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  Chrome Extension
                </button>
                <button
                  onClick={() => {
                    setActiveTab('compare');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  Ahrefs &amp; Semrush Comparison
                </button>
                <button
                  onClick={() => {
                    setActiveTab('guides');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  SEO Guides &amp; Knowledge Base
                </button>
                <button
                  onClick={() => {
                    setActiveTab('saved');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800 flex items-center justify-between"
                >
                  <span>Saved Keywords Workspace</span>
                  <span className="font-mono text-xs bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold border border-teal-200">
                    {savedKeywordsCount}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('api-docs');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2.5 px-3 rounded-md text-sm font-medium hover:bg-slate-50 text-slate-800"
                >
                  API Documentation
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-3">
                  Quick Access Tools
                </span>
                <div className="flex flex-col gap-1">
                  {TOOLS_CATALOG.slice(0, 5).map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTab(t.id);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-xs py-2 px-3 rounded text-slate-600 hover:text-teal-700 hover:bg-teal-50 flex items-center justify-between"
                    >
                      <span className="truncate">{t.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
              PurelySEO · Free, un-gated search demand data
            </div>
          </div>
        </div>
      )}
    </>
  );
};
