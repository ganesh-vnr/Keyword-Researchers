import React, { useState } from 'react';
import { Eye, Smartphone, Monitor, Star, Check, AlertCircle, Copy } from 'lucide-react';
import { calculateSerpPixels } from '../../services/keywordEngine';
import { copyToClipboard } from '../../services/storage';

export const SerpPreviewView: React.FC = () => {
  const [title, setTitle] = useState('10 Best SEO Tools in 2026 (Free & Paid Comparison)');
  const [url, setUrl] = useState('https://example.com/blog/best-seo-tools');
  const [description, setDescription] = useState(
    'Discover the top SEO tools for keyword research, rank tracking, and on-page optimization. Compare features, pricing, and pros & cons before choosing.'
  );
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showRating, setShowRating] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [codeCopied, setCodeCopied] = useState(false);

  const pixels = calculateSerpPixels(title, description);

  // Maximum thresholds
  const titleMax = viewMode === 'desktop' ? 600 : 580;
  const descMax = 960;

  const titlePercent = Math.min(100, Math.round((pixels.titlePixelWidth / titleMax) * 100));
  const descPercent = Math.min(100, Math.round((pixels.descPixelWidth / descMax) * 100));

  const copyMetaTags = async () => {
    const metaMarkup = `<!-- Google / Search Engine Meta Tags -->
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="article" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />`;

    await copyToClipboard(metaMarkup);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Content &amp; On-Page</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">SERP Snippet Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Google SERP Snippet Preview &amp; Pixel Meter
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Simulate how your web page title, URL, and meta description will render on Google search results across desktop and mobile devices. Avoid title truncation with pixel-accurate meters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left: Input Editor */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Snippet Configuration
          </h2>

          {/* Title input */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-semibold text-slate-700">Page Title (H1 / Title Tag)</label>
              <span className="font-mono text-slate-500">
                {title.length} chars ·{' '}
                <strong
                  className={
                    pixels.titlePixelWidth > titleMax ? 'text-rose-600' : 'text-slate-800'
                  }
                >
                  {pixels.titlePixelWidth}px
                </strong>{' '}
                / {titleMax}px
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 font-medium"
            />
            {/* Title Pixel Meter */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  titlePercent > 100
                    ? 'bg-rose-500'
                    : titlePercent > 85
                    ? 'bg-teal-500'
                    : 'bg-teal-400'
                }`}
                style={{ width: `${Math.min(100, titlePercent)}%` }}
              />
            </div>
            {pixels.titlePixelWidth > titleMax && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Title exceeds {titleMax}px and will be truncated with "..." in Google.
              </p>
            )}
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Destination URL / Slug
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900"
            />
          </div>

          {/* Meta Description input */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <label className="font-semibold text-slate-700">Meta Description</label>
              <span className="font-mono text-slate-500">
                {description.length} chars ·{' '}
                <strong
                  className={
                    pixels.descPixelWidth > descMax ? 'text-rose-600' : 'text-slate-800'
                  }
                >
                  {pixels.descPixelWidth}px
                </strong>{' '}
                / {descMax}px
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-900 leading-relaxed"
            />
            {/* Description Pixel Meter */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  descPercent > 100
                    ? 'bg-rose-500'
                    : descPercent > 85
                    ? 'bg-teal-500'
                    : 'bg-teal-400'
                }`}
                style={{ width: `${Math.min(100, descPercent)}%` }}
              />
            </div>
          </div>

          {/* Rich Snippets Toggles */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showRating}
                onChange={e => setShowRating(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Include 5-Star Review Rating</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDate}
                onChange={e => setShowDate(e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span>Include Published Date</span>
            </label>
          </div>

          <button
            onClick={copyMetaTags}
            className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{codeCopied ? 'HTML Meta Tags Copied!' : 'Copy HTML Meta Tags'}</span>
          </button>
        </div>

        {/* Right: Live Google SERP Mockup */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Device Toggle */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Live SERP Simulation
            </span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 ${
                  viewMode === 'desktop'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (600px)</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 ${
                  viewMode === 'mobile'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (580px)</span>
              </button>
            </div>
          </div>

          {/* Visual Google Box */}
          <div
            className={`bg-white rounded-xl border border-slate-200 p-5 shadow-md flex-1 ${
              viewMode === 'mobile' ? 'max-w-md mx-auto w-full' : 'w-full'
            }`}
          >
            {/* Breadcrumb row */}
            <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
              <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                G
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] text-slate-900 font-medium">
                  {new URL(url.startsWith('http') ? url : `https://${url}`).hostname}
                </span>
                <span className="text-[11px] text-slate-500 font-mono truncate max-w-sm">
                  {url}
                </span>
              </div>
            </div>

            {/* Simulated Title (Using Arial 20px font style matching Google) */}
            <h3 className="text-lg sm:text-xl font-normal text-[#1a0dab] hover:underline cursor-pointer leading-[1.3] mt-1.5 font-sans">
              {title.length > 0 ? title : 'Your Title Here'}
              {pixels.titlePixelWidth > titleMax && ' ...'}
            </h3>

            {/* Rich snippet stars if enabled */}
            {showRating && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 my-1">
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-semibold text-slate-700">4.9</span>
                <span>(184 reviews)</span>
              </div>
            )}

            {/* Simulated Meta Description */}
            <p className="text-xs sm:text-sm text-[#4d5156] leading-[1.5] mt-1 font-sans">
              {showDate && (
                <span className="text-slate-500 font-medium mr-1.5">
                  Nov 3, 2026 —
                </span>
              )}
              {description.length > 0 ? description : 'Your meta description text will appear here.'}
              {pixels.descPixelWidth > descMax && ' ...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
