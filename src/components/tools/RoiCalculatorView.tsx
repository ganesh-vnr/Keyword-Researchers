import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import { calculateOrganicRoi, SERP_CTR_CURVE } from '../../services/keywordEngine';

export const RoiCalculatorView: React.FC = () => {
  const [searchVolume, setSearchVolume] = useState<number>(45000);
  const [targetRank, setTargetRank] = useState<number>(1);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [customerValue, setCustomerValue] = useState<number>(150);
  const [cpcEstimate, setCpcEstimate] = useState<number>(3.50);

  const roi = calculateOrganicRoi(searchVolume, targetRank, conversionRate, customerValue);
  const monthlyPaidAdEquivalent = Math.round(roi.estimatedVisits * cpcEstimate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Video &amp; ROI</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Traffic &amp; ROI Calculator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Organic Search Traffic &amp; Revenue ROI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Forecast organic traffic, customer acquisition, and monthly recurring revenue based on target keyword volume and empirical Google SERP position CTR curves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Inputs Card */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Model Parameters
          </h2>

          {/* Search Volume */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Monthly Search Volume</span>
              <span className="font-mono tabular-nums text-emerald-700 font-bold">
                {searchVolume.toLocaleString()} searches
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="500000"
              step="1000"
              value={searchVolume}
              onChange={e => setSearchVolume(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Target SERP Position */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Target Google Ranking Position</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                Position #{targetRank} (CTR: {roi.ctrPct}%)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5 mt-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rank => (
                <button
                  key={rank}
                  onClick={() => setTargetRank(rank)}
                  className={`py-1.5 text-xs font-mono font-bold rounded border transition-colors ${
                    targetRank === rank
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  #{rank}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Website Conversion Rate (%)</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                {conversionRate}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="15"
              step="0.1"
              value={conversionRate}
              onChange={e => setConversionRate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Average Deal Value */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Customer Lifetime / Order Value ($ USD)</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                ${customerValue}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={customerValue}
              onChange={e => setCustomerValue(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Est CPC for Paid Ad Equivalent */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Comparable Google Ads CPC ($)</span>
              <span className="font-mono tabular-nums text-slate-900 font-bold">
                ${cpcEstimate.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.50"
              max="25.00"
              step="0.50"
              value={cpcEstimate}
              onChange={e => setCpcEstimate(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output Projections */}
        <div className="lg:col-span-7 space-y-4">
          {/* Big Revenue Projection Box */}
          <div className="bg-emerald-950 text-white p-6 rounded-xl border border-emerald-900 shadow-md">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
              Projected Monthly Organic Revenue
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-emerald-300">
                ${roi.estimatedMonthlyRevenue.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">/ month</span>
            </div>
            <div className="mt-3 pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200">
              <span>Annualized Value:</span>
              <span className="font-mono font-bold text-sm text-white">
                ${roi.estimatedAnnualRevenue.toLocaleString()} / year
              </span>
            </div>
          </div>

          {/* Intermediate KPI 3-grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Monthly Organic Visits
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
                {roi.estimatedVisits.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500">
                At {roi.ctrPct}% position CTR
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Conversions
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
                {roi.estimatedConversions.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500">
                At {conversionRate}% conv rate
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                PPC Ad Spend Saved
              </span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
                ${monthlyPaidAdEquivalent.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500">
                Cost if bought via Ads
              </span>
            </div>
          </div>

          {/* Organic CTR Curve Explanation */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Industry Standard Click-Through-Rate (CTR) Benchmark
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Google position #1 captures 27.6% of clicks, dropping to 15.8% for position #2, and under 2.5% past position #10.
            </p>
            <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono text-slate-600 pb-1">
              {SERP_CTR_CURVE.map(c => (
                <div
                  key={c.rank}
                  className={`px-2 py-1 rounded text-center shrink-0 border ${
                    targetRank === c.rank
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>#{c.rank}</div>
                  <div>{(c.ctr * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
