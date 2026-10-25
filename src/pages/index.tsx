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

    const scrollToSection = (): boolean => {
      const element = document.getElementById(id);
      if (!element) return false;
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    };

    if (scrollToSection()) return;

    // Sections are lazy-loaded, so wait for the target to mount instead of
    // giving up after a fixed number of frames. The timeout only guards
    // against a hash that never matches an element.
    const observer = new MutationObserver(() => {
      if (scrollToSection()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeoutId = setTimeout(() => observer.disconnect(), 10_000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
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
