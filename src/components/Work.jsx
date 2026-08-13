import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { projects } from '../data/projects';

function ProjectCard({ project, layout, onOpen }) {
  return (
    <article className={`project-card project-card--${layout} reveal`}>
      <div className="project-visual">
        <button type="button" onClick={() => onOpen(project)} aria-label={`Read the ${project.name} case study`}>
          <img
            src={project.image}
            srcSet={`${project.imageSmall} 760w, ${project.image} 1440w`}
            sizes={layout === 'wide' ? '(max-width: 820px) 90vw, 92vw' : '(max-width: 820px) 90vw, 46vw'}
            alt={project.imageAlt}
            width="1440"
            height="960"
            loading="lazy"
            decoding="async"
          />
          <span className="visual-action" aria-hidden="true">
            View case study <ArrowUpRight size={16} />
          </span>
        </button>
        <span className="project-number" aria-hidden="true">{project.number}</span>
      </div>
      <div className="project-card-body">
        <div className="project-card-heading">
          <p>{project.category}</p>
          <h3>
            <button type="button" onClick={() => onOpen(project)}>{project.name}</button>
          </h3>
        </div>
        <div className="project-card-copy">
          <p>{project.description}</p>
          <ul aria-label="Project capabilities">
            {project.capabilities.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-links">
            <button className="case-link" type="button" onClick={() => onOpen(project)}>
              View Case Study <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              View Live Website <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
    const closeButton = dialog.querySelector('.case-close');
    closeButton?.focus();
    return () => {
      document.documentElement.classList.remove('dialog-open');
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby={`case-${project.id}-title`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="case-shell">
        <header className="case-header">
          <button type="button" className="case-close" onClick={onClose}>
            <ArrowLeft aria-hidden="true" size={18} /> Back to work
          </button>
          <span>Katch / Selected Work</span>
          <button className="case-icon-close" type="button" onClick={onClose} aria-label="Close case study">
            <X aria-hidden="true" />
          </button>
        </header>

        <main className="case-content">
          <div className="case-intro">
            <div>
              <p className="eyebrow">{project.number} / {project.category}</p>
              <h2 id={`case-${project.id}-title`}>{project.name}</h2>
            </div>
            <div className="case-overview">
              <p>{project.description}</p>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                View Live Website <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
          </div>

          <figure className="case-hero-image">
            <img
              src={project.image}
              srcSet={`${project.imageSmall} 760w, ${project.image} 1440w`}
              sizes="(max-width: 820px) 92vw, 92vw"
              alt={project.imageAlt}
              width="1440"
              height="960"
            />
            <figcaption>Live website homepage / Desktop view</figcaption>
          </figure>

          <div className="case-facts">
            <div><span>Client industry</span><strong>{project.industry}</strong></div>
            <div><span>Scope</span><strong>Strategy, UI/UX, Development</strong></div>
            <div><span>Core capabilities</span><strong>{project.capabilities.join(', ')}</strong></div>
          </div>

          <section className="case-two-col" aria-labelledby={`challenge-${project.id}`}>
            <p className="case-section-label">01 / The challenge</p>
            <div>
              <h3 id={`challenge-${project.id}`}>Make the first click count.</h3>
              <p>{project.challenge}</p>
            </div>
          </section>

          <section className="case-two-col" aria-labelledby={`approach-${project.id}`}>
            <p className="case-section-label">02 / The approach</p>
            <div>
              <h3 id={`approach-${project.id}`}>Clarity before decoration.</h3>
              <p>{project.approach}</p>
            </div>
          </section>

          <section className="case-design-grid" aria-labelledby={`design-${project.id}`}>
            <div>
              <p className="case-section-label">03 / Design direction</p>
              <h3 id={`design-${project.id}`}>A visual system with a job to do.</h3>
              <p>{project.designDirection}</p>
            </div>
            <div className="case-feature-panel">
              <p>Key features</p>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={feature}><span>0{index + 1}</span>{feature}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="case-notes" aria-label="Responsive design and performance focus">
            <article>
              <span>Responsive design</span>
              <h3>Purpose-built for smaller screens.</h3>
              <p>{project.responsive}</p>
            </article>
            <article>
              <span>Performance focus</span>
              <h3>Visual quality without the drag.</h3>
              <p>{project.performance}</p>
            </article>
          </section>

          <section className="case-result">
            <p className="case-section-label">04 / Final result</p>
            <h3>{project.result}</h3>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Experience the live website <ArrowUpRight aria-hidden="true" />
            </a>
          </section>

          <div className="case-next">
            <p>Have a project in mind?</p>
            <a href="#contact" onClick={onClose}>Start a Project <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </main>
      </div>
    </dialog>
  );
}

export function Work() {
  const [selected, setSelected] = useState(() => {
    const id = new URLSearchParams(window.location.search).get('case');
    return projects.find((project) => project.id === id) || null;
  });

  useEffect(() => {
    const handlePopState = () => {
      const id = new URLSearchParams(window.location.search).get('case');
      setSelected(projects.find((project) => project.id === id) || null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openCase = (project) => {
    const url = new URL(window.location.href);
    url.searchParams.set('case', project.id);
    window.history.pushState({}, '', url);
    setSelected(project);
  };

  const closeCase = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('case');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setSelected(null);
  };

  return (
    <section className="work section" id="work" aria-labelledby="work-title">
      <div className="section-heading shell reveal">
        <div>
          <p className="eyebrow">Selected work / 2026</p>
          <h2 id="work-title">Selected Work</h2>
        </div>
        <p>Real websites. Built to solve real business problems.</p>
      </div>

      <div className="work-grid shell">
        <ProjectCard project={projects[0]} layout="wide" onOpen={openCase} />
        <ProjectCard project={projects[1]} layout="half" onOpen={openCase} />
        <ProjectCard project={projects[2]} layout="half" onOpen={openCase} />
        <ProjectCard project={projects[3]} layout="wide" onOpen={openCase} />
      </div>

      {selected && <CaseStudy project={selected} onClose={closeCase} />}
    </section>
  );
}
