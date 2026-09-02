import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenTerminal, onOpenResume, theme, onSetTheme, onToggleDrawer }) {
  const [scrolled, setScrolled] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themes = [
    { id: 'emerald', label: 'Emerald' },
    { id: 'neon', label: 'Cyber Neon' },
    { id: 'azure', label: 'Azure Blue' },
    { id: 'amber', label: 'Amber Gold' },
    { id: 'mono', label: 'Plain White & Black' }
  ];

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-brand-wrap">
        <a href="#hero" className="nav-logo">JISD<span className="dot">.</span></a>
      </div>
      
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#journey">Journey</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#mysql-hub">MySQL 100%</a></li>
        <li><a href="#arcade">Arcade</a></li>
        <li><a href="#certs">Certs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-actions">
        <div className="nav-status"><span className="pulse-dot"></span> Available</div>
        
        <button 
          className="nav-terminal-pill" 
          onClick={onOpenTerminal} 
          title="Open Interactive Terminal (Ctrl+K)"
        >
          <span>&gt;_ CLI</span>
          <kbd>Ctrl+K</kbd>
        </button>

        <div className="theme-picker-wrap">
          <button 
            className="nav-btn-icon" 
            onClick={() => setThemeMenuOpen(!themeMenuOpen)} 
            title="Switch Theme Palette"
          >
            🎨
          </button>
          {themeMenuOpen && (
            <div className="theme-menu show" id="theme-menu">
              {themes.map(t => (
                <button 
                  key={t.id} 
                  className={`theme-opt ${theme === t.id ? 'active' : ''}`}
                  onClick={() => { onSetTheme(t.id); setThemeMenuOpen(false); }}
                >
                  <span className={`theme-dot ${t.id}`}></span> {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button 
          className="nav-btn-icon" 
          onClick={onOpenResume} 
          title="View Resume / CV"
        >
          📄
        </button>

        <button 
          className="hamburger-btn" 
          onClick={onToggleDrawer} 
          aria-label="Toggle navigation menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
