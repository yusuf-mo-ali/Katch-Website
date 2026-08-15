import { ArrowDownRight, Bot, Gauge, LayoutTemplate, RefreshCcw, ShoppingBag, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { processSteps, services } from '../data/services';

const iconByService = {
  'business-websites': LayoutTemplate,
  'landing-pages': Target,
  ecommerce: ShoppingBag,
  'website-redesign': RefreshCcw,
  'ai-integration': Bot,
  performance: Gauge,
};

const previewServices = [services[0], services[1], services[2], services[7]];

const principles = [
  ['01', 'Strategy First', 'We design around the business goal, not just aesthetics.'],
  ['02', 'Built for Every Screen', 'Every experience is designed mobile-first and tested across screen sizes.'],
  ['03', 'Fast by Default', 'Performance is treated as part of the product, not an afterthought.'],
  ['04', 'Designed to Convert', 'Clear structure, strong CTAs, and intuitive UX guide visitors toward action.'],
];

export function ServicesPreview() {
  return (
    <section className="services section section--dark" aria-labelledby="services-preview-title">
      <div className="section-heading section-heading--light shell reveal">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2 id="services-preview-title">What We Build</h2>
        </div>
        <p>The right website, shaped around the job your business needs it to do.</p>
      </div>
      <div className="services-grid services-grid--preview shell">
        {previewServices.map((service) => {
          const Icon = iconByService[service.id] || LayoutTemplate;
          return (
            <article className="service-card reveal" key={service.id}>
              <div className="service-top">
                <span>{service.number}</span>
                <Icon aria-hidden="true" strokeWidth={1.5} />
              </div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
              <p className="service-note">{service.forWho}</p>
            </article>
          );
        })}
      </div>
      <div className="services-footer shell reveal">
        <p>From focused landing pages to complete stores, automation, SEO, analytics, and long-term support.</p>
        <Link to="/services">View Services <ArrowDownRight aria-hidden="true" size={17} /></Link>
      </div>
    </section>
  );
}

export function WhyKatch() {
  return (
    <section className="why section" aria-labelledby="why-title">
      <div className="why-layout shell">
        <div className="why-intro reveal">
          <p className="eyebrow">Why Katch</p>
          <h2 id="why-title">Not just a website. <em>A better digital presence.</em></h2>
          <p>Your website should earn trust quickly, explain your value clearly, and make the next step obvious.</p>
        </div>
        <div className="principles">
          {principles.map(([number, title, copy]) => (
            <article className="principle reveal" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessPreview() {
  return (
    <section className="process section" aria-labelledby="process-preview-title">
      <div className="process-heading shell reveal">
        <p className="eyebrow">How we work</p>
        <h2 id="process-preview-title">A clear process.<br /><em>No mystery.</em></h2>
        <p>Four focused stages keep the project moving, decisions clear, and the final result aligned with the business.</p>
      </div>
      <div className="process-list shell">
        {processSteps.map((step) => (
          <article className="process-step reveal" key={step.title}>
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
            <span className="step-progress" aria-hidden="true"><i /></span>
          </article>
        ))}
      </div>
      <div className="process-preview-link shell reveal">
        <Link to="/process">View Process <ArrowDownRight aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

const technologies = ['React', 'JavaScript', 'HTML', 'CSS', 'Vite', 'Firebase', 'Shopify', 'AI APIs', 'Automation Tools'];

export function Technology() {
  return (
    <section className="technology" aria-labelledby="technology-title">
      <div className="technology-inner shell reveal">
        <div>
          <p className="eyebrow">Technology, in service of the outcome</p>
          <h2 id="technology-title">Modern tools. Chosen for the job.</h2>
        </div>
        <p>We use proven technology to make websites fast, flexible, and maintainable—not to fill a résumé.</p>
        <ul aria-label="Technologies Katch works with">
          {technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </div>
    </section>
  );
}
