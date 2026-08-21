import React, { useState } from 'react';
import {
  Wrench,
  AlertCircle,
  CheckCircle2,
  Flame,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  Eye
} from 'lucide-react';
import { OverflowType } from '../types';
import { CodeBlock } from './CodeBlock';

interface BreakAndFixLabProps {
  onOpenGlossary: (term: string) => void;
}

export const BreakAndFixLab: React.FC<BreakAndFixLabProps> = ({ onOpenGlossary }) => {
  const [activeCase, setActiveCase] = useState<number>(1);

  // Case 1 State: Flex wrap
  const [case1Fixed, setCase1Fixed] = useState<boolean>(false);

  // Case 2 State: Long string wrap
  const [case2Fixed, setCase2Fixed] = useState<boolean>(false);

  // Case 3 State: Absolute missing parent relative
  const [case3Fixed, setCase3Fixed] = useState<boolean>(false);

  // Case 4 State: Container overflow
  const [case4Overflow, setCase4Overflow] = useState<OverflowType>('visible');

  return (
    <section id="break-fix" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Wrench className="w-4 h-4" />
              <span>展示 05 / 05</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              Break & Fix Lab
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                レイアウト崩壊と修正
              </span>
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl leading-relaxed">
              完成形を見るだけでなく、<strong className="text-blue-700 font-semibold">「あえて意図的に壊す ➔ 原因を突き止める ➔ CSSで直す」</strong>
              というデバッグ体験を通じて、崩れに強いコーディングスキルを身につけます。
            </p>
          </div>
        </div>

        {/* Case Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              id: 1,
              title: 'ケース 1',
              label: 'カードが横にはみ出す',
              prop: 'flex-wrap: nowrap',
              fixed: case1Fixed,
            },
            {
              id: 2,
              title: 'ケース 2',
              label: '長文・URLで枠が壊れる',
              prop: 'overflow-wrap / word-break',
              fixed: case2Fixed,
            },
            {
              id: 3,
              title: 'ケース 3',
              label: 'absolute要素が飛び出す',
              prop: 'position: relative 欠落',
              fixed: case3Fixed,
            },
            {
              id: 4,
              title: 'ケース 4',
              label: '高さ固定で文字が溢れる',
              prop: 'overflow 各種指定',
              fixed: case4Overflow !== 'visible',
            },
          ].map((item) => (
            <button
              key={item.id}
              id={`case-tab-${item.id}`}
              onClick={() => setActiveCase(item.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                activeCase === item.id
                  ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-blue-600">
                  {item.title}
                </span>
                {item.id === 4 ? (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-100 text-slate-700 border border-slate-200">
                    overflow: {case4Overflow}
                  </span>
                ) : item.fixed ? (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> 修正済み
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                    <Flame className="w-3 h-3" /> 崩壊中
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.label}</h3>
              <p className="text-[11px] font-mono text-slate-500">{item.prop}</p>
            </button>
          ))}
        </div>

        {/* Active Case Interactive Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          {/* ========================================================================= */}
          {/* CASE 1: Flex Wrap Overflow */}
          {/* ========================================================================= */}
          {activeCase === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      CASE 01
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      狭いコンテナでカードが横にはみ出し突き破る
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    初期値の <code className="text-rose-600 font-semibold">flex-wrap: nowrap</code> のままだと、親の幅を超えても改行されずに突き抜けます。
                  </p>
                </div>

                {/* Break / Fix Actions */}
                <div className="flex items-center gap-2">
                  <button
                    id="case1-break-btn"
                    onClick={() => setCase1Fixed(false)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      !case1Fixed
                        ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>意図的に壊す (nowrap)</span>
                  </button>
                  <button
                    id="case1-fix-btn"
                    onClick={() => setCase1Fixed(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      case1Fixed
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CSSで直す (wrap)</span>
                  </button>
                </div>
              </div>

              {/* Preview Stage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">狭小親コンテナ (横幅 340px 制限)</span>
                  <span className="font-mono text-blue-700 font-bold">
                    flex-wrap: {case1Fixed ? 'wrap' : 'nowrap'}
                  </span>
                </div>

                <div className="p-6 bg-slate-200/70 rounded-xl border border-slate-300 flex justify-center overflow-x-auto custom-scrollbar">
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: case1Fixed ? 'wrap' : 'nowrap',
                      gap: '12px',
                      width: '320px',
                    }}
                    className={`p-3 rounded-xl border-2 transition-all relative bg-white shadow-sm blueprint-grid ${
                      case1Fixed
                        ? 'border-emerald-500'
                        : 'border-rose-500'
                    }`}
                  >
                    {['Card A', 'Card B', 'Card C', 'Card D'].map((name, i) => (
                      <div
                        key={name}
                        className="w-24 h-20 shrink-0 p-2.5 rounded-lg bg-blue-600 border border-blue-500 text-white flex flex-col justify-between shadow-xs text-xs font-bold select-none"
                      >
                        <span className="font-mono text-[10px] opacity-80">#{i + 1}</span>
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Explanation & Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>なぜ壊れたのか？（原因）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Flexboxのコンテナは、初期値（デフォルト）で <code className="text-rose-700 font-mono font-semibold">flex-wrap: nowrap</code> が設定されています。
                    そのため、カードの横幅の合計が親コンテナ（320px）を超えても、1行に押し込めようとして横に突き破ってしまいます。
                  </p>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 pt-2">
                    <Sparkles className="w-4 h-4" />
                    <span>どう直したのか？（解決策）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    親コンテナに <code className="text-emerald-700 font-mono font-semibold">flex-wrap: wrap;</code> を指定することで、幅が足りなくなったカードが自動的に2行目へ折り返されるようになります。
                  </p>
                </div>

                <div>
                  <CodeBlock
                    id="case1-code"
                    title="CSS 差分（Diff）"
                    code={
                      case1Fixed
                        ? `.container {\n  display: flex;\n  /* [FIXED] 折り返しを許可 */\n  flex-wrap: wrap;\n  gap: 12px;\n}`
                        : `.container {\n  display: flex;\n  /* [BROKEN] 1行に固執してはみ出す */\n  flex-wrap: nowrap;\n  gap: 12px;\n}`
                    }
                    highlightedLines={['flex-wrap']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CASE 2: Long Unbroken String Breaking Box */}
          {/* ========================================================================= */}
          {activeCase === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      CASE 02
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      URLや長大な英単語でカード枠が突き破られる
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    英語の長いURLやハッシュ値は空白（スペース）がないため、通常の改行ルールでは突き破ってしまいます。
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="case2-break-btn"
                    onClick={() => setCase2Fixed(false)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      !case2Fixed
                        ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>意図的に壊す (改行不可)</span>
                  </button>
                  <button
                    id="case2-fix-btn"
                    onClick={() => setCase2Fixed(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      case2Fixed
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CSSで直す (overflow-wrap)</span>
                  </button>
                </div>
              </div>

              {/* Preview Stage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">カード枠 (width: 280px 固定)</span>
                  <span className="font-mono text-blue-700 font-bold">
                    overflow-wrap: {case2Fixed ? 'anywhere' : 'normal'}
                  </span>
                </div>

                <div className="p-6 bg-slate-200/70 rounded-xl border border-slate-300 flex justify-center">
                  <div
                    style={{
                      width: '280px',
                      overflowWrap: case2Fixed ? 'anywhere' : 'normal',
                      wordBreak: case2Fixed ? 'break-word' : 'normal',
                    }}
                    className={`p-4 rounded-xl border-2 transition-all bg-white shadow-md ${
                      case2Fixed
                        ? 'border-emerald-500'
                        : 'border-rose-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">記事リンクカード</span>
                      <span className="text-[10px] text-slate-500 font-mono">280px</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">
                      参考資料のURLはこちらです：
                    </p>
                    <div className="p-2.5 rounded-lg bg-slate-50 font-mono text-[11px] text-blue-700 border border-slate-200">
                      https://example.com/very-super-extremely-long-production-asset-id-99882200112233445566.html
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanation & Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>なぜ壊れたのか？（原因）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    ブラウザは標準で「単語の途中では改行しない」というルールを持ちます。ハイフンや空白のない長い文字列があると、単語を分割できずに枠を飛び出してしまいます。
                  </p>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 pt-2">
                    <Sparkles className="w-4 h-4" />
                    <span>どう直したのか？（解決策）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <code className="text-emerald-700 font-mono font-semibold">overflow-wrap: anywhere;</code>（または <code className="text-emerald-700 font-mono font-semibold">word-break: break-word;</code>）を指定することで、枠の端に達した長文文字列を強制的に改行させ、カードの形状を守ります。
                  </p>
                </div>

                <div>
                  <CodeBlock
                    id="case2-code"
                    title="CSS 差分（Diff）"
                    code={
                      case2Fixed
                        ? `.card-text {\n  /* [FIXED] どこでも安全に折り返す */\n  overflow-wrap: anywhere;\n  word-break: break-word;\n}`
                        : `.card-text {\n  /* [BROKEN] 単語の分割ができずはみ出す */\n  overflow-wrap: normal;\n  word-break: normal;\n}`
                    }
                    highlightedLines={['overflow-wrap', 'word-break']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CASE 3: Absolute Element Fly Away */}
          {/* ========================================================================= */}
          {activeCase === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      CASE 03
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      バッジ (absolute) が親カードの外へ勝手に飛び出す
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    「カードの右上にNEWバッジを付けたい」のに、親に <code className="text-rose-600 font-semibold">position: relative</code> がないと画面の端まで飛んでいってしまいます。
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="case3-break-btn"
                    onClick={() => setCase3Fixed(false)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      !case3Fixed
                        ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>意図的に壊す (親 relative なし)</span>
                  </button>
                  <button
                    id="case3-fix-btn"
                    onClick={() => setCase3Fixed(true)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border transition-all ${
                      case3Fixed
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CSSで直す (親 relative 付与)</span>
                  </button>
                </div>
              </div>

              {/* Preview Stage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">外側のステージ（ビューポート枠）</span>
                  <span className="font-mono text-blue-700 font-bold">
                    親の position: {case3Fixed ? 'relative' : 'static'}
                  </span>
                </div>

                <div className="p-8 bg-slate-200/70 rounded-xl border-2 border-dashed border-slate-300 relative min-h-[220px] flex items-center justify-center">
                  {/* Outer Stage label */}
                  <span className="absolute top-2 left-3 text-[10px] font-mono text-slate-500 font-semibold">
                    ※ 親に relative がないと、この外枠（または画面最上部）が基準になります
                  </span>

                  {/* Target Product Card */}
                  <div
                    style={{
                      position: case3Fixed ? 'relative' : 'static',
                    }}
                    className={`w-72 p-5 rounded-2xl border-2 transition-all bg-white shadow-md ${
                      case3Fixed
                        ? 'border-emerald-500'
                        : 'border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 mb-1">商品カード</div>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      このカードの右上に「NEW」バッジを付けたい状態です。
                    </p>
                    <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>

                    {/* The Absolute Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                      }}
                      className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] shadow-lg flex items-center gap-1 animate-bounce"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>NEW バッジ</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explanation & Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>なぜ壊れたのか？（原因）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <code className="text-blue-700 font-mono font-semibold">position: absolute</code> は、「positionがstatic以外になっている最も近い先祖要素」を座標の基準（原点）とします。親カードが <code className="text-rose-700 font-mono font-semibold">static</code> のままだと、親を無視して一番外側のビューポート基準で右上に飛んでしまいます。
                  </p>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 pt-2">
                    <Sparkles className="w-4 h-4" />
                    <span>どう直したのか？（解決策）</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    親カードに <code className="text-emerald-700 font-mono font-semibold">position: relative;</code> を指定することで、カード自身の左上が基準点となり、バッジがカードの右上（top: 12px; right: 12px;）にきれいに収まります。
                  </p>
                </div>

                <div>
                  <CodeBlock
                    id="case3-code"
                    title="CSS 差分（Diff）"
                    code={
                      case3Fixed
                        ? `/* [FIXED] 親要素を基準にする */\n.card {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}`
                        : `/* [BROKEN] 親が基準にならず先祖へ飛ぶ */\n.card {\n  position: static;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}`
                    }
                    highlightedLines={['position: relative', 'position: static']}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CASE 4: Height Fixed Container Overflow */}
          {/* ========================================================================= */}
          {activeCase === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                      CASE 04
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      高さ固定コンテナから長い文章が下にダダ漏れする
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    高さを <code className="text-rose-600 font-semibold">height: 120px</code> に固定したコンテナに長文を入れたときの、各 <code className="text-blue-700 font-semibold">overflow</code> プロパティの挙動の違いを比較できます。
                  </p>
                </div>

                {/* Overflow Switchers */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(['visible', 'hidden', 'auto', 'scroll'] as OverflowType[]).map((mode) => (
                    <button
                      key={mode}
                      id={`overflow-mode-${mode}`}
                      onClick={() => setCase4Overflow(mode)}
                      className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                        case4Overflow === mode
                          ? mode === 'visible'
                            ? 'bg-rose-600 border-rose-600 text-white font-bold'
                            : 'bg-emerald-600 border-emerald-600 text-white font-bold'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {mode} {mode === 'visible' ? '(崩壊)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Stage */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium">コンテナ (height: 130px 固定)</span>
                  <span className="font-mono text-blue-700 font-bold">
                    overflow: {case4Overflow}
                  </span>
                </div>

                <div className="p-6 bg-slate-200/70 rounded-xl border border-slate-300 flex justify-center pb-12">
                  <div
                    style={{
                      height: '130px',
                      overflow: case4Overflow,
                    }}
                    className={`w-80 p-4 rounded-xl border-2 transition-all bg-white shadow-md custom-scrollbar relative ${
                      case4Overflow === 'visible'
                        ? 'border-rose-500'
                        : 'border-emerald-500'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                      <span>お知らせボックス</span>
                      <span className="text-[10px] font-mono text-slate-500">h: 130px</span>
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      この文章は高さ130pxの枠に対して長すぎるテキストです。
                      Webサイトの運用中に、お知らせやコメントの文章が予想以上に長くなると、高さ固定ボックスの下端を突き破って次の要素（ボタンやフッター）と重なり、文字が読めなくなる事故が頻発します。
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      autoやscrollを指定することで、はみ出さずに安全にスクロールできるようになります。
                    </p>
                  </div>
                </div>
              </div>

              {/* Explanation & Diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>各 overflow 指定の挙動の違い</span>
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li>
                      <strong className="text-rose-700 font-mono">visible (初期値):</strong> 枠からはみ出したテキストをそのまま外側に突き破って表示（後続の要素と重なり崩壊原因に）。
                    </li>
                    <li>
                      <strong className="text-amber-700 font-mono">hidden:</strong> 枠を超えた部分をスパッと切り捨てて非表示（文章が途中で切れる）。
                    </li>
                    <li>
                      <strong className="text-emerald-700 font-mono">auto (推奨):</strong> 内容があふれた時だけスクロールバーを表示して閲覧可能にする。
                    </li>
                    <li>
                      <strong className="text-blue-700 font-mono">scroll:</strong> あふれているかに関わらず常にスクロールバー領域を確保する。
                    </li>
                  </ul>
                </div>

                <div>
                  <CodeBlock
                    id="case4-code"
                    title="適用中の CSS"
                    code={`.notice-box {\n  height: 130px;\n  overflow: ${case4Overflow};\n}`}
                    highlightedLines={[`overflow: ${case4Overflow}`]}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
