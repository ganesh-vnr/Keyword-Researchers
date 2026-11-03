import React, { useState } from 'react';
import {
  TrendingUp,
  Gauge,
  Sparkles,
  Layers,
  HelpCircle,
  Compass,
  FileText,
  Eye,
  BookOpen,
  AlertTriangle,
  Cpu,
  ArrowRightLeft,
  ShieldCheck,
  Video,
  DollarSign,
  BarChart2,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../../types/seo';
import { TOOLS_CATALOG, ToolDefinition } from '../../data/toolsData';

interface ToolsGridProps {
  onSelectTool: (toolId: ActiveTab) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  Gauge,
  Sparkles,
  Layers,
  HelpCircle,
  Compass,
  FileText,
  Eye,
  BookOpen,
  AlertTriangle,
  Cpu,
  ArrowRightLeft,
  ShieldCheck,
  Video,
  DollarSign,
  BarChart2,
};

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Keyword Research', 'Content & On-Page', 'Technical SEO', 'Video & ROI'];

  const filteredTools =
    selectedCategory === 'All'
      ? TOOLS_CATALOG
      : TOOLS_CATALOG.filter(t => t.category === selectedCategory);

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 tracking-wide mb-1">
              Complete Tool Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              16+ Free SEO &amp; Keyword Utilities
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Every tool runs in real time directly in your browser. No mandatory account creation or subscription limits.
            </p>
          </div>

          {/* Interactive filter tabs (Buttons allowed per constitution) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg overflow-x-auto max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map(tool => {
            const IconComponent = ICON_MAP[tool.iconName] || TrendingUp;
            return (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="group cursor-pointer bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Unboxed metadata separator */}
                    <span className="text-[11px] text-slate-400 font-medium">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
