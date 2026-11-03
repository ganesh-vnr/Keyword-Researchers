import React, { useState } from 'react';
import { Chrome, Search, TrendingUp, Check, ExternalLink, ArrowRight, Download } from 'lucide-react';
import { getKeywordMetrics } from '../../services/keywordEngine';

export const LiveExtensionDemo: React.FC = () => {
  const [serpQuery, setSerpQuery] = useState('best crm software');
  const metric = getKeywordMetrics(serpQuery);

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Unboxed metadata */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
            <span>Free Browser Extension</span>
            <span aria-hidden="true">·</span>
            <span>Chrome &amp; Edge Compatible</span>
            <span aria-hidden="true">·</span>
            <span>Zero Account Required</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See Search Demand Directly Inside Google &amp; YouTube
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Stop switching between tabs. The KeyNumbers companion extension overlays estimated monthly search volume, competition, and CPC right beside Google and YouTube search results.
          </p>
        </div>

        {/* Interactive Live SERP Simulation Box */}
        <div className="bg-slate-900 rounded-2xl p-3 sm:p-5 shadow-xl border border-slate-800 max-w-5xl mx-auto">
          {/* Simulated Browser Chrome Bar */}
          <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
                https://www.google.com/search?q={encodeURIComponent(serpQuery)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <Chrome className="w-3.5 h-3.5" />
              <span>KeyNumbers Extension: Active</span>
            </div>
          </div>

          {/* Simulated Google Search Page with KeyNumbers Overlay */}
          <div className="bg-white rounded-xl mt-3 p-4 sm:p-6 text-slate-900 min-h-[440px]">
            {/* Google Search Bar in simulation */}
            <div className="flex items-center gap-3 max-w-2xl pb-4 border-b border-slate-100">
              <span className="text-xl font-bold tracking-tight text-slate-800">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-amber-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-emerald-500">l</span>
                <span className="text-red-500">e</span>
              </span>
              <div className="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200">
                <input
                  type="text"
                  value={serpQuery}
                  onChange={e => setSerpQuery(e.target.value)}
                  placeholder="Test query..."
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 focus:outline-none"
                />
                <Search className="w-4 h-4 text-slate-400 ml-2" />
              </div>
            </div>

            {/* Split layout: Google Results on Left (65%), KeyNumbers Extension Sidebar on Right (35%) */}
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Google Results Simulation */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[11px] text-slate-400">
                  About 14,200,000 results (0.42 seconds)
                </div>

                {/* Simulated Google Organic Result 1 */}
                <div className="text-left">
                  <div className="text-[11px] text-slate-500">https://softwareadvice.com › crm › best-tools</div>
                  <h3 className="text-base text-blue-800 hover:underline font-semibold leading-tight mt-0.5">
                    10 Best CRM Software Solutions for 2026 (Full Comparison)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Looking for the best CRM systems? Compare features, pricing, customer reviews, and enterprise integrations to choose the ideal CRM for your sales pipeline.
                  </p>
                </div>

                {/* Simulated Google Organic Result 2 */}
                <div className="text-left">
                  <div className="text-[11px] text-slate-500">https://hubspot.com › products › crm</div>
                  <h3 className="text-base text-blue-800 hover:underline font-semibold leading-tight mt-0.5">
                    Free CRM Software for Small Business &amp; Enterprise Teams
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Everything you need to organize, track, and build better relationships with leads and customers. 100% free with unlimited user seats and contact history.
                  </p>
                </div>

                {/* Simulated Google Organic Result 3 */}
                <div className="text-left">
                  <div className="text-[11px] text-slate-500">https://techradar.com › best › best-crm</div>
                  <h3 className="text-base text-blue-800 hover:underline font-semibold leading-tight mt-0.5">
                    Top CRM Software Rated by Editors &amp; Industry Experts
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    Our in-depth testing reviews the top customer relationship management software across ease of use, automation, mobile accessibility, and custom pipelines.
                  </p>
                </div>
              </div>

              {/* The KeyNumbers Live SERP Extension Overlay Widget */}
              <div className="lg:col-span-5 bg-slate-50 rounded-xl border-2 border-emerald-500/60 p-4 shadow-sm relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      K#
                    </div>
                    <span className="text-xs font-bold text-slate-900">KeyNumbers SERP Bar</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                    Live Overlay
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Volume</span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                      {metric.volume.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block">/month</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. CPC</span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                      ${metric.cpc.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">USD</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Difficulty</span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                      {metric.difficulty} / 100
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold block">Competitive</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intent</span>
                    <span className="text-sm font-extrabold text-slate-900">
                      {metric.intent}
                    </span>
                    <span className="text-[10px] text-slate-400 block">High Buyer</span>
                  </div>
                </div>

                {/* Related Searches in extension */}
                <div className="mt-3 pt-3 border-t border-slate-200 text-left">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block mb-1.5">
                    Instant Related Searches
                  </span>
                  <div className="space-y-1">
                    {[
                      `${serpQuery} for small business`,
                      `free ${serpQuery}`,
                      `${serpQuery} open source`,
                    ].map((rel, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] py-1 px-1.5 rounded hover:bg-slate-100">
                        <span className="text-slate-700 truncate">{rel}</span>
                        <span className="text-slate-400 font-mono text-[10px] shrink-0 ml-1">
                          {(metric.volume * (0.3 - i * 0.08)).toFixed(0)}/mo
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extension CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Install Free Chrome Extension</span>
          </a>
          <span className="text-xs text-slate-500">
            Compatible with Google Chrome, Microsoft Edge, and Brave Browser.
          </span>
        </div>
      </div>
    </section>
  );
};
