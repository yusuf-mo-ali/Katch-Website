import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero, ValueStrip } from './components/Hero';
import { Work } from './components/Work';
import { Process, Services, Technology, WhyKatch } from './components/Capabilities';
import { ClientCTA, Contact, Footer } from './components/Contact';

function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <ValueStrip />
        <Work />
        <Services />
        <WhyKatch />
        <Process />
        <Technology />
        <ClientCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
