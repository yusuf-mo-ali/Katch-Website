import { ArrowDownRight, Bot, Gauge, LayoutTemplate, RefreshCcw, ShoppingBag, Target } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Business Websites',
    copy: 'Modern websites designed to establish credibility and generate leads.',
    note: 'Company sites · Portfolios · Restaurants',
    Icon: LayoutTemplate,
  },
  {
    number: '02',
    title: 'Landing Pages',
    copy: 'Focused pages designed around one clear conversion goal.',
    note: 'Campaigns · Products · Lead generation',
    Icon: Target,
  },
  {
    number: '03',
    title: 'E-commerce',
    copy: 'Premium online stores that make discovering and buying products simple.',
    note: 'Shopify · Custom storefronts · Catalogues',
    Icon: ShoppingBag,
  },
  {
    number: '04',
    title: 'Website Redesign',
    copy: 'Turn outdated websites into modern, responsive experiences.',
    note: 'UX audit · Visual refresh · Rebuild',
    Icon: RefreshCcw,
  },
  {
    number: '05',
    title: 'AI & Automation',
    copy: 'Integrate AI tools and automation to reduce repetitive work and improve customer experience.',
    note: 'Chatbots · Workflows · Integrations',
    Icon: Bot,
  },
  {
    number: '06',
    title: 'Performance & SEO',
    copy: 'Improve speed, technical SEO, accessibility, and overall website quality.',
    note: 'Core Web Vitals · Analytics · Maintenance',
    Icon: Gauge,
  },
];

const principles = [
  ['01', 'Strategy First', 'We design around the business goal, not just aesthetics.'],
  ['02', 'Built for Every Screen', 'Every experience is designed mobile-first and tested across screen sizes.'],
  ['03', 'Fast by Default', 'Performance is treated as part of the product, not an afterthought.'],
  ['04', 'Designed to Convert', 'Clear structure, strong CTAs, and intuitive UX guide visitors toward action.'],
];

const steps = [
  ['01', 'Discover', 'Understand the business, audience, goals, and problems.'],
  ['02', 'Design', 'Create the visual direction, structure, and user experience.'],
  ['03', 'Build', 'Develop the website with modern, maintainable technology.'],
  ['04', 'Launch', 'Test, optimize, deploy, and provide ongoing support.'],
];

export function Services() {
  return (
    <section className="services section section--dark" id="services" aria-labelledby="services-title">
      <div className="section-heading section-heading--light shell reveal">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2 id="services-title">What We Build</h2>
        </div>
        <p>The right website, shaped around the job your business needs it to do.</p>
      </div>
      <div className="services-grid shell">
        {services.map(({ number, title, copy, note, Icon }) => (
          <article className="service-card reveal" key={title}>
            <div className="service-top">
              <span>{number}</span>
              <Icon aria-hidden="true" strokeWidth={1.5} />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
            <p className="service-note">{note}</p>
          </article>
        ))}
      </div>
      <div className="services-footer shell reveal">
        <p>Also available: SEO basics, analytics setup, performance optimization, and ongoing website maintenance.</p>
        <a href="#contact">Discuss your project <ArrowDownRight aria-hidden="true" size={17} /></a>
      </div>
    </section>
  );
}

export function WhyKatch() {
  return (
    <section className="why section" id="about" aria-labelledby="why-title">
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

export function Process() {
  return (
    <section className="process section" id="process" aria-labelledby="process-title">
      <div className="process-heading shell reveal">
        <p className="eyebrow">How we work</p>
        <h2 id="process-title">A clear process.<br /><em>No mystery.</em></h2>
        <p>Four focused stages keep the project moving, decisions clear, and the final result aligned with the business.</p>
      </div>
      <div className="process-list shell">
        {steps.map(([number, title, copy]) => (
          <article className="process-step reveal" key={title}>
            <span className="step-number">{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <span className="step-progress" aria-hidden="true"><i /></span>
          </article>
        ))}
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
