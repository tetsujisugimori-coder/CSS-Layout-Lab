import React from 'react';
import { Sparkles, Layers, Box, Columns, Move, Wrench, BookOpen, Compass, ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenGlossary: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGlossary }) => {
  const exhibits = [
    { id: 'flexbox', name: 'Flexbox Lab', icon: Layers, desc: '1方向の柔軟整列・主軸と交差軸' },
    { id: 'grid', name: 'Grid Lab', icon: Box, desc: '2次元マス目設計・minmaxレスポンシブ' },
    { id: 'comparison', name: 'Flex vs Grid', icon: Columns, desc: '見た目は同じ、内部設計の差異' },
    { id: 'position', name: 'Position Lab', icon: Move, desc: '通常フローと配置基準の仕組み' },
    { id: 'break-fix', name: 'Break & Fix', icon: Wrench, desc: '意図的に壊して直すデバッグ実践' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-8 pb-10 overflow-hidden bg-white border-b border-slate-200 shadow-sm">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative">
        {/* Main Title & Lead */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>CSS LAB 第四弾：体験型レイアウト学習教材</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            CSS Layout Lab
            <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-600 mt-1">
              プロパティの因果関係を操作して理解する
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            単なるプロパティの暗記ではなく、
            <strong className="text-blue-700 font-semibold">「なぜFlexboxを使うのか」「なぜGridなのか」「なぜレイアウトが崩れ、どう直すのか」</strong>
            をリアルタイムなプレビューとコード差分で直感的に体感できるインタラクティブ展示です。
          </p>
        </div>

        {/* 5 Exhibit Quick Jump Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {exhibits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500 text-left transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-bold group-hover:text-blue-600 transition-colors">
                    0{idx + 1}.
                  </span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
