import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GlossaryTerm } from '../types';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTerm?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTerm = null,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(
    initialTerm ? GLOSSARY_TERMS.find(t => t.term.toLowerCase().includes(initialTerm.toLowerCase())) || null : null
  );

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.japanese.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      id="glossary-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="glossary-modal-content"
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                CSS Layout 用語集・クイックリファレンス
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                  全{GLOSSARY_TERMS.length}項目
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                専門用語の意味や使い方をいつでも確認できます
              </p>
            </div>
          </div>
          <button
            id="glossary-close-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3.5 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="glossary-search-input"
              type="text"
              placeholder="用語名・キーワードで検索..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
            {[
              { id: 'all', label: 'すべて' },
              { id: 'flexbox', label: 'Flexbox' },
              { id: 'grid', label: 'Grid' },
              { id: 'position', label: 'Position' },
              { id: 'box-model', label: 'Box/Overflow' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: List and Detail Split View */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Terms List (Left) */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-4 space-y-2 max-h-[60vh] md:max-h-[60vh] custom-scrollbar bg-slate-50/50">
            {filteredTerms.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                該当する用語が見つかりません
              </div>
            ) : (
              filteredTerms.map((t) => {
                const isSelected = selectedTerm?.term === t.term;
                return (
                  <div
                    key={t.term}
                    onClick={() => setSelectedTerm(t)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-sm font-bold text-blue-700">
                        {t.term}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200">
                        {t.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-medium mb-1">{t.japanese}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {t.shortDesc}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Term Detail (Right) */}
          <div className="md:col-span-7 p-6 overflow-y-auto max-h-[60vh] custom-scrollbar bg-white flex flex-col justify-between">
            {selectedTerm ? (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                      {selectedTerm.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{selectedTerm.japanese}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-mono text-slate-900">
                    {selectedTerm.term}
                  </h3>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    概要（要約）
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {selectedTerm.shortDesc}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    詳しい仕組み・実践での使い方
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {selectedTerm.detailedDesc}
                  </p>
                </div>

                {selectedTerm.exampleCode && (
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      代表的なCSSの書き方例
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-blue-300 leading-relaxed whitespace-pre shadow-sm">
                      {selectedTerm.exampleCode}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                <Sparkles className="w-10 h-10 text-blue-500/40 mb-3" />
                <p className="text-sm font-semibold text-slate-700">左側のリストから用語を選択してください</p>
                <p className="text-xs text-slate-500 mt-1">
                  詳細な解説とCSS記述例が表示されます
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            id="glossary-footer-close-btn"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
