import React from 'react';
import { Chrome, Download, Check, ShieldCheck, Zap, Star, ExternalLink, HelpCircle } from 'lucide-react';
import { LiveExtensionDemo } from '../home/LiveExtensionDemo';

export const ExtensionPage: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      {/* Top Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>Browser Extension</span>
          <span aria-hidden="true">·</span>
          <span>Version 3.4</span>
          <span aria-hidden="true">·</span>
          <span>Chrome Web Store Verified</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Search Demand &amp; CPC Directly on Google &amp; YouTube
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The KeyNumbers browser extension brings search volume, competition metrics, and related search queries directly onto the search engine result pages you use every day.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Add to Chrome - 100% Free</span>
          </a>
          <span className="text-xs text-slate-500">
            No registration · No credit card · Over 45,000+ active SEOs
          </span>
        </div>
      </div>

      {/* Interactive Demonstration */}
      <LiveExtensionDemo />

      {/* Key Features 3-Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Engineered for Fast, Distraction-Free Research
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Eliminates constant context switching between search engines and heavy $100+/mo dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Instant Google SERP Overlay
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whenever you search on Google, KeyNumbers injects a floating sidebar with monthly search volume, historical trend direction, CPC in USD, and top 10 related long-tail keywords.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              YouTube Video Tag Analytics
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect any video on YouTube to view hidden video tags, estimated monthly search volume on YouTube, and title engagement scores with a single click.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Zero Data Collection &amp; Privacy-First
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never track your personal browsing history, sell user data, or inject sponsored affiliate ads into your search result pages. Clean, privacy-conscious code.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-1">
              Is the KeyNumbers Chrome extension truly 100% free?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Yes. You do not need to enter a credit card, purchase credits, or subscribe to any hidden tier. All monthly search volumes and CPC benchmarks are completely free.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-1">
              Which web browsers are supported?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              The extension is built on standard WebExtensions Manifest V3 and works seamlessly on Google Chrome, Microsoft Edge, Brave, and Opera.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-white">
            <h3 className="font-bold text-slate-900 mb-1">
              Where does the search volume data originate?
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Our data pipeline models official Google Keyword Planner search volume historical data combined with global clickstream distributions to estimate accurate monthly search demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
