import { ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClientCTA } from '../components/Contact';
import { PageFrame } from '../components/PageFrame';
import { PageHero } from '../components/PageHero';
import { PageMeta } from '../components/PageMeta';
import { services } from '../data/services';

const groups = ['Websites', 'Growth & Operations'];

export default function ServicesPage() {
  return (
    <PageFrame>
      <PageMeta
        title="Web Design, Development & Automation Services — Katch"
        description="Explore Katch services for business websites, landing pages, e-commerce, redesigns, AI integration, automation, SEO, analytics, performance, and maintenance."
        path="/services"
      />
      <PageHero
        eyebrow="Services"
        title={<>The right build for<br /><em>the job at hand.</em></>}
        intro="Katch combines strategy, design, development, and practical integrations to give businesses a website that earns attention and supports action."
        primary={{ href: '/contact', label: 'Start a Project' }}
        secondary={{ href: '/demos', label: 'View Our Demos' }}
      />

      <div className="service-directory section">
        {groups.map((group) => (
          <section className="service-group shell" key={group} aria-labelledby={`group-${group.replaceAll(' ', '-').toLowerCase()}`}>
            <div className="service-group-heading reveal">
              <p className="eyebrow">{group}</p>
              <h2 id={`group-${group.replaceAll(' ', '-').toLowerCase()}`}>
                {group === 'Websites' ? 'Digital experiences built around a clear purpose.' : 'The systems that make the website work harder.'}
              </h2>
            </div>
            <div className="service-detail-grid">
              {services.filter((service) => service.group === group).map((service) => (
                <article className="service-detail-card reveal" id={service.id} key={service.id}>
                  <div className="service-detail-top">
                    <span>{service.number}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <dl>
                    <div><dt>What it is</dt><dd>{service.summary}</dd></div>
                    <div><dt>Who it&apos;s for</dt><dd>{service.forWho}</dd></div>
                    <div><dt>Katch delivers</dt><dd>{service.delivers}</dd></div>
                    <div><dt>Business benefit</dt><dd>{service.benefit}</dd></div>
                  </dl>
                  <Link to="/contact">Start a Project <ArrowDownRight aria-hidden="true" /></Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ClientCTA />
    </PageFrame>
  );
}
