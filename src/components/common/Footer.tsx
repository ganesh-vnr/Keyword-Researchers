import React from 'react';
import { ActiveTab } from '../../types/seo';
import { TOOLS_CATALOG } from '../../data/toolsData';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const keywordTools = TOOLS_CATALOG.filter(t => t.category === 'Keyword Research');
  const contentTools = TOOLS_CATALOG.filter(t => t.category === 'Content & On-Page');
  const techTools = TOOLS_CATALOG.filter(t => t.category === 'Technical SEO');
  const videoRoiTools = TOOLS_CATALOG.filter(t => t.category === 'Video & ROI');

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded bg-emerald-500 text-white font-bold flex items-center justify-center text-sm">
                K#
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">KeyNumbers</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Independent, open SEO intelligence platform providing free monthly search volume, keyword difficulty, topic clustering, and technical audit utilities without paywalls.
            </p>
            <div className="text-xs text-slate-500">
              Calibrated with global clickstream &amp; search demand models.
            </div>
          </div>

          {/* Keyword Research */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Keyword Research
            </h4>
            <ul className="space-y-2 text-xs">
              {keywordTools.map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      setActiveTab(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-slate-400 text-left"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content & On-Page */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Content &amp; On-Page
            </h4>
            <ul className="space-y-2 text-xs">
              {contentTools.map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      setActiveTab(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-slate-400 text-left"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical & Video Tools */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Technical &amp; Video
            </h4>
            <ul className="space-y-2 text-xs">
              {[...techTools, ...videoRoiTools].map(t => (
                <li key={t.id}>
                  <button
                    onClick={() => {
                      setActiveTab(t.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-slate-400 text-left"
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Platform */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('extension');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  Chrome Extension
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('compare');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  Alternative Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('guides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  SEO Guides &amp; Tutorials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('saved');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  Saved Keywords Lists
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('api-docs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  REST API Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  About KeyNumbers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('privacy');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('terms');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors text-slate-400 text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} KeyNumbers Inc. All rights reserved. Built for independent marketers and publishers.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>No Cookies Trackers</span>
            <span>·</span>
            <span>Zero Paywall Access</span>
            <span>·</span>
            <span>Public API Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
