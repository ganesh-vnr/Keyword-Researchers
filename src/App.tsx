import React, { useState, useEffect } from 'react';
import { ActiveTab, KeywordMetric } from './types/seo';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { QuickSearchModal } from './components/common/QuickSearchModal';
import { HeroSearch } from './components/home/HeroSearch';
import { ToolsGrid } from './components/home/ToolsGrid';
import { LiveExtensionDemo } from './components/home/LiveExtensionDemo';
import { ComparisonSection } from './components/home/ComparisonSection';

// Tools
import { KeywordVolumeView } from './components/tools/KeywordVolumeView';
import { KeywordDifficultyView } from './components/tools/KeywordDifficultyView';
import { KeywordIdeasView } from './components/tools/KeywordIdeasView';
import { KeywordClusteringView } from './components/tools/KeywordClusteringView';
import { QuestionPaaView } from './components/tools/QuestionPaaView';
import { SearchIntentView } from './components/tools/SearchIntentView';
import { KeywordDensityView } from './components/tools/KeywordDensityView';
import { SerpPreviewView } from './components/tools/SerpPreviewView';
import { ContentBriefView } from './components/tools/ContentBriefView';
import { KeywordCannibalizationView } from './components/tools/KeywordCannibalizationView';
import { RobotsSitemapView } from './components/tools/RobotsSitemapView';
import { RedirectCheckerView } from './components/tools/RedirectCheckerView';
import { SecurityDnsView } from './components/tools/SecurityDnsView';
import { YouTubeTagsView } from './components/tools/YouTubeTagsView';
import { RoiCalculatorView } from './components/tools/RoiCalculatorView';
import { KeywordGapView } from './components/tools/KeywordGapView';

// Dedicated Pages
import { ExtensionPage } from './components/pages/ExtensionPage';
import { ComparePage } from './components/pages/ComparePage';
import { GuidesPage } from './components/pages/GuidesPage';
import { SavedKeywordsPage } from './components/pages/SavedKeywordsPage';
import { ApiDocsPage } from './components/pages/ApiDocsPage';
import { AboutPage } from './components/pages/AboutPage';
import { PrivacyPage, TermsPage } from './components/pages/PrivacyPage';

import { getSavedLists, addKeywordToList } from './services/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('seo tools');
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(() => {
    const lists = getSavedLists();
    return lists.reduce((acc, l) => acc + l.keywords.length, 0);
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync tab navigation with window scroll
  const handleNavigate = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveKeyword = (metric: KeywordMetric) => {
    const lists = getSavedLists();
    const defaultList = lists[0];
    if (defaultList) {
      addKeywordToList(defaultList.id, metric);
      const updated = getSavedLists();
      setSavedCount(updated.reduce((acc, l) => acc + l.keywords.length, 0));
      showToast(`Saved "${metric.keyword}" to ${defaultList.name}`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Universal Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        savedKeywordsCount={savedCount}
        onOpenQuickSearch={() => setQuickSearchOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSearch
              onSelectKeyword={kw => {
                setSelectedKeyword(kw);
              }}
              onSaveKeyword={handleSaveKeyword}
              onNavigateTool={handleNavigate}
            />
            <ToolsGrid onSelectTool={handleNavigate} />
            <LiveExtensionDemo />
            <ComparisonSection onNavigateCompare={() => handleNavigate('compare')} />
          </>
        )}

        {/* Tools Catalog page */}
        {activeTab === 'tools' && (
          <div className="py-8">
            <ToolsGrid onSelectTool={handleNavigate} />
          </div>
        )}

        {/* Individual SEO Tools */}
        {activeTab === 'tool-volume' && (
          <KeywordVolumeView
            initialKeyword={selectedKeyword}
            onSaveKeyword={handleSaveKeyword}
            onSelectKeyword={kw => setSelectedKeyword(kw)}
          />
        )}

        {activeTab === 'tool-difficulty' && (
          <KeywordDifficultyView
            initialKeyword={selectedKeyword}
            onSaveKeyword={handleSaveKeyword}
          />
        )}

        {activeTab === 'tool-ideas' && (
          <KeywordIdeasView
            initialKeyword={selectedKeyword}
            onSaveKeyword={handleSaveKeyword}
            onSelectKeyword={kw => setSelectedKeyword(kw)}
          />
        )}

        {activeTab === 'tool-clustering' && (
          <KeywordClusteringView onSaveKeyword={handleSaveKeyword} />
        )}

        {activeTab === 'tool-questions' && (
          <QuestionPaaView initialKeyword={selectedKeyword} />
        )}

        {activeTab === 'tool-intent' && <SearchIntentView />}

        {activeTab === 'tool-density' && <KeywordDensityView />}

        {activeTab === 'tool-serp-preview' && <SerpPreviewView />}

        {activeTab === 'tool-brief' && <ContentBriefView />}

        {activeTab === 'tool-cannibalization' && <KeywordCannibalizationView />}

        {activeTab === 'tool-robots-sitemap' && <RobotsSitemapView />}

        {activeTab === 'tool-redirect' && <RedirectCheckerView />}

        {activeTab === 'tool-security-dns' && <SecurityDnsView />}

        {activeTab === 'tool-youtube' && <YouTubeTagsView />}

        {activeTab === 'tool-roi' && <RoiCalculatorView />}

        {activeTab === 'tool-gap' && <KeywordGapView />}

        {/* Standalone Pages */}
        {activeTab === 'extension' && <ExtensionPage />}

        {activeTab === 'compare' && (
          <ComparePage onNavigateTool={handleNavigate} />
        )}

        {activeTab === 'guides' && <GuidesPage />}

        {activeTab === 'saved' && (
          <SavedKeywordsPage
            onSelectKeyword={kw => {
              setSelectedKeyword(kw);
              handleNavigate('tool-volume');
            }}
            onNavigateTool={handleNavigate}
          />
        )}

        {activeTab === 'api-docs' && <ApiDocsPage />}

        {activeTab === 'about' && (
          <AboutPage onNavigateTool={handleNavigate} />
        )}

        {activeTab === 'privacy' && <PrivacyPage />}

        {activeTab === 'terms' && <TermsPage />}
      </main>

      {/* Universal Footer */}
      <Footer setActiveTab={handleNavigate} />

      {/* Quick Search Modal (Cmd/Ctrl + K) */}
      <QuickSearchModal
        isOpen={quickSearchOpen}
        onClose={() => setQuickSearchOpen(false)}
        onSelectTab={handleNavigate}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-xl border border-slate-800 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
