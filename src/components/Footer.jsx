import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  ['Home', '/'],
  ['Work', '/work'],
  ['Services', '/services'],
  ['Process', '/process'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main shell">
        <div>
          <Link className="footer-brand" to="/" aria-label="Katch home">
            <img src="/katch-logo-sm.webp" srcSet="/katch-logo-sm.webp 262w, /katch-logo.webp 1310w" sizes="(max-width: 560px) 208px, 24vw" alt="Katch" width="1310" height="328" loading="lazy" />
          </Link>
          <p>Websites that make businesses impossible to ignore.</p>
        </div>
        <nav aria-label="Footer navigation">
          {links.map(([label, to]) => <Link to={to} key={label}>{label}</Link>)}
        </nav>
        <button className="back-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <ArrowUpRight aria-hidden="true" />
        </button>
      </div>
      <div className="footer-bottom shell">
        <p>© 2026 Katch. All rights reserved.</p>
        <p>Strategy · Design · Development</p>
      </div>
    </footer>
  );
}
