import React, { useState } from 'react';
import { Code, Terminal, Copy, Check, Play, Globe } from 'lucide-react';
import { copyToClipboard } from '../../services/storage';

export const ApiDocsPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'keyword' | 'cluster' | 'brief'>('keyword');
  const [testParam, setTestParam] = useState('best crm software');
  const [responseJson, setResponseJson] = useState<string>('');
  const [copiedCurl, setCopiedCurl] = useState(false);

  const handleTest = () => {
    if (selectedEndpoint === 'keyword') {
      const sample = {
        status: 'success',
        query: testParam,
        country: 'US',
        data: {
          search_volume: 33100,
          keyword_difficulty: 85,
          cpc_usd: 24.50,
          competition_score: 0.85,
          search_intent: 'Commercial',
          historical_trends: [
            { month: 'Nov', volume: 32000 },
            { month: 'Dec', volume: 30500 },
            { month: 'Jan', volume: 38200 },
            { month: 'Feb', volume: 36000 },
          ],
        },
      };
      setResponseJson(JSON.stringify(sample, null, 2));
    } else if (selectedEndpoint === 'cluster') {
      const sample = {
        status: 'success',
        cluster_count: 2,
        clusters: [
          {
            pillar: 'CRM SOFTWARE',
            primary_term: 'best crm software',
            total_volume: 78500,
            keywords: ['best crm software', 'crm software pricing', 'top rated crm systems'],
          },
        ],
      };
      setResponseJson(JSON.stringify(sample, null, 2));
    } else {
      const sample = {
        status: 'success',
        brief: {
          target_keyword: testParam,
          recommended_title: `Ultimate Guide to ${testParam} (2026 Strategy)`,
          target_word_count: 2400,
          suggested_headings: ['What is it?', 'Core Capabilities', 'Pricing Breakdown'],
        },
      };
      setResponseJson(JSON.stringify(sample, null, 2));
    }
  };

  const curlCommand = `curl -X GET "https://api.keynumbers.com/v1/${selectedEndpoint}?q=${encodeURIComponent(
    testParam
  )}" \\
  -H "Accept: application/json"`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>Developer Resources</span>
          <span aria-hidden="true">·</span>
          <span>REST API v1</span>
          <span aria-hidden="true">·</span>
          <span>Zero Authentication Required</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          KeyNumbers Developer API
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Programmatically query keyword search volume, historical trend distributions, and semantic topic clusters via simple JSON REST endpoints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Endpoints Nav */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Core Endpoints
          </span>
          <button
            onClick={() => {
              setSelectedEndpoint('keyword');
              setResponseJson('');
            }}
            className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
              selectedEndpoint === 'keyword'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>GET /v1/keyword</span>
            <span className="text-[10px] text-emerald-400 font-sans font-bold">Volume &amp; KD</span>
          </button>

          <button
            onClick={() => {
              setSelectedEndpoint('cluster');
              setResponseJson('');
            }}
            className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
              selectedEndpoint === 'cluster'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>POST /v1/cluster</span>
            <span className="text-[10px] text-emerald-400 font-sans font-bold">Clustering</span>
          </button>

          <button
            onClick={() => {
              setSelectedEndpoint('brief');
              setResponseJson('');
            }}
            className={`w-full text-left p-3 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
              selectedEndpoint === 'brief'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>GET /v1/brief</span>
            <span className="text-[10px] text-emerald-400 font-sans font-bold">Content Brief</span>
          </button>
        </div>

        {/* Live Sandbox & Curl */}
        <div className="lg:col-span-8 space-y-6">
          {/* Curl snippet */}
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                cURL Example
              </span>
              <button
                onClick={async () => {
                  await copyToClipboard(curlCommand);
                  setCopiedCurl(true);
                  setTimeout(() => setCopiedCurl(false), 2000);
                }}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedCurl ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="mt-3 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
              {curlCommand}
            </pre>
          </div>

          {/* Sandbox form */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Interactive API Console
              </span>
              <span className="text-xs text-slate-500">Live JSON Sandbox</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={testParam}
                onChange={e => setTestParam(e.target.value)}
                placeholder="Query parameter q=..."
                className="flex-1 p-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
              <button
                onClick={handleTest}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Send Request</span>
              </button>
            </div>

            {/* Response Display */}
            {responseJson && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-600 block mb-2 font-mono">
                  Response Payload (200 OK)
                </span>
                <pre className="p-4 bg-slate-900 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto max-h-72 overflow-y-auto">
                  {responseJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
