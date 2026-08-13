import { useEffect, useState } from 'react';
import { ArrowDownRight, Menu, X } from 'lucide-react';

const navItems = [
  ['Work', '#work'],
  ['Services', '#services'],
  ['Process', '#process'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="header-inner shell">
        <a className="brand" href="#top" aria-label="Katch home" onClick={closeMenu}>
          <img className="brand-logo" src="/katch-logo.webp" alt="Katch" width="1310" height="328" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a className="nav-cta" href="#contact">
          <span>Start a Project</span>
          <ArrowDownRight aria-hidden="true" size={16} />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="shell">
          {navItems.map(([label, href], index) => (
            <a key={label} href={href} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span>0{index + 1}</span>
              {label}
              <ArrowDownRight aria-hidden="true" />
            </a>
          ))}
          <a className="mobile-menu-cta" href="#contact" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
            Start a Project
            <ArrowDownRight aria-hidden="true" />
          </a>
        </nav>
        <p className="mobile-menu-note shell">Available for select projects · 2026</p>
      </div>
    </header>
  );
}
