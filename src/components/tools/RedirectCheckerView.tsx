import React, { useState } from 'react';
import { ArrowRightLeft, Search, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

interface RedirectHop {
  url: string;
  statusCode: number;
  statusText: string;
  latencyMs: number;
  server: string;
  ip: string;
}

export const RedirectCheckerView: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('http://github.com');
  const [hops, setHops] = useState<RedirectHop[]>([
    {
      url: 'http://github.com',
      statusCode: 301,
      statusText: 'Moved Permanently',
      latencyMs: 42,
      server: 'GitHub.com',
      ip: '140.82.112.4',
    },
    {
      url: 'https://github.com/',
      statusCode: 200,
      statusText: 'OK',
      latencyMs: 78,
      server: 'GitHub.com',
      ip: '140.82.112.4',
    },
  ]);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl.trim()) return;

    setIsChecking(true);
    setTimeout(() => {
      let clean = targetUrl.trim();
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        clean = 'http://' + clean;
      }

      const isHttp = clean.startsWith('http://');
      const simulatedHops: RedirectHop[] = [];

      if (isHttp) {
        simulatedHops.push({
          url: clean,
          statusCode: 301,
          statusText: 'Moved Permanently',
          latencyMs: 48,
          server: 'nginx/1.24',
          ip: '104.21.48.192',
        });
        const secureUrl = clean.replace('http://', 'https://');
        simulatedHops.push({
          url: secureUrl.endsWith('/') ? secureUrl : secureUrl + '/',
          statusCode: 200,
          statusText: 'OK',
          latencyMs: 64,
          server: 'cloudflare',
          ip: '172.67.182.88',
        });
      } else {
        simulatedHops.push({
          url: clean,
          statusCode: 200,
          statusText: 'OK',
          latencyMs: 55,
          server: 'cloudflare',
          ip: '172.67.182.88',
        });
      }

      setHops(simulatedHops);
      setIsChecking(false);
    }, 400);
  };

  const finalHop = hops[hops.length - 1];
  const isChainHealthy = hops.length <= 2 && finalHop?.statusCode === 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Technical SEO</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">HTTP Redirect &amp; Status</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          HTTP Redirect Chain &amp; Status Code Inspector
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Trace HTTP redirects, detect 301 and 302 canonical loops, monitor response times, and prevent crawl equity leakage across domain migrations.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleCheck} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={targetUrl}
              onChange={e => setTargetUrl(e.target.value)}
              placeholder="Enter URL to trace (e.g. http://example.com)..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isChecking}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            {isChecking ? 'Tracing...' : 'Trace Redirects'}
          </button>
        </form>
      </div>

      {/* Summary Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Final Status Code
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {finalHop?.statusCode}
            </span>
            <span
              className={`text-xs font-bold ${
                finalHop?.statusCode === 200 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {finalHop?.statusText}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Redirect Chain Hops
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {hops.length - 1}
            </span>
            <span className="text-xs text-slate-500">
              {hops.length === 1 ? 'Direct (No redirect)' : 'Hop redirect chain'}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Latency
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {hops.reduce((acc, h) => acc + h.latencyMs, 0)}
            </span>
            <span className="text-xs text-slate-400 font-mono">ms</span>
          </div>
        </div>
      </div>

      {/* Chain Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
          Redirect Path Sequence
        </h3>

        <div className="space-y-4">
          {hops.map((hop, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 ${
                  hop.statusCode === 200
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {hop.statusCode}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-bold text-slate-900 font-mono break-all">
                    {hop.url}
                  </span>
                  <span className="text-xs text-slate-500 font-mono shrink-0">
                    {hop.latencyMs}ms · {hop.server}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>Server IP: <strong className="font-mono">{hop.ip}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Header: <strong className="text-slate-700">{hop.statusText}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
