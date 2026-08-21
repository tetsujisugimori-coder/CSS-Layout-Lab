import React from 'react';
import { Layers, Sparkles, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-xs">
            CSS
          </div>
          <div>
            <div className="font-bold text-slate-100 text-sm">CSS LAB 第四弾：Layout Lab</div>
            <p className="text-[11px] text-slate-400">
              Flexbox / Grid / Position / Overflow / Break & Fix
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>全5展示・インタラクティブ学習環境</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>トップへ戻る</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
