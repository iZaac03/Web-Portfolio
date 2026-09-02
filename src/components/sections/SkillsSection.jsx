import React from 'react';

export default function SkillsSection() {
  const skills = [
    { name: 'HTML5', pct: '90%', featured: false },
    { name: 'CSS3 / Modern Responsive Design', pct: '90%', featured: false },
    { name: 'JavaScript (ES6+)', pct: '90%', featured: false },
    { name: 'PHP & Backend Architecture', pct: '90%', featured: false },
    { name: 'Python Automation', pct: '90%', featured: false },
    { name: 'Git & GitHub Workflow', pct: '90%', featured: false },
    { name: 'Laravel MVC Framework', pct: '90%', featured: false },
    { name: 'MySQL & Relational Design ⭐ Favorite', pct: '100%', featured: true }
  ];

  const domainTags = [
    'Systems Analysis',
    'ERD Relational Modeling',
    'DFD Level 0 & 1',
    'Use Case Specifications',
    'Data Normalization (3NF)',
    'RESTful APIs',
    'Java Fundamentals',
    'Blockchain Basics',
    'Web Audio Synth',
    'UI/UX Architecture'
  ];

  return (
    <section id="skills">
      <div className="section-label">02 — TECHNICAL STACK</div>
      <h2 className="section-title">Technical <em>Competencies</em></h2>

      <div className="skills-grid">
        {skills.map((s, idx) => (
          <div key={idx} className={`skill-item ${s.featured ? 'featured' : ''}`}>
            <div className="skill-header">
              <span className="skill-name">{s.name}</span>
              <span className="skill-pct">{s.pct}</span>
            </div>
            <div className="skill-bar">
              <div 
                className="skill-fill animate" 
                style={{ width: s.pct, '--w': s.pct }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="skills-tags">
        <h4>SYSTEMS ANALYSIS &amp; DOMAIN KNOWLEDGE:</h4>
        <div className="tag-row">
          {domainTags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
