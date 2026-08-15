import { ClientCTA } from '../components/Contact';
import { PageFrame } from '../components/PageFrame';
import { PageHero } from '../components/PageHero';
import { PageMeta } from '../components/PageMeta';
import { ProjectGrid } from '../components/Work';

export default function WorkPage() {
  return (
    <PageFrame>
      <PageMeta
        title="Selected Work — Katch"
        description="Explore restaurant, fashion, and e-commerce websites designed and developed by Katch."
        path="/work"
      />
      <PageHero
        eyebrow="Selected work / 2026"
        title={<>Built to be <em>used.</em><br />Designed to be remembered.</>}
        intro="Four distinct businesses. Four focused digital experiences. Each one shaped around its audience, product, and next action."
        primary={{ href: '/contact', label: 'Start a Project' }}
      >
        <ul className="page-hero-tags" aria-label="Project categories">
          <li>Restaurants</li>
          <li>Fashion</li>
          <li>E-commerce</li>
          <li>Arabic-first UX</li>
        </ul>
      </PageHero>
      <section className="work work-page-grid section" aria-label="Katch portfolio projects">
        <ProjectGrid />
      </section>
      <ClientCTA />
    </PageFrame>
  );
}
