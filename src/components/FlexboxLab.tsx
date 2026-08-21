import React, { useState, useMemo } from 'react';
import {
  Layers,
  ArrowRight,
  ArrowDown,
  RotateCcw,
  Maximize2,
  Minimize2,
  Info,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { FlexDirection, JustifyContent, AlignItems, FlexWrap } from '../types';
import { CodeBlock } from './CodeBlock';

interface FlexboxLabProps {
  onOpenGlossary: (term: string) => void;
}

const CARDS = [
  { id: 'A', label: 'Card A', subtitle: '項目 01', color: 'from-blue-600 to-indigo-600', border: 'border-blue-500/50' },
  { id: 'B', label: 'Card B', subtitle: '項目 02 (長文テキスト)', desc: '高さ・幅の自動伸縮', color: 'from-indigo-600 to-violet-600', border: 'border-indigo-500/50' },
  { id: 'C', label: 'Card C', subtitle: '項目 03', color: 'from-violet-600 to-purple-600', border: 'border-violet-500/50' },
  { id: 'D', label: 'Card D', subtitle: '項目 04', color: 'from-fuchsia-600 to-pink-600', border: 'border-pink-500/50' },
  { id: 'E', label: 'Card E', subtitle: '項目 05', color: 'from-teal-600 to-emerald-600', border: 'border-teal-500/50' },
  { id: 'F', label: 'Card F', subtitle: '項目 06', color: 'from-amber-600 to-orange-600', border: 'border-amber-500/50' },
];

export const FlexboxLab: React.FC<FlexboxLabProps> = ({ onOpenGlossary }) => {
  const [flexDirection, setFlexDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');
  const [gap, setGap] = useState<number>(16);
  const [flexWrap, setFlexWrap] = useState<FlexWrap>('nowrap');
  const [itemCount, setItemCount] = useState<number>(4);
  const [containerWidth, setContainerWidth] = useState<number>(100);
  const [showAxes, setShowAxes] = useState<boolean>(true);

  // Derive Main Axis and Cross Axis descriptions
  const isRow = flexDirection.includes('row');
  const isReverse = flexDirection.includes('reverse');

  const mainAxisDesc = useMemo(() => {
    if (flexDirection === 'row') return '横方向（左 ➔ 右）';
    if (flexDirection === 'row-reverse') return '横方向（右 ➔ 左）';
    if (flexDirection === 'column') return '縦方向（上 ➔ 下）';
    return '縦方向（下 ➔ 上）';
  }, [flexDirection]);

  const crossAxisDesc = useMemo(() => {
    if (isRow) return '縦方向（上 ➔ 下）';
    return '横方向（左 ➔ 右）';
  }, [isRow]);

  const generatedCss = useMemo(() => {
    return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;
  }, [flexDirection, justifyContent, alignItems, flexWrap, gap]);

  const resetDefaults = () => {
    setFlexDirection('row');
    setJustifyContent('flex-start');
    setAlignItems('stretch');
    setGap(16);
    setFlexWrap('nowrap');
    setItemCount(4);
    setContainerWidth(100);
  };

  return (
    <section id="flexbox" className="py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Layers className="w-4 h-4" />
              <span>展示 01 / 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Flexbox Lab
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                1次元レイアウト
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              Flexboxは、<strong className="text-blue-700 font-semibold">主に1方向（行または列）に要素を並べるレイアウト</strong>に向いています。
              主軸（並ぶ方向）と交差軸（直交する方向）を意識することで、直感的に位置や余白をコントロールできます。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAxes(!showAxes)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all shadow-xs ${
                showAxes
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {showAxes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>軸ガイド: {showAxes ? 'ON' : 'OFF'}</span>
            </button>
            <button
              onClick={resetDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
              title="初期設定に戻す"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>リセット</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Controls + Preview + Code */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel (Left, 5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Flexbox 設定コントロール
              </h3>
              <span className="text-[11px] text-slate-500">リアルタイム反映</span>
            </div>

            {/* 1. flex-direction */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="font-mono text-blue-700">flex-direction</span>
                  <button
                    onClick={() => onOpenGlossary('main axis')}
                    className="text-slate-400 hover:text-blue-600"
                    title="主軸について調べる"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                <span className="text-[11px] text-blue-600 font-mono font-medium">
                  主軸: {mainAxisDesc}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['row', 'column', 'row-reverse', 'column-reverse'] as FlexDirection[]).map((dir) => (
                  <button
                    key={dir}
                    id={`flex-dir-${dir}`}
                    onClick={() => setFlexDirection(dir)}
                    className={`px-3 py-2 text-xs font-mono rounded-lg border text-left transition-all ${
                      flexDirection === dir
                        ? 'bg-white border-blue-500 text-blue-600 font-semibold shadow-xs ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                要素が流れていく「主軸の向き」を決定します。reverseは並び順が反転します。
              </p>
            </div>

            {/* 2. justify-content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="font-mono text-blue-700">justify-content</span>
                  <button
                    onClick={() => onOpenGlossary('main axis')}
                    className="text-slate-400 hover:text-blue-600"
                    title="主軸の揃え"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  主軸方向の配置
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as JustifyContent[]).map((jc) => (
                  <button
                    key={jc}
                    id={`flex-jc-${jc}`}
                    onClick={() => setJustifyContent(jc)}
                    className={`px-2 py-1.5 text-xs font-mono rounded-lg border text-center transition-all truncate ${
                      justifyContent === jc
                        ? 'bg-white border-blue-500 text-blue-600 font-semibold shadow-xs ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                    title={jc}
                  >
                    {jc}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                主軸（並び方向）に沿って余白をどう分配・配置するかを指定します。
              </p>
            </div>

            {/* 3. align-items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="font-mono text-blue-700">align-items</span>
                  <button
                    onClick={() => onOpenGlossary('cross axis')}
                    className="text-slate-400 hover:text-blue-600"
                    title="交差軸の揃え"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  交差軸方向の揃え
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(['stretch', 'flex-start', 'center', 'flex-end'] as AlignItems[]).map((ai) => (
                  <button
                    key={ai}
                    id={`flex-ai-${ai}`}
                    onClick={() => setAlignItems(ai)}
                    className={`px-2.5 py-1.5 text-xs font-mono rounded-lg border text-center transition-all ${
                      alignItems === ai
                        ? 'bg-white border-blue-500 text-blue-600 font-semibold shadow-xs ring-1 ring-blue-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {ai}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500">
                主軸と垂直に交わる「交差軸」方向での整列方法（上揃え、中央揃え、伸縮など）を指定します。
              </p>
            </div>

            {/* 4. gap slider & flex-wrap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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
                  <span>0px</span>
                  <span>24px</span>
                  <span>48px</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 font-mono">
                    flex-wrap
                  </label>
                  <button
                    onClick={() => onOpenGlossary('wrap')}
                    className="text-slate-400 hover:text-blue-600"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {(['nowrap', 'wrap'] as FlexWrap[]).map((w) => (
                    <button
                      key={w}
                      onClick={() => setFlexWrap(w)}
                      className={`px-2 py-1.5 text-xs font-mono rounded-lg border text-center transition-all ${
                        flexWrap === w
                          ? 'bg-white border-blue-500 text-blue-600 font-semibold shadow-xs ring-1 ring-blue-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional interactive controls: Cards count & Preview container width */}
            <div className="pt-3 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700 font-medium">カード枚数: {itemCount}枚</span>
                <div className="flex items-center gap-1">
                  {[4, 5, 6].map((num) => (
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

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>コンテナ幅テスト: <strong className="text-blue-600">{containerWidth}%</strong></span>
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

          {/* Preview & Code Column (Right, 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visual Preview Stage */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">INTERACTIVE</span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    プレビュー実行画面
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  width: {containerWidth}%
                </span>
              </div>

              {/* Axis indicator banner when enabled */}
              {showAxes && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      主軸 (Main Axis)
                    </span>
                    <span className="font-mono text-slate-800">{mainAxisDesc}</span>
                    <span className="text-slate-500 text-[11px]">➔ justify-contentで整列</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                      交差軸 (Cross Axis)
                    </span>
                    <span className="font-mono text-slate-800">{crossAxisDesc}</span>
                    <span className="text-slate-500 text-[11px]">➔ align-itemsで整列</span>
                  </div>
                </div>
              )}

              {/* Dynamic Flex Container Stage */}
              <div className="w-full flex justify-center bg-slate-200/70 rounded-xl p-4 sm:p-6 min-h-[360px] border border-slate-300/80 overflow-hidden relative">
                {/* Visual axis guide lines behind elements */}
                {showAxes && (
                  <div className="absolute inset-4 pointer-events-none flex items-center justify-center">
                    {isRow ? (
                      <div className="w-[85%] h-px border-t border-dashed border-red-500/70 relative z-20">
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-red-600 uppercase tracking-widest bg-white/90 px-1.5 py-0.5 rounded border border-red-200 shadow-2xs">
                          Main Axis (主軸)
                        </span>
                      </div>
                    ) : (
                      <div className="h-[80%] w-px border-l border-dashed border-red-500/70 relative z-20">
                        <span className="absolute top-1/2 -left-20 -translate-y-1/2 text-[10px] font-bold text-red-600 uppercase tracking-widest bg-white/90 px-1.5 py-0.5 rounded border border-red-200 shadow-2xs" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                          Main Axis (主軸)
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* The Target Container */}
                <div
                  id="flex-preview-container"
                  style={{
                    display: 'flex',
                    flexDirection,
                    justifyContent,
                    alignItems,
                    flexWrap,
                    gap: `${gap}px`,
                    width: `${containerWidth}%`,
                    minHeight: isRow ? '260px' : '380px',
                    transition: 'all 0.25s ease-in-out',
                  }}
                  className="bg-white rounded-xl p-4 shadow-inner border border-slate-300 blueprint-grid relative z-10"
                >
                  {CARDS.slice(0, itemCount).map((card, idx) => (
                    <div
                      key={card.id}
                      id={`flex-card-${card.id}`}
                      className={`p-3.5 rounded-lg border text-white shadow-md shrink-0 transition-all duration-200 flex flex-col justify-between select-none ${
                        card.id === 'A' ? 'bg-blue-600 border-blue-500' :
                        card.id === 'B' ? 'bg-indigo-600 border-indigo-500' :
                        card.id === 'C' ? 'bg-violet-600 border-violet-500' :
                        card.id === 'D' ? 'bg-purple-600 border-purple-500' :
                        card.id === 'E' ? 'bg-teal-600 border-teal-500' :
                        'bg-amber-600 border-amber-500'
                      } ${
                        isRow ? 'w-32 min-h-[100px]' : 'w-full min-h-[64px]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center font-bold text-xs font-mono">
                          {card.id}
                        </span>
                        <span className="text-[10px] text-white/80 font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-xs font-bold text-white">{card.label}</h4>
                        <p className="text-[10px] text-white/80 line-clamp-1">{card.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status explanation */}
              <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>なぜこの配置になるのか？</span>
                </div>
                <p className="leading-relaxed text-blue-900/90">
                  要素は <strong className="text-blue-950 font-bold">{mainAxisDesc}</strong> に沿って配置され、
                  余白は <strong className="text-blue-950 font-bold">{justifyContent}</strong> により分配されています。
                  {flexWrap === 'nowrap' && containerWidth < 70
                    ? ' ※ flex-wrap: nowrap のため、コンテナ幅が狭くなるとアイテムが縮小またははみ出す可能性があります。'
                    : flexWrap === 'wrap'
                    ? ' ※ flex-wrap: wrap が有効なため、幅が足りなくなると次の行へ自動的に折り返します。'
                    : ''}
                </p>
              </div>
            </div>

            {/* Generated CSS Code */}
            <CodeBlock
              id="flexbox-code-block"
              title="生成された Flexbox CSS"
              code={generatedCss}
              highlightedLines={[
                `flex-direction: ${flexDirection}`,
                `justify-content: ${justifyContent}`,
                `align-items: ${alignItems}`,
                `flex-wrap: ${flexWrap}`,
                `gap: ${gap}px`
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
