import React, { useState } from 'react';
import { BookOpen, ArrowRight, ArrowLeft, Clock, Calendar, User, CheckCircle2, Share2, Copy } from 'lucide-react';
import { SEO_GUIDES, SeoGuide } from '../../data/guidesData';
import { copyToClipboard } from '../../services/storage';

export const GuidesPage: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<SeoGuide | null>(null);
  const [copied, setCopied] = useState(false);

  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back navigation */}
        <button
          onClick={() => setSelectedGuide(null)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to All SEO Guides</span>
        </button>

        {/* Article Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
            <span className="font-semibold text-emerald-700">{selectedGuide.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {selectedGuide.publishedDate}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {selectedGuide.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {selectedGuide.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {selectedGuide.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            {selectedGuide.excerpt}
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-5 mb-8">
          <h2 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Executive Summary &amp; Key Takeaways
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {selectedGuide.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guide Prose Content */}
        <article className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
          {selectedGuide.content.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('#### ')) {
              return (
                <h4 key={idx} className="text-base font-bold text-slate-800 mt-4 mb-1">
                  {paragraph.replace('#### ', '')}
                </h4>
              );
            }
            if (paragraph.startsWith('- ')) {
              const bullets = paragraph.split('\n');
              return (
                <ul key={idx} className="space-y-1 list-disc pl-5 my-2">
                  {bullets.map((b, bi) => (
                    <li key={bi}>{b.replace(/^- /, '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('1. ')) {
              const items = paragraph.split('\n');
              return (
                <ol key={idx} className="space-y-1 list-decimal pl-5 my-2">
                  {items.map((it, ii) => (
                    <li key={ii}>{it.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={idx} className="text-slate-600 leading-relaxed">
                {paragraph.replace(/`([^`]+)`/g, '$1')}
              </p>
            );
          })}
        </article>

        {/* Footer Share & Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setSelectedGuide(null)}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>

          <button
            onClick={async () => {
              await copyToClipboard(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>Search Engine Optimization Knowledge Base</span>
          <span aria-hidden="true">·</span>
          <span>Actionable Tutorials</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          SEO Guides, Frameworks &amp; Strategies
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          In-depth playbooks on keyword research, semantic topic clustering, search intent classification, and on-page optimization.
        </p>
      </div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEO_GUIDES.map(guide => (
          <div
            key={guide.id}
            onClick={() => {
              setSelectedGuide(guide);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-medium">
                <span className="text-emerald-700 font-semibold">{guide.category}</span>
                <span>{guide.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {guide.title}
              </h2>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                {guide.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
