import React from 'react';
import { Shield, Zap, Globe, Heart, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types/seo';

interface AboutPageProps {
  onNavigateTool: (toolId: ActiveTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateTool }) => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
            <span>Our Founding Philosophy</span>
            <span aria-hidden="true">·</span>
            <span>Independent &amp; Bootstrapped</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Democratizing Search Demand Data
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Search engine intelligence should be accessible to solo entrepreneurs, independent publishers, students, and boutique agencies—not locked behind $100+/mo paywalls.
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Why We Built KeyNumbers
            </h2>
            <p>
              In the early days of the web, search volume data was publicly discoverable via open Google AdWords tools without requiring active credit card billing. Over the past decade, enterprise SEO companies consolidated the market and imposed mandatory monthly subscriptions starting at $1,200 to $2,500 every year.
            </p>
            <p className="mt-3">
              We founded KeyNumbers as an independent, transparent alternative. We model real clickstream volume benchmarks and Google SERP metrics directly in your browser with zero paywalls, zero login gates, and unlimited free exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <Zap className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 mb-1">Instant Real-Time Execution</h3>
              <p className="text-slate-500 text-xs">
                No slow server rendering queues. Calculations occur instantly with client-side caching.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <Shield className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 mb-1">Privacy First</h3>
              <p className="text-slate-500 text-xs">
                Your keyword lists and campaign targets remain strictly on your local machine.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-slate-200">
              <Globe className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-slate-900 mb-1">Global Coverage</h3>
              <p className="text-slate-500 text-xs">
                Calibrated against US, UK, Canada, Australia, Germany, India, and global search databases.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigateTool('tool-volume')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Explore All 16+ SEO Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
