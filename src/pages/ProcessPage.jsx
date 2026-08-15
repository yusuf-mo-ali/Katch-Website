import { Check } from 'lucide-react';
import { ClientCTA } from '../components/Contact';
import { PageFrame } from '../components/PageFrame';
import { PageHero } from '../components/PageHero';
import { PageMeta } from '../components/PageMeta';
import { processSteps } from '../data/services';

const expectations = [
  ['Communication', 'Clear updates, focused questions, and one shared view of what is happening next.'],
  ['Feedback', 'Structured review points keep comments useful and prevent decisions from getting scattered.'],
  ['Revisions', 'Focused revision rounds refine the approved direction without turning the process into guesswork.'],
  ['Testing', 'Responsive behavior, forms, accessibility, performance, and key user journeys are checked before launch.'],
];

export default function ProcessPage() {
  return (
    <PageFrame>
      <PageMeta
        title="Our Web Design & Development Process — Katch"
        description="See how Katch moves website projects from discovery and design through development, testing, launch, and support."
        path="/process"
      />
      <PageHero
        eyebrow="Process"
        title={<>A clear process.<br /><em>No mystery.</em></>}
        intro="Good work moves faster when responsibilities, feedback, and decisions are clear. Four stages keep everyone aligned from the first conversation to launch."
        primary={{ href: '/contact', label: 'Start a Project' }}
      />

      <section className="process-detail section" aria-label="Katch project process">
        <div className="process-detail-list shell">
          {processSteps.map((step) => (
            <article className="process-detail-step reveal" key={step.title}>
              <span>{step.number}</span>
              <div>
                <h2>{step.title}</h2>
                <p className="process-detail-summary">{step.summary}</p>
              </div>
              <div className="process-detail-copy">
                <p>{step.details}</p>
                <ul>
                  {step.deliverables.map((item) => (
                    <li key={item}><Check aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="expectations section section--dark" aria-labelledby="expectations-title">
        <div className="section-heading section-heading--light shell reveal">
          <div>
            <p className="eyebrow">Working together</p>
            <h2 id="expectations-title">What you can expect.</h2>
          </div>
          <p>No disappearing acts. No surprise handoffs. No waiting until the end to discover a problem.</p>
        </div>
        <div className="expectation-grid shell">
          {expectations.map(([title, copy], index) => (
            <article className="reveal" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <ClientCTA />
    </PageFrame>
  );
}
