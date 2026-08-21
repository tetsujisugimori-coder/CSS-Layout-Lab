import React, { useState, useMemo } from 'react';
import {
  Box,
  RotateCcw,
  Sliders,
  Sparkles,
  HelpCircle,
  Info,
  Maximize2
} from 'lucide-react';
import { GridColumnMode } from '../types';
import { CodeBlock } from './CodeBlock';

interface GridLabProps {
  onOpenGlossary: (term: string) => void;
}

const GRID_ITEMS = [
  { id: 1, title: 'Item 01', tag: 'Header/Hero', bg: 'from-cyan-600 to-blue-600', border: 'border-cyan-500/50' },
  { id: 2, title: 'Item 02', tag: 'Feature A', bg: 'from-blue-600 to-indigo-600', border: 'border-blue-500/50' },
  { id: 3, title: 'Item 03', tag: 'Feature B', bg: 'from-indigo-600 to-violet-600', border: 'border-indigo-500/50' },
  { id: 4, title: 'Item 04', tag: 'Sidebar / Info', bg: 'from-violet-600 to-purple-600', border: 'border-violet-500/50' },
  { id: 5, title: 'Item 05', tag: 'Data Metric', bg: 'from-fuchsia-600 to-pink-600', border: 'border-pink-500/50' },
  { id: 6, title: 'Item 06', tag: 'Footer / Action', bg: 'from-rose-600 to-orange-600', border: 'border-rose-500/50' },
  { id: 7, title: 'Item 07', tag: 'Extra Card', bg: 'from-amber-600 to-yellow-600', border: 'border-amber-500/50' },
  { id: 8, title: 'Item 08', tag: 'Extra Card', bg: 'from-emerald-600 to-teal-600', border: 'border-emerald-500/50' },
];

export const GridLab: React.FC<GridLabProps> = ({ onOpenGlossary }) => {
  const [columns, setColumns] = useState<number>(3);
  const [gap, setGap] = useState<number>(16);
  const [mode, setMode] = useState<GridColumnMode>('fixed');
  const [minmaxMin, setMinmaxMin] = useState<number>(180);
  const [itemCount, setItemCount] = useState<number>(6);
  const [containerWidth, setContainerWidth] = useState<number>(100);
  const [item1Span, setItem1Span] = useState<boolean>(false);

  const gridTemplateColumns = useMemo(() => {
    if (mode === 'minmax') {
      return `repeat(auto-fit, minmax(${minmaxMin}px, 1fr))`;
    }
    return `repeat(${columns}, 1fr)`;
  }, [mode, minmaxMin, columns]);

  const generatedCss = useMemo(() => {
    let css = `.container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap}px;
}`;
    if (item1Span) {
      css += `\n\n/* アイテム1の拡張指定 */\n.item-1 {
  grid-column: span 2;
}`;
    }
    return css;
  }, [gridTemplateColumns, gap, item1Span]);

  const resetDefaults = () => {
    setColumns(3);
    setGap(16);
    setMode('fixed');
    setMinmaxMin(180);
    setItemCount(6);
    setContainerWidth(100);
    setItem1Span(false);
  };

  return (
    <section id="grid" className="py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Box className="w-4 h-4" />
              <span>展示 02 / 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Grid Lab
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                2次元マス目レイアウト
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Gridは、<strong className="text-blue-700 font-semibold">行（縦）と列（横）の2方向を使ってレイアウトを組み立てるのが得意</strong>です。
              マス目の枠組み（トラック）を親で宣言し、子要素を美しく整列させます。
            </p>
          </div>

          <button
            onClick={resetDefaults}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>リセット</span>
          </button>
        </div>

        {/* Glossary Quick Cards for Grid terms */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              term: '1fr',
              label: '比率単位 (fr)',
              desc: '利用可能な余白を1等分して分け合う単位',
            },
            {
              term: 'repeat()',
              label: '繰り返し関数',
              desc: 'repeat(3, 1fr) で3列均等を短縮記述',
            },
            {
              term: 'minmax()',
              label: '最小・最大指定',
              desc: 'minmax(180px, 1fr) で最小幅と伸長を両立',
            },
            {
              term: 'auto-fit',
              label: '自動列計算',
              desc: '幅に合わせて列数を自動増減させる',
            },
          ].map((item) => (
            <button
              key={item.term}
              onClick={() => onOpenGlossary(item.term)}
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs text-left transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-600 mb-1">
                <span>{item.term}</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="text-xs font-bold text-slate-800">{item.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Main interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Grid 設定コントロール
              </h3>
              <span className="text-[11px] text-slate-500">リアルタイム反映</span>
            </div>

            {/* Mode Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                列の配置モード設定:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="grid-mode-fixed"
                  onClick={() => setMode('fixed')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                    mode === 'fixed'
                      ? 'bg-white border-blue-500 text-blue-600 font-bold shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  固定列数モード
                </button>
                <button
                  id="grid-mode-minmax"
                  onClick={() => setMode('minmax')}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
                    mode === 'minmax'
                      ? 'bg-white border-blue-500 text-blue-600 font-bold shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>minmax() レスポンシブ</span>
                </button>
              </div>
            </div>

            {/* Dynamic Column Settings based on mode */}
            {mode === 'fixed' ? (
              <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    固定列数の選択
                  </span>
                  <span className="text-xs text-blue-600 font-bold font-mono">
                    repeat({columns}, 1fr)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((col) => (
                    <button
                      key={col}
                      id={`grid-col-${col}`}
                      onClick={() => setColumns(col)}
                      className={`py-2 text-xs font-mono rounded-lg border text-center transition-all ${
                        columns === col
                          ? 'bg-white border-blue-500 text-blue-600 font-bold shadow-xs ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {col}列
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500">
                  親の幅を均等に{columns}分割して要素を配置します。
                </p>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 font-mono">
                    最小カード幅 (minmax)
                  </span>
                  <span className="text-xs text-blue-600 font-bold font-mono">
                    {minmaxMin}px
                  </span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="280"
                  step="10"
                  value={minmaxMin}
                  onChange={(e) => setMinmaxMin(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-mono shadow-2xs">
                  grid-template-columns: repeat(auto-fit, minmax({minmaxMin}px, 1fr));
                </div>
                <p className="text-[11px] text-slate-500">
                  下のコンテナ幅スライダーを動かすと、画面幅に合わせて自動で列数が計算されます！
                </p>
              </div>
            )}

            {/* Gap Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 font-mono">
                  gap: <span className="text-blue-600 font-bold">{gap}px</span>
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0px (隙間なし)</span>
                <span>24px</span>
                <span>48px</span>
              </div>
            </div>

            {/* Item Span and Cards count */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">表示カード数: {itemCount}枚</span>
                <div className="flex items-center gap-1">
                  {[6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => setItemCount(num)}
                      className={`w-7 h-7 text-xs font-mono rounded-lg transition-colors border ${
                        itemCount === num
                          ? 'bg-blue-600 text-white font-bold border-blue-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2D Feature: Item 1 Column Span toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    アイテム1を2列分に拡大 (span 2)
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">grid-column: span 2;</div>
                </div>
                <button
                  onClick={() => setItem1Span(!item1Span)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all shadow-xs ${
                    item1Span
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {item1Span ? 'ON (拡大中)' : 'OFF'}
                </button>
              </div>

              {/* Container Width Resizer for testing responsive */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>コンテナ幅テスト (レスポンシブ体験): <strong className="text-blue-600">{containerWidth}%</strong></span>
                  <div className="flex gap-1 text-[10px]">
                    <button
                      onClick={() => setContainerWidth(100)}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    >
                      100%
                    </button>
                    <button
                      onClick={() => setContainerWidth(70)}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    >
                      70%
                    </button>
                    <button
                      onClick={() => setContainerWidth(45)}
                      className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    >
                      狭小
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="35"
                  max="100"
                  value={containerWidth}
                  onChange={(e) => setContainerWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Preview & Code (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">2D GRID</span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Grid プレビュー実行画面
                  </h3>
                </div>
                <span className="text-xs text-blue-600 font-bold font-mono">
                  {mode === 'fixed' ? `${columns}列 固定` : 'auto-fit 自動適応'}
                </span>
              </div>

              {/* Dynamic Grid Container Stage */}
              <div className="w-full flex justify-center bg-slate-200/70 rounded-xl p-4 sm:p-6 min-h-[340px] border border-slate-300/80 overflow-hidden">
                <div
                  id="grid-preview-container"
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      mode === 'minmax'
                        ? `repeat(auto-fit, minmax(${minmaxMin}px, 1fr))`
                        : `repeat(${columns}, 1fr)`,
                    gap: `${gap}px`,
                    width: `${containerWidth}%`,
                    transition: 'width 0.2s ease-in-out',
                  }}
                  className="bg-white rounded-xl p-4 shadow-inner border border-slate-300 blueprint-grid"
                >
                  {GRID_ITEMS.slice(0, itemCount).map((item) => {
                    const isSpan = item.id === 1 && item1Span;
                    return (
                      <div
                        key={item.id}
                        id={`grid-item-${item.id}`}
                        style={{
                          gridColumn: isSpan ? 'span 2' : undefined,
                        }}
                        className={`p-3.5 rounded-lg border text-white shadow-md transition-all duration-200 flex flex-col justify-between min-h-[100px] select-none ${
                          item.id === 1 ? 'bg-blue-600 border-blue-500' :
                          item.id === 2 ? 'bg-indigo-600 border-indigo-500' :
                          item.id === 3 ? 'bg-violet-600 border-violet-500' :
                          item.id === 4 ? 'bg-purple-600 border-purple-500' :
                          item.id === 5 ? 'bg-teal-600 border-teal-500' :
                          item.id === 6 ? 'bg-amber-600 border-amber-500' :
                          item.id === 7 ? 'bg-rose-600 border-rose-500' :
                          'bg-emerald-600 border-emerald-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center font-bold text-xs font-mono">
                            {item.id}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">
                            {item.tag}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h4 className="text-xs font-bold">{item.title}</h4>
                          <p className="text-[10px] text-white/80">
                            {isSpan ? '★ 2列分を占有中' : '1マス分'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Educational Note */}
              <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Gridの特長と動作状況:</span>
                </div>
                <p className="leading-relaxed text-blue-900/90">
                  {mode === 'fixed' ? (
                    <>
                      現在、親要素に <code className="text-blue-950 font-bold font-mono">grid-template-columns: repeat({columns}, 1fr)</code> を指定しています。
                      全要素が厳密な縦列・横行のマス目に沿って整然と並びます。
                    </>
                  ) : (
                    <>
                      現在、<code className="text-blue-950 font-bold font-mono">repeat(auto-fit, minmax({minmaxMin}px, 1fr))</code> が有効です。
                      メディアクエリを書かなくても、コンテナの幅（{containerWidth}%）に合わせてカードが自動で最適な列数に折り返します。
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Generated CSS Code */}
            <CodeBlock
              id="grid-code-block"
              title="生成された CSS Grid"
              code={generatedCss}
              highlightedLines={[
                `grid-template-columns: ${gridTemplateColumns}`,
                `gap: ${gap}px`,
                `grid-column: span 2`
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
