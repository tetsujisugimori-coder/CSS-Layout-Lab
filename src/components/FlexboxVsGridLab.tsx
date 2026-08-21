import React, { useState } from 'react';
import { Columns, CheckCircle2, HelpCircle, ArrowRight, Sparkles, Scale, RefreshCw } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface FlexboxVsGridLabProps {
  onOpenGlossary: (term: string) => void;
}

const COMPARISON_ITEMS = [
  { id: 1, label: '01. 検索バー', flexNote: '自然な幅', color: 'from-blue-600 to-indigo-600' },
  { id: 2, label: '02. フィルター', flexNote: 'コンテンツ追従', color: 'from-indigo-600 to-violet-600' },
  { id: 3, label: '03. 並び替え', flexNote: '1行配置', color: 'from-violet-600 to-purple-600' },
  { id: 4, label: '04. アクション', flexNote: '折り返し', color: 'from-fuchsia-600 to-pink-600' },
  { id: 5, label: '05. 最終項目', flexNote: '端数の挙動に注目', color: 'from-rose-600 to-amber-600' },
  { id: 6, label: '06. 追加カード', flexNote: '均等配置', color: 'from-teal-600 to-emerald-600' },
];

export const FlexboxVsGridLab: React.FC<FlexboxVsGridLabProps> = ({ onOpenGlossary }) => {
  const [itemCount, setItemCount] = useState<number>(5); // Default to 5 to clearly highlight the last row difference!
  const [flexGrowEnabled, setFlexGrowEnabled] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(100);

  const flexboxCss = `.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.flex-item {
  /* 3列ベースの幅指定 */
  flex: ${flexGrowEnabled ? '1 1 calc(33.333% - 16px)' : '0 0 calc(33.333% - 16px)'};
  min-width: 140px;
}`;

  const gridCss = `.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.grid-item {
  /* 親のグリッド枠に自動追従 */
}`;

  return (
    <section id="comparison" className="py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Columns className="w-4 h-4" />
              <span>展示 03 / 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Flexbox vs Grid 比較対照
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                1次元 vs 2次元
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              「同じ見た目でも、内部のレイアウト原理が違います」。
              特に<strong className="text-blue-700 font-semibold">「カード枚数が3の倍数でないとき（端数が出たとき）」</strong>や幅変化時の挙動の違いに注目してください。
            </p>
          </div>

          {/* Quick interactive parameters */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 p-1.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-1.5 text-xs text-slate-700">
              <span className="font-semibold text-slate-500 pl-1">カード数:</span>
              {[5, 6].map((num) => (
                <button
                  key={num}
                  id={`comp-count-${num}`}
                  onClick={() => setItemCount(num)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all border ${
                    itemCount === num
                      ? 'bg-blue-600 border-blue-600 text-white font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {num}枚{num === 5 ? '（端数あり）' : '（揃い）'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight Callout Box: What is the core difference */}
        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
              <p className="font-bold text-slate-900">
                直感的な見分け方と使い分けの基準
              </p>
              <p>
                <strong className="text-blue-700 font-semibold">Flexbox（1次元・コンテンツ主導）：</strong> 各アイテム自身のサイズやテキスト量に応じて、柔軟に伸び縮み・改行させたい場合に向いています。
                <br />
                <strong className="text-indigo-700 font-semibold">Grid（2次元・グリッド主導）：</strong> 親が定義した厳密なマス目（行・列の枠）に要素を規則正しく収めたい場合に向いています。
              </p>
              <p className="text-[12px] text-slate-500 pt-1.5 border-t border-blue-200/70">
                ※「どちらか一方しか使えない」わけではなく、実際のWebサイトでは両方で同じ見た目を作れるケースや、Gridのマス目の中にFlexboxを入れる組み合わせが一般的です。
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Flexbox Container */}
          <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    Flexbox で配置した場合
                  </h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-mono font-semibold">
                  display: flex
                </span>
              </div>

              {/* Flexbox options toggle */}
              <div className="mb-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-700 font-medium">端数アイテムの伸縮 (flex-grow):</span>
                <button
                  onClick={() => setFlexGrowEnabled(!flexGrowEnabled)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    flexGrowEnabled
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {flexGrowEnabled ? 'flex: 1 (行末を埋める)' : 'flex: 0 (固定幅)'}
                </button>
              </div>

              {/* Flexbox Live Stage */}
              <div className="bg-slate-200/70 p-4 rounded-xl border border-slate-300 min-h-[260px] flex items-center">
                <div
                  id="flex-comparison-container"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                  className="w-full bg-white rounded-xl p-4 shadow-inner border border-slate-300 blueprint-grid"
                >
                  {COMPARISON_ITEMS.slice(0, itemCount).map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        flex: flexGrowEnabled
                          ? '1 1 calc(33.333% - 16px)'
                          : '0 0 calc(33.333% - 16px)',
                        minWidth: '130px',
                      }}
                      className={`p-3 rounded-lg border text-white shadow-md flex flex-col justify-between min-h-[85px] transition-all select-none ${
                        item.id === 1 ? 'bg-blue-600 border-blue-500' :
                        item.id === 2 ? 'bg-indigo-600 border-indigo-500' :
                        item.id === 3 ? 'bg-violet-600 border-violet-500' :
                        item.id === 4 ? 'bg-purple-600 border-purple-500' :
                        item.id === 5 ? 'bg-teal-600 border-teal-500' :
                        'bg-amber-600 border-amber-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold">#{item.id}</span>
                        {itemCount === 5 && idx >= 3 && flexGrowEnabled && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 text-amber-200 font-mono font-bold">
                            伸縮中 (50%幅)
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold mt-2 text-white">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavior Note */}
              <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                <span className="text-blue-700 font-bold">挙動の特徴: </span>
                {itemCount === 5 && flexGrowEnabled ? (
                  <>2行目の2枚（#4と#5）が余白を分け合って幅が広がります。コンテンツに応じて行ごとに配分が変わります。</>
                ) : (
                  <>各アイテムが指定の基準幅（約33%）を保ち、行の並びを折り返します。</>
                )}
              </div>
            </div>

            <div className="mt-4">
              <CodeBlock
                id="flex-comparison-code"
                title="Flexbox CSS"
                code={flexboxCss}
                highlightedLines={['display: flex', 'flex-wrap: wrap']}
              />
            </div>
          </div>

          {/* RIGHT: Grid Container */}
          <div className="space-y-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    CSS Grid で配置した場合
                  </h3>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono font-semibold">
                  display: grid
                </span>
              </div>

              {/* Grid Column notice */}
              <div className="mb-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-700 font-medium">列構造の保持:</span>
                <span className="font-mono text-blue-700 font-bold">
                  3列のマス目を厳密に維持
                </span>
              </div>

              {/* Grid Live Stage */}
              <div className="bg-slate-200/70 p-4 rounded-xl border border-slate-300 min-h-[260px] flex items-center">
                <div
                  id="grid-comparison-container"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                  }}
                  className="w-full bg-white rounded-xl p-4 shadow-inner border border-slate-300 blueprint-grid"
                >
                  {COMPARISON_ITEMS.slice(0, itemCount).map((item, idx) => (
                    <div
                      key={item.id}
                      className={`p-3 rounded-lg border text-white shadow-md flex flex-col justify-between min-h-[85px] transition-all select-none ${
                        item.id === 1 ? 'bg-blue-600 border-blue-500' :
                        item.id === 2 ? 'bg-indigo-600 border-indigo-500' :
                        item.id === 3 ? 'bg-violet-600 border-violet-500' :
                        item.id === 4 ? 'bg-purple-600 border-purple-500' :
                        item.id === 5 ? 'bg-teal-600 border-teal-500' :
                        'bg-amber-600 border-amber-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold">#{item.id}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/30 text-white font-mono">
                          1マス固定
                        </span>
                      </div>
                      <div className="text-xs font-bold mt-2 text-white">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavior Note */}
              <div className="mt-3 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
                <span className="text-blue-700 font-bold">挙動の特徴: </span>
                {itemCount === 5 ? (
                  <>2行目の3列目が空いたまま、#4と#5は1列目と2列目の幅を厳格にキープします。縦横の揃いが崩れません。</>
                ) : (
                  <>6枚が綺麗に3列×2行のマス目に整列します。</>
                )}
              </div>
            </div>

            <div className="mt-4">
              <CodeBlock
                id="grid-comparison-code"
                title="CSS Grid"
                code={gridCss}
                highlightedLines={['display: grid', 'grid-template-columns: repeat(3, 1fr)']}
              />
            </div>
          </div>
        </div>

        {/* Summary Decision Matrix Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>どちらを選ぶべき？ 実践での判断チェックリスト</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-900 flex items-center gap-1.5 text-sm">
                <span>Flexbox が特に向いている場面</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li>ナビゲーションバー（ロゴを左、メニューを右に寄せる等）</li>
                <li>ボタン内のアイコン＋テキストの中央揃え</li>
                <li>文字数によって幅が変わるタグやバッジの並び</li>
                <li>1行（または1列）に沿った余白配分（space-betweenなど）</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
                <span>CSS Grid が特に向いている場面</span>
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li>均一な商品カード一覧、ギャラリー（端数があっても縦横を揃えたい）</li>
                <li>ヘッダー・メイン・サイドバー・フッターなどページ全体の枠組み</li>
                <li>一部のカードだけ「2列分」「2行分」に広げたいレイアウト</li>
                <li>メディアクエリを書かずにauto-fitでレスポンシブ化したい時</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
