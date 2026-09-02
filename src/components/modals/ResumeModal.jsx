import React from 'react';

export default function ResumeModal({ open, onClose }) {
  if (!open) return null;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="cyber-modal open" onClick={(e) => { if (e.target.classList.contains('cyber-modal')) onClose(); }}>
      <div className="cyber-modal-box" style={{ maxWidth: '840px' }}>
        <div className="cyber-modal-header">
          <div className="cyber-modal-title">
            <span className="pulse-dot"></span>
            <span>Curriculum Vitae / Resume — John Isaac Samon Daumar</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button className="btn-ghost-sm" onClick={handlePrint} style={{ padding: '0.35rem 0.8rem', fontSize: '0.75rem' }}>🖨️ Print / Save PDF</button>
            <button className="modal-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="resume-body">
          <div className="resume-header">
            <div>
              <h1 className="resume-name">JOHN ISAAC SAMON DAUMAR</h1>
              <p className="resume-title">Full-Stack Developer &amp; Systems Analyst Lead</p>
            </div>
            <div className="resume-contact-pills">
              <span>✉ isaacdaumar03@gmail.com</span>
              <span>☏ 09167140570</span>
              <span>◎ Puntod, Cagayan de Oro City, Philippines</span>
              <span>🌐 github.com/iZaac03</span>
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">PROFESSIONAL SUMMARY</h3>
            <p style={{ lineHeight: '1.7', color: 'var(--text-muted)' }}>
              Senior Information Technology student at STI College Cagayan de Oro serving as Senior Capstone Systems Analyst Lead. 
              Proficient in relational database engineering (MySQL 100%), full-stack web development (Laravel, PHP, JavaScript), 
              conceptual modeling (ERD, DFD), and requirements engineering.
            </p>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">EDUCATION</h3>
            <div className="resume-item">
              <div className="resume-item-top">
                <strong>Bachelor of Science in Information Technology (BSIT)</strong>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>2022 – 2026</span>
              </div>
              <div className="resume-item-sub">STI College Cagayan de Oro · Cagayan de Oro City, Philippines</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                • Systems Analyst Lead for Senior Capstone Development Team.<br/>
                • Specialization in Advanced Database Systems, Systems Analysis &amp; Design, and Full-Stack Web Development.
              </p>
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">TECHNICAL EXPERTISE</h3>
            <div className="resume-skills-list">
              <span>MySQL 8.0 (100% Mastery)</span>
              <span>3NF Normalization</span>
              <span>ERD Modeling</span>
              <span>DFD Levels 0 &amp; 1</span>
              <span>Laravel / PHP</span>
              <span>React 18 &amp; Vite</span>
              <span>JavaScript (ES6+)</span>
              <span>Web Audio API</span>
              <span>Java (Oracle Certified)</span>
              <span>Python Automation</span>
            </div>
          </div>

          <div className="resume-section">
            <h3 className="resume-section-title">CERTIFICATIONS &amp; INDUSTRY RECOGNITION</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div>• <strong>Oracle Academy:</strong> Java Fundamentals Award of Course Completion (June 2024)</div>
              <div>• <strong>Bitskwela × DICT:</strong> Blockchain Developer Intensive Attendance (June 2025)</div>
              <div>• <strong>Devcon CDO × DICT:</strong> Geek Up 2025 Certificate of Appreciation (April 2025)</div>
              <div>• <strong>GDSC Xavier Ateneo:</strong> CTRL+ALT+DELVE Into Code Participation (April 2025)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
