import React, { useState, useMemo, useRef } from 'react';
import { Move, HelpCircle, RotateCcw, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react';
import { PositionType } from '../types';
import { CodeBlock } from './CodeBlock';

interface PositionLabProps {
  onOpenGlossary: (term: string) => void;
}

export const PositionLab: React.FC<PositionLabProps> = ({ onOpenGlossary }) => {
  const [positionType, setPositionType] = useState<PositionType>('relative');
  const [topOffset, setTopOffset] = useState<number>(20);
  const [leftOffset, setLeftOffset] = useState<number>(30);
  const [parentHasRelative, setParentHasRelative] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const generatedCss = useMemo(() => {
    if (positionType === 'static') {
      return `/* 通常のドキュメントフロー */
.target-element {
  position: static;
  /* top, left, right, bottom は無視されます */
}`;
    }

    if (positionType === 'relative') {
      return `/* 本来の場所を基準に相対移動（元の空間はキープ） */
.target-element {
  position: relative;
  top: ${topOffset}px;
  left: ${leftOffset}px;
}`;
    }

    if (positionType === 'absolute') {
      return `/* 基準となる親要素 */
.parent-container {
  position: ${parentHasRelative ? 'relative' : 'static'}; /* ${parentHasRelative ? '基準になる' : '基準にならず先祖へ'} */
}

/* 通常フローから外れて絶対配置 */
.target-element {
  position: absolute;
  top: ${topOffset}px;
  left: ${leftOffset}px;
}`;
    }

    if (positionType === 'fixed') {
      return `/* 画面（ビューポート）に固定配置 */
.target-element {
  position: fixed;
  top: ${topOffset}px;
  right: 24px;
  z-index: 50;
}`;
    }

    if (positionType === 'sticky') {
      return `/* スクロールして指定位置に達すると固定 */
.target-element {
  position: sticky;
  top: 0px;
  z-index: 10;
}`;
    }

    return '';
  }, [positionType, topOffset, leftOffset, parentHasRelative]);

  const resetDefaults = () => {
    setPositionType('relative');
    setTopOffset(20);
    setLeftOffset(30);
    setParentHasRelative(true);
  };

  return (
    <section id="position" className="py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Move className="w-4 h-4" />
              <span>展示 04 / 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Position Lab
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                要素配置と通常フロー
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              <strong className="text-blue-700 font-semibold">「通常のドキュメントフロー（配置の流れ）」</strong>から外れるのか、それとも残るのか。
              何を基準（Containing Block）にして位置が決まるのかを体験的に学びます。
            </p>
          </div>

          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>リセット</span>
          </button>
        </div>

        {/* Conceptual Guide: Normal Flow vs Out-of-Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-bold text-blue-700 flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              通常フロー内に残る（static / relative / sticky）
            </span>
            <p className="text-slate-600 leading-relaxed">
              要素が元々いたスペースが確保され、前後の要素（兄弟要素）は詰められません。relativeで移動しても、元の場所に透明なスペースが残り続けます。
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-2xs">
            <span className="font-bold text-indigo-700 flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              通常フローから外れる（absolute / fixed）
            </span>
            <p className="text-slate-600 leading-relaxed">
              要素が浮き上がり、元あった空間は消滅します。前後の要素は隙間を詰めて詰まり、基準となる親や画面に対して独立して配置されます。
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Panel (Left, 5 cols) */}
          <div className="lg:col-span-5 space-y-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                Position タイプ選択
              </h3>
              <span className="text-[11px] text-slate-500">リアルタイム操作</span>
            </div>

            {/* Position Type Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['static', 'relative', 'absolute', 'fixed', 'sticky'] as PositionType[]).map((pos) => (
                <button
                  key={pos}
                  id={`pos-type-${pos}`}
                  onClick={() => setPositionType(pos)}
                  className={`px-3 py-2.5 text-xs font-mono rounded-xl border text-center transition-all ${
                    positionType === pos
                      ? 'bg-white border-blue-500 text-blue-600 font-bold shadow-xs ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Contextual Sliders & Settings based on selected position */}
            <div className="space-y-4 pt-2">
              {positionType === 'static' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-slate-800">static（初期値・通常状態）</div>
                  <p>
                    HTMLの記述順通りに自然に配置されます。top や left を指定しても一切移動しません。
                  </p>
                </div>
              )}

              {positionType === 'relative' && (
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>相対移動（本来の場所からのオフセット）</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-mono">
                      <span>top: <strong className="text-blue-600">{topOffset}px</strong></span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="60"
                      value={topOffset}
                      onChange={(e) => setTopOffset(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-mono">
                      <span>left: <strong className="text-blue-600">{leftOffset}px</strong></span>
                    </div>
                    <input
                      type="range"
                      min="-40"
                      max="80"
                      value={leftOffset}
                      onChange={(e) => setLeftOffset(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    点線の枠（元の位置）に注目してください。元のスペースは保持されたまま、要素だけがずれます。
                  </p>
                </div>
              )}

              {positionType === 'absolute' && (
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>親要素の基準設定（Containing Block）</span>
                  </div>

                  {/* Toggle parent position: relative */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        親要素に position: relative を付ける
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {parentHasRelative ? '基準 = 親コンテナ' : '基準 = 画面外枠（先祖）'}
                      </div>
                    </div>
                    <button
                      id="toggle-parent-relative-btn"
                      onClick={() => setParentHasRelative(!parentHasRelative)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all shadow-xs ${
                        parentHasRelative
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-rose-600 border-rose-600 text-white'
                      }`}
                    >
                      {parentHasRelative ? '親に relative あり' : '親は static (なし)'}
                    </button>
                  </div>

                  {!parentHasRelative && (
                    <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                      <span>
                        親に relative がないため、親コンテナを無視して外側のプレビュー枠を基準に配置されています！
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-700 font-mono">
                      <span>top: <strong className="text-blue-600">{topOffset}px</strong></span>
                      <span>left: <strong className="text-blue-600">{leftOffset}px</strong></span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={topOffset}
                      onChange={(e) => setTopOffset(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              )}

              {positionType === 'fixed' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-blue-700">fixed（画面固定配置）</div>
                  <p className="leading-relaxed text-slate-600">
                    プレビュー内のスクロール領域を上下にスクロールしてみてください。他の要素が流れても、fixed要素は同じ場所に固定され続けます。
                  </p>
                </div>
              )}

              {positionType === 'sticky' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-blue-700">sticky（スクロール粘着配置）</div>
                  <p className="leading-relaxed text-slate-600">
                    プレビューをスクロールすると、ターゲット見出しが上端（top: 0）に達した瞬間ピタッと張り付きます！
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Preview & Code (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">POSITIONING</span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Position 実行プレビュー（スクロール対応）
                  </h3>
                </div>
                <span className="text-xs text-blue-600 font-bold font-mono">
                  position: {positionType}
                </span>
              </div>

              {/* Viewport Simulation Frame */}
              <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-200/70 p-4">
                <div className="text-[10px] font-mono text-slate-600 mb-2 flex items-center justify-between font-semibold">
                  <span>プレビュー領域（ビューポート基準）</span>
                  {positionType === 'fixed' && (
                    <span className="text-blue-700 font-bold animate-bounce">
                      ⬇ 下にスクロールしてください
                    </span>
                  )}
                </div>

                {/* Fixed item floating over the entire preview area when fixed */}
                {positionType === 'fixed' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: `${topOffset + 30}px`,
                      right: '24px',
                      zIndex: 30,
                    }}
                    className="p-3 bg-blue-600 text-white rounded-lg shadow-xl border border-blue-500 font-bold text-xs flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Fixed バッジ (固定中)</span>
                  </div>
                )}

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="h-72 overflow-y-auto p-4 bg-white rounded-xl border border-slate-300 custom-scrollbar space-y-4 relative blueprint-grid"
                >
                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 border border-slate-200 font-medium">
                    前にある要素 01（通常フロー・兄弟要素）
                  </div>

                  {/* Target Parent Container */}
                  <div
                    id="position-parent-box"
                    style={{
                      position: positionType === 'absolute' && parentHasRelative ? 'relative' : 'static',
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      positionType === 'absolute' && parentHasRelative
                        ? 'border-blue-500 bg-blue-50/40'
                        : 'border-slate-300 bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2 text-slate-600">
                      <span className="font-bold">親コンテナ (.parent-container)</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs font-semibold">
                        {positionType === 'absolute'
                          ? parentHasRelative
                            ? 'position: relative (基準)'
                            : 'position: static (非基準)'
                          : '通常親要素'}
                      </span>
                    </div>

                    {/* Relative Original Ghost indicator */}
                    {positionType === 'relative' && (
                      <div className="w-full h-12 rounded-lg border border-dashed border-blue-400 bg-blue-50/80 flex items-center justify-center text-[10px] font-mono text-blue-700 font-bold mb-2">
                        元の位置（通常フロースペースは保持）
                      </div>
                    )}

                    {/* The Target Element */}
                    {positionType !== 'fixed' && (
                      <div
                        id="position-target-element"
                        style={{
                          position: positionType,
                          top:
                            positionType === 'relative' || positionType === 'absolute'
                              ? `${topOffset}px`
                              : positionType === 'sticky'
                              ? '0px'
                              : undefined,
                          left:
                            positionType === 'relative' || positionType === 'absolute'
                              ? `${leftOffset}px`
                              : undefined,
                          zIndex: positionType === 'sticky' ? 20 : 10,
                        }}
                        className={`p-3.5 rounded-lg text-white font-bold text-xs shadow-md transition-all select-none ${
                          positionType === 'sticky'
                            ? 'bg-blue-700 border border-blue-600'
                            : 'bg-blue-600 border border-blue-500 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>★ ターゲット要素 ({positionType})</span>
                          <span className="text-[10px] text-white/90 font-mono">
                            {positionType === 'relative' && `top: ${topOffset}px, left: ${leftOffset}px`}
                            {positionType === 'absolute' && `top: ${topOffset}px, left: ${leftOffset}px`}
                            {positionType === 'sticky' && 'top: 0px (粘着)'}
                            {positionType === 'static' && '通常配置'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-3 mt-3 bg-slate-100 rounded-lg text-xs text-slate-600 border border-slate-200 font-medium">
                      親コンテナ内の後続テキスト（兄弟要素）
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 border border-slate-200 font-medium">
                    後にある要素 02（スクロールして sticky や fixed の挙動を確認してください）
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 border border-slate-200 font-medium">
                    後にある要素 03（長いスクロール用ダミーコンテンツ）
                  </div>
                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600 border border-slate-200 font-medium">
                    後にある要素 04（ページの終端）
                  </div>
                </div>
              </div>

              {/* Status explanation */}
              <div className="bg-blue-50 border border-blue-200/80 rounded-xl p-4 text-xs text-blue-900 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>位置と基準の解説:</span>
                </div>
                <p className="leading-relaxed text-blue-900/90">
                  {positionType === 'static' && 'HTMLの順番通りに整列。オフセット指定は効きません。'}
                  {positionType === 'relative' && '本来のスペースを残したまま、指定分だけ位置をずらします。'}
                  {positionType === 'absolute' && (
                    parentHasRelative
                      ? '親要素（position: relative）を基準（左上 (0,0)）として絶対配置されています。'
                      : '親要素が static のため、親を無視して一番外側のビューポート基準で配置されてしまいます！'
                  )}
                  {positionType === 'fixed' && 'スクロールしても画面上の同じ座標に留まり続けます。'}
                  {positionType === 'sticky' && '普段は通常通り流れ、上端（top: 0）に達したときに画面に固定されます。'}
                </p>
              </div>
            </div>

            {/* Generated CSS Code */}
            <CodeBlock
              id="position-code-block"
              title="生成された Position CSS"
              code={generatedCss}
              highlightedLines={[
                `position: ${positionType}`,
                `top: ${topOffset}px`,
                `left: ${leftOffset}px`,
                `position: ${parentHasRelative ? 'relative' : 'static'}`
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
