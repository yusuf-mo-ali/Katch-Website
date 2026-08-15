import { ClientCTA } from '../components/Contact';
import { PageFrame } from '../components/PageFrame';
import { PageHero } from '../components/PageHero';
import { PageMeta } from '../components/PageMeta';
import { ProjectGrid } from '../components/Demos';

export default function DemosPage() {
  return (
    <PageFrame>
      <PageMeta
        title="Selected Demos — Katch"
        description="Explore live restaurant, fashion, and e-commerce website demos designed and developed by Katch."
        path="/demos"
      />
      <PageHero
        eyebrow="Selected demos / 2026"
        title={<>Built to be <em>used.</em><br />Designed to be remembered.</>}
        intro="Four distinct demo concepts. Each one explores a focused digital experience shaped around an audience, product, and next action."
        primary={{ href: '/contact', label: 'Start a Project' }}
      >
        <ul className="page-hero-tags" aria-label="Project categories">
          <li>Restaurants</li>
          <li>Fashion</li>
          <li>E-commerce</li>
          <li>Arabic-first UX</li>
        </ul>
      </PageHero>
      <section className="demos demos-page-grid section" aria-label="Katch website demos">
        <ProjectGrid />
      </section>
      <ClientCTA />
    </PageFrame>
  );
}
