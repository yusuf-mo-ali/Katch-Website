import { ClientCTA } from '../components/Contact';
import { Technology } from '../components/Capabilities';
import { PageFrame } from '../components/PageFrame';
import { PageHero } from '../components/PageHero';
import { PageMeta } from '../components/PageMeta';

const beliefs = [
  ['01', 'Clarity beats noise.', 'A visitor should understand the business, its value, and the next step without working for it.'],
  ['02', 'Design should earn its place.', 'Every visual decision should support attention, comprehension, trust, or action.'],
  ['03', 'Mobile is the real experience.', 'Small screens are designed deliberately from the start, not corrected after desktop is finished.'],
  ['04', 'Launch quality matters.', 'Forms, accessibility, metadata, performance, and edge cases are part of the build—not optional cleanup.'],
];

export default function AboutPage() {
  return (
    <PageFrame>
      <PageMeta
        title="About Katch — Web Design & Development Agency"
        description="Katch is a modern web design and development agency focused on clear strategy, premium execution, responsive quality, and useful technology."
        path="/about"
      />
      <PageHero
        eyebrow="About Katch"
        title={<>Good design gets noticed.<br /><em>Useful design gets results.</em></>}
        intro="Katch helps businesses turn what makes them worth choosing into a website people can understand, trust, and act on."
        primary={{ href: '/contact', label: 'Start a Project' }}
        secondary={{ href: '/work', label: 'View Our Work' }}
      />

      <section className="about-story section" aria-labelledby="about-story-title">
        <div className="about-story-grid shell">
          <div className="reveal">
            <p className="eyebrow">What Katch is</p>
            <h2 id="about-story-title">A web agency built around the quality of the final experience.</h2>
          </div>
          <div className="about-story-copy reveal">
            <p>Katch designs and develops websites for businesses that care how they are perceived and what happens after someone lands on the page.</p>
            <p>That means starting with the business problem, creating a strong visual direction, building every layout responsively, and testing the details that decide whether a website feels trustworthy.</p>
            <p>The goal is not to add more. It is to make the right things clearer, faster, and harder to ignore.</p>
          </div>
        </div>
      </section>

      <section className="beliefs section" aria-labelledby="beliefs-title">
        <div className="section-heading shell reveal">
          <div>
            <p className="eyebrow">What we believe</p>
            <h2 id="beliefs-title">Quality is a system, not a finishing touch.</h2>
          </div>
          <p>Strategy, design, development, mobile behavior, and launch checks all shape the same customer experience.</p>
        </div>
        <div className="belief-grid shell">
          {beliefs.map(([number, title, copy]) => (
            <article className="reveal" key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <Technology />
      <ClientCTA />
    </PageFrame>
  );
}
