import { ButtonLink } from './Button';

export function PageHero({ eyebrow, title, intro, primary, secondary, compact = false, children }) {
  return (
    <header className={`page-hero ${compact ? 'page-hero--compact' : ''}`}>
      <div className="page-hero-inner shell">
        <p className="eyebrow">{eyebrow}</p>
        <div className="page-hero-grid">
          <h1>{title}</h1>
          <div className="page-hero-side">
            <p>{intro}</p>
            {(primary || secondary) && (
              <div className="page-hero-actions">
                {primary && <ButtonLink href={primary.href}>{primary.label}</ButtonLink>}
                {secondary && <ButtonLink href={secondary.href} variant="text">{secondary.label}</ButtonLink>}
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </header>
  );
}
