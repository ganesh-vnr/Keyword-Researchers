import React, { useState } from 'react';
import { BookOpen, Search, Copy, Check, Sparkles, FileText, Download } from 'lucide-react';
import { ContentBrief } from '../../types/seo';
import { generateContentBrief } from '../../services/keywordEngine';
import { copyToClipboard } from '../../services/storage';

export const ContentBriefView: React.FC = () => {
  const [targetKeyword, setTargetKeyword] = useState('how to start a blog');
  const [brief, setBrief] = useState<ContentBrief>(() =>
    generateContentBrief('how to start a blog')
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetKeyword.trim()) return;
    setBrief(generateContentBrief(targetKeyword));
  };

  const copyMarkdownBrief = async () => {
    const md = `# Content Brief: ${brief.suggestedTitle}

**Target Primary Keyword:** ${brief.targetKeyword}
**Search Intent:** ${brief.userIntent}
**Target Word Count:** ${brief.targetWordCount} words (Competitor Avg: ${brief.competitorAverageWords} words)

---

## Recommended Headings Structure
${brief.recommendedHeadings.map(h => `${h.tag === 'h2' ? '##' : '###'} ${h.text}`).join('\n')}

---

## Primary & Secondary Keywords to Include
- **Primary:** ${brief.primaryKeywords.join(', ')}
- **Secondary:** ${brief.secondaryKeywords.join(', ')}

---

## Questions to Answer (PAA / FAQ)
${brief.paaQuestions.map(q => `- ${q}`).join('\n')}
`;
    await copyToClipboard(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Content &amp; On-Page</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Content Brief Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          SEO Content Brief &amp; Outline Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Generate comprehensive, writer-ready SEO briefs complete with target word count, suggested H2/H3 headings, semantic keywords, and questions to answer.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8">
        <form onSubmit={handleGenerate} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={targetKeyword}
              onChange={e => setTargetKeyword(e.target.value)}
              placeholder="Enter target topic or keyword..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm shrink-0"
          >
            Generate Brief
          </button>
        </form>
      </div>

      {/* Brief Output Document Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Bar */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
              Editorial Specification
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              "{brief.suggestedTitle}"
            </h2>
          </div>

          <button
            onClick={copyMarkdownBrief}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Markdown Brief!' : 'Copy Markdown Brief'}</span>
          </button>
        </div>

        {/* Word Count & Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 border-b border-slate-200 bg-white">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Target Word Count
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              ~{brief.targetWordCount.toLocaleString()} words
            </span>
            <span className="text-[11px] text-slate-500">
              Comp avg: {brief.competitorAverageWords.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Search Intent
            </span>
            <span className="text-2xl font-extrabold text-slate-900 block mt-1">
              {brief.userIntent}
            </span>
            <span className="text-[11px] text-slate-500">
              Comprehensive guide format
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Key Headings Count
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              {brief.recommendedHeadings.length} sections
            </span>
            <span className="text-[11px] text-slate-500">
              H2 &amp; H3 hierarchy
            </span>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              PAA Questions
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums block mt-1">
              {brief.paaQuestions.length} questions
            </span>
            <span className="text-[11px] text-slate-500">
              For FAQ rich results
            </span>
          </div>
        </div>

        {/* Content sections */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Headings outline */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-teal-600" />
              Recommended Article Heading Structure
            </h3>

            <div className="space-y-2">
              {brief.recommendedHeadings.map((head, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    head.tag === 'h2'
                      ? 'bg-slate-50 border-slate-200 font-bold text-slate-900'
                      : 'bg-white border-slate-100 pl-8 font-medium text-slate-700 text-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                      {head.tag}
                    </span>
                    <span className="text-xs sm:text-sm">{head.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords & Questions to answer */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Semantic Keywords to Include
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {[...brief.primaryKeywords, ...brief.secondaryKeywords].map((term, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-medium border border-slate-200"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Must-Answer User Questions (PAA)
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {brief.paaQuestions.map((q, i) => (
                  <li key={i} className="p-2.5 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
                    <span className="text-teal-600 font-bold">Q:</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
