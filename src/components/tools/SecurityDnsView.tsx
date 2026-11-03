import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle, XCircle, AlertTriangle, Lock, Globe, Server } from 'lucide-react';

interface SecurityHeader {
  name: string;
  status: 'passed' | 'warning' | 'missing';
  value: string;
  description: string;
}

interface DnsRecord {
  type: string;
  value: string;
  ttl: number;
}

export const SecurityDnsView: React.FC = () => {
  const [domain, setDomain] = useState('github.com');
  const [isAuditing, setIsAuditing] = useState(false);

  const [headers, setHeaders] = useState<SecurityHeader[]>([
    {
      name: 'Strict-Transport-Security (HSTS)',
      status: 'passed',
      value: 'max-age=31536000; includeSubDomains; preload',
      description: 'Enforces HTTPS encryption and prevents downgrade SSL attacks.',
    },
    {
      name: 'Content-Security-Policy (CSP)',
      status: 'passed',
      value: "default-src 'self'; script-src 'self' 'nonce-xyz'",
      description: 'Prevents Cross-Site Scripting (XSS) and arbitrary resource injection.',
    },
    {
      name: 'X-Frame-Options',
      status: 'passed',
      value: 'DENY',
      description: 'Protects visitors against clickjacking framing attacks.',
    },
    {
      name: 'X-Content-Type-Options',
      status: 'passed',
      value: 'nosniff',
      description: 'Stops MIME-type sniffing from executing unauthorized payloads.',
    },
    {
      name: 'Referrer-Policy',
      status: 'passed',
      value: 'origin-when-cross-origin, strict-origin-when-cross-origin',
      description: 'Limits transmission of sensitive referral path data.',
    },
  ]);

  const [dnsRecords, setDnsRecords] = useState<DnsRecord[]>([
    { type: 'A', value: '140.82.112.4', ttl: 300 },
    { type: 'AAAA', value: '2606:50c0:8000::153', ttl: 300 },
    { type: 'MX', value: 'aspmx.l.google.com (Priority 1)', ttl: 3600 },
    { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 },
    { type: 'NS', value: 'ns-1707.awsdns-21.co.uk', ttl: 86400 },
  ]);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Technical SEO</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Security Headers &amp; DNS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Security Headers &amp; DNS Health Inspector
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Evaluate critical security headers (HSTS, CSP, X-Frame-Options), SSL certificate validation, and authoritative DNS records (A, AAAA, MX, TXT).
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleAudit} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={domain}
              onChange={e => setDomain(e.target.value)}
              placeholder="Enter domain name (e.g. github.com, stripe.com)..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isAuditing}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm shrink-0"
          >
            {isAuditing ? 'Inspecting...' : 'Audit Security & DNS'}
          </button>
        </form>
      </div>

      {/* SSL Grade and Quick Score */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 font-extrabold text-2xl flex items-center justify-center font-mono">
            A+
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Security Grade
            </span>
            <span className="text-sm font-bold text-slate-900">
              Optimal Header Configuration
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Lock className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              TLS / SSL Certificate
            </span>
            <span className="text-sm font-bold text-slate-900">
              TLS 1.3 · Valid 280 Days
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Globe className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Authoritative DNS
            </span>
            <span className="text-sm font-bold text-slate-900">
              5 Verified Records Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Security Headers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-8 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 uppercase tracking-wider">
            HTTP Security Headers Audit
          </span>
          <span className="text-teal-700 font-semibold">
            5 / 5 Headers Implemented
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {headers.map((h, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-bold text-slate-900">{h.name}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{h.description}</p>
                <div className="mt-1.5 p-1.5 bg-slate-100 rounded font-mono text-[11px] text-slate-700 break-all">
                  {h.value}
                </div>
              </div>
              <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 self-start sm:self-auto shrink-0">
                Active &amp; Compliant
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Records */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
          DNS Zone Records for {domain}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-5">Type</th>
                <th className="py-2.5 px-5">Target Value / IP</th>
                <th className="py-2.5 px-5 text-right">TTL (Seconds)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-mono">
              {dnsRecords.map((rec, i) => (
                <tr key={i} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-5 font-bold text-teal-700">{rec.type}</td>
                  <td className="py-2.5 px-5 text-slate-800">{rec.value}</td>
                  <td className="py-2.5 px-5 text-right text-slate-500">{rec.ttl}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
