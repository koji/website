import GoToTopButton from '@/components/GoToTopButton';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import React, { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const About = lazy(() => import('@/components/About'));
const Contact = lazy(() => import('@/components/Contact'));
const PersonalProjects = lazy(() => import('@/components/PersonalProjects'));
const WorkProjects = lazy(() =>
  import('@/components/WorkProjects').then((m) => ({ default: m.WorkProjects })),
);

export const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.slice(1);
    if (!id) return;

    let frame = 0;
    let requestId = 0;

    const scrollToSection = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (frame < 120) {
        frame += 1;
        requestId = requestAnimationFrame(scrollToSection);
      }
    };

    scrollToSection();

    return () => cancelAnimationFrame(requestId);
  }, [hash]);

  return (
    <div className="min-h-screen bg-notion-canvas text-notion-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:rounded focus:shadow-lg focus:text-[#37352F]"
      >
        Skip to content
      </a>
      <Navigation />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <WorkProjects />
          <PersonalProjects />
          <Contact />
        </Suspense>
      </main>

      <GoToTopButton
        position="bottom-right"
        showAfter={150}
        showScrollProgress={true}
        className="debug-go-to-top"
      />
    </div>
  );
};
