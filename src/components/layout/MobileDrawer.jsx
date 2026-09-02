import React from 'react';

export default function MobileDrawer({ open, onClose, onOpenResume, onOpenTerminal }) {
  if (!open) return null;

  return (
    <div className="mobile-drawer open" id="mobile-drawer">
      <div className="drawer-content">
        <div className="drawer-header">
          <span className="nav-logo">JISD<span className="dot">.</span></span>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <ul className="drawer-links">
          <li><a href="#about" className="drawer-link" onClick={onClose}>01 — About</a></li>
          <li><a href="#skills" className="drawer-link" onClick={onClose}>02 — Skills</a></li>
          <li><a href="#journey" className="drawer-link" onClick={onClose}>03 — Journey</a></li>
          <li><a href="#projects" className="drawer-link" onClick={onClose}>04 — Projects</a></li>
          <li><a href="#mysql-hub" className="drawer-link" onClick={onClose}>05 — MySQL 100%</a></li>
          <li><a href="#arcade" className="drawer-link" onClick={onClose}>06 — Cyber Arcade</a></li>
          <li><a href="#certs" className="drawer-link" onClick={onClose}>07 — Certifications</a></li>
          <li><a href="#contact" className="drawer-link" onClick={onClose}>08 — Contact</a></li>
        </ul>
        <div className="drawer-footer">
          <button className="btn-primary" onClick={() => { onClose(); onOpenResume(); }} style={{ width: '100%', justifyContent: 'center' }}>
            📄 View Resume / CV
          </button>
          <button className="btn-terminal" onClick={() => { onClose(); onOpenTerminal(); }} style={{ width: '100%', justifyContent: 'center' }}>
            &gt;_ Open Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
