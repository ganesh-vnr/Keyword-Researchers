import React, { useState } from 'react';
import { HelpCircle, Search, Download, Code, Check, Bookmark, ArrowRight } from 'lucide-react';
import { QuestionItem, KeywordMetric } from '../../types/seo';
import { generateQuestionsAndPaa } from '../../services/keywordEngine';
import { copyToClipboard } from '../../services/storage';

interface QuestionPaaViewProps {
  initialKeyword?: string;
  onSaveKeyword?: (metric: KeywordMetric) => void;
}

export const QuestionPaaView: React.FC<QuestionPaaViewProps> = ({
  initialKeyword = 'seo tools',
}) => {
  const [query, setQuery] = useState(initialKeyword);
  const [questions, setQuestions] = useState<QuestionItem[]>(() =>
    generateQuestionsAndPaa(initialKeyword)
  );
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [schemaCopied, setSchemaCopied] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setQuestions(generateQuestionsAndPaa(query));
  };

  const filtered =
    activeFilter === 'all'
      ? questions
      : questions.filter(q => q.type === activeFilter);

  const generateFaqSchema = async () => {
    const topQuestions = questions.slice(0, 5);
    const schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: topQuestions.map(q => ({
        '@type': 'Question',
        name: q.question.charAt(0).toUpperCase() + q.question.slice(1),
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Comprehensive analysis and guidance regarding ${q.question}. Consult our complete guide for details.`,
        },
      })),
    };
    await copyToClipboard(JSON.stringify(schemaObj, null, 2));
    setSchemaCopied(true);
    setTimeout(() => setSchemaCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Tools</span>
          <span>/</span>
          <span>Keyword Research</span>
          <span>/</span>
          <span className="text-slate-800 font-medium">Question &amp; PAA Finder</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          People Also Ask (PAA) &amp; Question Research Tool
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Discover real questions people ask on Google (How, What, Why, Where, Who, vs) to capture featured snippets and answer voice search queries.
        </p>
      </div>

      {/* Query Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter seed topic (e.g. running shoes, crm software)..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm shrink-0"
          >
            Find Questions
          </button>
        </form>
      </div>

      {/* Filter and Schema Generator Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'what', label: 'What?' },
            { id: 'how', label: 'How?' },
            { id: 'why', label: 'Why?' },
            { id: 'where', label: 'Where?' },
            { id: 'who', label: 'Who?' },
            { id: 'can', label: 'Can/Are?' },
            { id: 'preposition', label: 'Prepositions' },
            { id: 'comparison', label: 'Comparisons' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Action */}
        <button
          onClick={generateFaqSchema}
          className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Code className="w-3.5 h-3.5" />
          <span>{schemaCopied ? 'Copied FAQ JSON-LD!' : 'Generate FAQ Schema'}</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Found {filtered.length} target search questions</span>
          <span>Target for H2 FAQ blocks and Featured Snippet ranking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Search Question</th>
                <th className="py-3 px-5">Modifier Type</th>
                <th className="py-3 px-5">Search Volume</th>
                <th className="py-3 px-5">Difficulty</th>
                <th className="py-3 px-5">CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5 font-semibold text-slate-900">
                    {item.question}
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-700 font-semibold">
                    {item.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                        item.difficulty < 45
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-mono tabular-nums text-slate-600">
                    ${item.cpc.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
