import React from 'react';
import { Layers, Box, Columns, Move, Wrench, BookOpen, ChevronRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenGlossary: (term?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenGlossary }) => {
  const navItems = [
    { id: 'flexbox', label: 'Flexbox Lab', icon: Layers, number: '01' },
    { id: 'grid', label: 'Grid Lab', icon: Box, number: '02' },
    { id: 'comparison', label: 'Flex vs Grid', icon: Columns, number: '03' },
    { id: 'position', label: 'Position Lab', icon: Move, number: '04' },
    { id: 'break-fix', label: 'Break & Fix', icon: Wrench, number: '05' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-sm text-sm font-mono tracking-tight">
                L
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white font-display text-base tracking-tight group-hover:text-blue-400 transition-colors">
                    CSS Layout Lab
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/80">
                    LAB #4
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none mt-0.5">
                  Professional Polish Interactive Learning
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? 'text-blue-200' : 'text-slate-500'}`}>{item.number}.</span>
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Glossary button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="open-glossary-btn"
              onClick={() => onOpenGlossary()}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 rounded-lg transition-all shadow-sm group hover:border-slate-600"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>レイアウト用語集</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 font-mono">
                15語
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Sub-nav */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-800 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-800/80 border border-slate-750'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
