import React from 'react';
import { Check, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ComparisonSection } from '../home/ComparisonSection';
import { ActiveTab } from '../../types/seo';

interface ComparePageProps {
  onNavigateTool: (tab: ActiveTab) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigateTool }) => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>Objective Market Analysis</span>
          <span aria-hidden="true">·</span>
          <span>Updated November 2026</span>
          <span aria-hidden="true">·</span>
          <span>Verified Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          KeyNumbers vs. Semrush, Ahrefs &amp; Keywords Everywhere
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Detailed breakdown of costs, query limits, features, and workflow advantages. Why spend $1,200 to $1,800/year when you can access core keyword numbers for free?
        </p>
      </div>

      {/* Main Table */}
      <ComparisonSection />

      {/* Deep-dive analysis sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              1. The Real Cost of Legacy SEO Subscriptions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Standard plans for Semrush Pro ($139.95/mo) and Ahrefs Lite ($129/mo) cost over $1,500 per year. Even worse, legacy platforms enforce strict monthly export limits and credit burn rates that penalize you for simply researching topics.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
              KeyNumbers provides unlimited keyword volume lookups, clustering, SERP previews, and CSV exports with zero subscription fees.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              2. Faster, Focused Workflow Without Bloat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Enterprise SEO platforms have become cluttered with complex enterprise modules, toxic backlink audits, social schedulers, and agency reporting that 90% of content creators and independent marketers never use.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
              KeyNumbers focuses on the essentials: accurate search volume, difficulty ratings, long-tail expansion, topic clustering, and on-page SERP previews.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-emerald-950 text-white rounded-2xl p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white">
            Ready to Streamline Your Keyword Research?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-emerald-200 max-w-xl mx-auto">
            Try any of our 16+ free SEO utilities today. No signup, no credit card, and no hidden trial periods.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => onNavigateTool('tool-volume')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <span>Start Free Keyword Research</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
