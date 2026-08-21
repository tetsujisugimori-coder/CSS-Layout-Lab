import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlexboxLab } from './components/FlexboxLab';
import { GridLab } from './components/GridLab';
import { FlexboxVsGridLab } from './components/FlexboxVsGridLab';
import { PositionLab } from './components/PositionLab';
import { BreakAndFixLab } from './components/BreakAndFixLab';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('flexbox');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [initialGlossaryTerm, setInitialGlossaryTerm] = useState<string | null>(null);

  const handleOpenGlossary = (term?: string) => {
    setInitialGlossaryTerm(term || null);
    setIsGlossaryOpen(true);
  };

  const handleCloseGlossary = () => {
    setIsGlossaryOpen(false);
    setInitialGlossaryTerm(null);
  };

  // Scroll spy for active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['flexbox', 'grid', 'comparison', 'position', 'break-fix'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Sticky Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenGlossary={handleOpenGlossary}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenGlossary={() => handleOpenGlossary()} />
        <FlexboxLab onOpenGlossary={handleOpenGlossary} />
        <GridLab onOpenGlossary={handleOpenGlossary} />
        <FlexboxVsGridLab onOpenGlossary={handleOpenGlossary} />
        <PositionLab onOpenGlossary={handleOpenGlossary} />
        <BreakAndFixLab onOpenGlossary={handleOpenGlossary} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global CSS Layout Glossary & Quick Reference Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={handleCloseGlossary}
        initialTerm={initialGlossaryTerm}
      />
    </div>
  );
}

