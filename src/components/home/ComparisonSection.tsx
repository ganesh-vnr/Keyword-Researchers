import React from 'react';
import { Check, X, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../../types/seo';

interface ComparisonSectionProps {
  onNavigateCompare?: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onNavigateCompare }) => {
  const comparisonData = [
    {
      feature: 'Monthly Subscription Cost',
      purelyseo: '$0 / Forever Free',
      semrush: '$139.95 / mo',
      ahrefs: '$129.00 / mo',
      keywordsEverywhere: 'Pay-per-credit ($15+)',
      highlight: true,
    },
    {
      feature: 'Account Signup & Credit Card Required',
      purelyseo: 'No (Instant Access)',
      semrush: 'Mandatory',
      ahrefs: 'Mandatory',
      keywordsEverywhere: 'Mandatory',
      highlight: false,
    },
    {
      feature: 'Monthly Search Volume & Trends',
      purelyseo: 'Yes (12-Mo Trend)',
      semrush: 'Yes',
      ahrefs: 'Yes',
      keywordsEverywhere: 'Yes',
      highlight: false,
    },
    {
      feature: 'Keyword Difficulty (KD) Score',
      purelyseo: 'Yes (0-100 Scale)',
      semrush: 'Yes',
      ahrefs: 'Yes',
      keywordsEverywhere: 'Limited',
      highlight: false,
    },
    {
      feature: 'Semantic Topic Clustering',
      purelyseo: 'Included Free',
      semrush: 'Higher Tier ($249+)',
      ahrefs: 'Separate Credits',
      keywordsEverywhere: 'No',
      highlight: true,
    },
    {
      feature: 'SERP Pixel Snippet Simulator',
      purelyseo: 'Desktop + Mobile Live',
      semrush: 'Limited Preview',
      ahrefs: 'No Preview',
      keywordsEverywhere: 'No',
      highlight: false,
    },
    {
      feature: 'Content Density & TF-IDF Analyzer',
      purelyseo: 'Included Free',
      semrush: 'Content Add-on ($)',
      ahrefs: 'No',
      keywordsEverywhere: 'No',
      highlight: false,
    },
    {
      feature: 'YouTube Tags & Video Optimization',
      purelyseo: 'Included Free',
      semrush: 'No',
      ahrefs: 'YouTube tool only',
      keywordsEverywhere: 'Basic overlay',
      highlight: false,
    },
    {
      feature: 'Data Export to CSV & JSON',
      purelyseo: 'Unlimited & Free',
      semrush: 'Row limited on basic',
      ahrefs: 'Export credit caps',
      keywordsEverywhere: 'Consumes credits',
      highlight: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Unboxed metadata */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-teal-800 mb-2">
            <span>Market Transparency</span>
            <span aria-hidden="true">·</span>
            <span>Feature Breakdown</span>
            <span aria-hidden="true">·</span>
            <span>Zero Paywall Promise</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How PurelySEO Compares to Legacy Paid SEO Tools
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Legacy tools charge $1,200 to $1,800 every year just for fundamental keyword volume and difficulty lookups. We believe search intelligence should be open, fast, and accessible to everyone.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70">
                <th className="py-4 px-5 text-xs font-bold text-slate-700 uppercase tracking-wider w-1/3">
                  Capability / Feature
                </th>
                <th className="py-4 px-5 text-xs font-bold text-teal-900 uppercase tracking-wider bg-teal-50/90 border-x border-teal-200 w-1/4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    <span>PurelySEO (Free)</span>
                  </div>
                </th>
                <th className="py-4 px-5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Semrush Pro
                </th>
                <th className="py-4 px-5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Ahrefs Lite
                </th>
                <th className="py-4 px-5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Keywords Everywhere
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium">
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50/60 transition-colors ${
                    row.highlight ? 'bg-teal-50/25' : ''
                  }`}
                >
                  <td className="py-3.5 px-5 text-slate-800 font-semibold">
                    {row.feature}
                  </td>
                  <td className="py-3.5 px-5 bg-teal-50/40 border-x border-teal-100 font-bold text-teal-900 font-mono tabular-nums">
                    {row.purelyseo}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 font-mono tabular-nums">
                    {row.semrush}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 font-mono tabular-nums">
                    {row.ahrefs}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 font-mono tabular-nums">
                    {row.keywordsEverywhere}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Claim to Proof note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Data verified across current 2026 pricing tiers. All trademarks belong to their respective copyright holders.
        </div>
      </div>
    </section>
  );
};
