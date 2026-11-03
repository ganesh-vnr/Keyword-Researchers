import React, { useState } from 'react';
import { Video, Search, Copy, Check, Sparkles, Youtube, Plus, Trash2 } from 'lucide-react';
import { copyToClipboard } from '../../services/storage';

export const YouTubeTagsView: React.FC = () => {
  const [videoTitle, setVideoTitle] = useState('How to Do Keyword Research for Beginners (2026 Step-by-Step)');
  const [tags, setTags] = useState<string[]>([
    'keyword research',
    'seo tutorial for beginners',
    'how to find keywords',
    'free keyword research tools',
    'search volume',
    'seo ranking factors',
    'keyword difficulty',
    'google ranking tutorial',
    'digital marketing',
    'seo tips 2026',
  ]);
  const [newTag, setNewTag] = useState('');
  const [copied, setCopied] = useState(false);

  // YouTube allows max 500 characters in tag list
  const totalCharacters = tags.join(', ').length;
  const maxCharacters = 500;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    const tokens = videoTitle
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);

    const generated = [
      tokens.slice(0, 3).join(' '),
      `${tokens[0]} tutorial`,
      `best ${tokens[0]}`,
      `${tokens.slice(0, 2).join(' ')} 2026`,
      `how to ${tokens[0]}`,
      'step by step tutorial',
      'seo strategy',
      'increase youtube views',
      'ranking on google',
      'digital marketing strategy',
    ];

    setTags(Array.from(new Set(generated)));
  };

  const addTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    if (!tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const copyTags = async () => {
    await copyToClipboard(tags.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Title engagement score calculation
  const titleWords = videoTitle.trim().split(/\s+/).length;
  const hasNumbers = /\d+/.test(videoTitle);
  const hasParentheses = /[()\[\]]/.test(videoTitle);
  const isOptimalLength = videoTitle.length >= 40 && videoTitle.length <= 70;

  let engagementScore = 60;
  if (hasNumbers) engagementScore += 15;
  if (hasParentheses) engagementScore += 10;
  if (isOptimalLength) engagementScore += 15;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Video &amp; ROI</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">YouTube Tag &amp; Title Optimizer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          YouTube Tag Extractor &amp; Video SEO Optimizer
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Generate high-relevance YouTube tags, evaluate title click-through rate (CTR) potential, and stay strictly within YouTube's 500-character tag limit.
        </p>
      </div>

      {/* Title Input */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Video className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              placeholder="Enter YouTube Video Title or Topic..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            Generate Tags
          </button>
        </form>
      </div>

      {/* Title Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Title CTR Potential
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {engagementScore}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {engagementScore >= 80 ? 'High CTR' : 'Moderate'}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            YouTube Character Limit
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold font-mono tabular-nums ${
                totalCharacters > maxCharacters ? 'text-rose-600' : 'text-slate-900'
              }`}
            >
              {totalCharacters}
            </span>
            <span className="text-xs text-slate-400">/ 500 characters</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Tags Count
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              {tags.length}
            </span>
            <span className="text-xs text-slate-500">recommended: 10-15</span>
          </div>
        </div>
      </div>

      {/* Tags Manager Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Selected Video Tags ({tags.length})
            </h2>
            <p className="text-xs text-slate-500">
              Paste directly into YouTube Studio Video Details &gt; Tags field.
            </p>
          </div>

          <button
            onClick={copyTags}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied to Clipboard!' : 'Copy All Tags (CSV)'}</span>
          </button>
        </div>

        {/* Add custom tag */}
        <form onSubmit={addTag} className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            placeholder="Add custom tag..."
            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none text-slate-900"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Add
          </button>
        </form>

        {/* Interactive Tag Chips */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-md text-xs font-medium text-slate-800 transition-colors"
            >
              <span>{tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-slate-400 hover:text-rose-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
