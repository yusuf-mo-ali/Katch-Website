import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import { ButtonLink } from './Button';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid shell">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Web design & development agency
          </p>
          <h1 id="hero-title">
            Websites that make businesses <em>impossible to ignore.</em>
          </h1>
          <div className="hero-intro">
            <p>Katch designs and builds fast, modern websites that turn attention into customers.</p>
            <p className="hero-audience">For ambitious businesses, brands, and growing teams.</p>
          </div>
          <div className="hero-actions">
            <ButtonLink href="#contact">Start a Project</ButtonLink>
            <ButtonLink href="#work" variant="text">View Our Work</ButtonLink>
          </div>
        </div>

        <div className="hero-showcase" aria-label="A preview of a recent Katch website project">
          <div className="showcase-orbit showcase-orbit--one" aria-hidden="true" />
          <div className="showcase-orbit showcase-orbit--two" aria-hidden="true" />
          <div className="project-window project-window--main">
            <div className="window-bar">
              <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
              <span>Recent launch / Restaurant</span>
              <ArrowUpRight aria-hidden="true" size={15} />
            </div>
            <div className="window-media">
              <img
                src="/projects/smash-preview.webp"
                srcSet="/projects/smash-preview-sm.webp 760w, /projects/smash-preview.webp 1440w"
                sizes="(max-width: 820px) 92vw, 42vw"
                alt="Homepage preview of the Smash Burger restaurant website"
                width="1440"
                height="960"
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="floating-note floating-note--top" aria-hidden="true">
            <span>01</span>
            <p>Built for attention.<br />Designed for action.</p>
          </div>
          <div className="floating-note floating-note--bottom" aria-hidden="true">
            <Check size={15} />
            <p>Mobile-first<br />by default</p>
          </div>
        </div>
      </div>

      <div className="hero-footer shell">
        <a href="#work" className="scroll-cue">
          <ArrowDown aria-hidden="true" size={16} />
          Scroll to explore
        </a>
        <p>Strategy · Design · Development · Optimization</p>
      </div>
    </section>
  );
}

const benefits = ['Mobile-first', 'Fast performance', 'Conversion-focused', 'SEO-ready', 'Modern UI/UX', 'Easy to maintain'];

export function ValueStrip() {
  return (
    <section className="value-strip" aria-label="Website benefits">
      <div className="value-inner shell">
        <p className="value-label">Every Katch website is</p>
        <div className="value-items">
          {benefits.map((benefit) => (
            <span key={benefit}><i aria-hidden="true" />{benefit}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
