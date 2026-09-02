import React from 'react';

export default function JourneySection({ onOpenArch }) {
  const milestones = [
    {
      date: '2025 – Present',
      tag: 'Leadership Role',
      title: 'Systems Analyst Lead — Senior Capstone Project',
      org: 'STI College Cagayan de Oro',
      desc: 'Leading the architectural design, requirements matrix, ERDs, DFDs, and database normalization for our senior capstone solution.',
      hasButton: true
    },
    {
      date: 'June 17–19, 2025',
      tag: 'Industry Event',
      title: 'Bitskwela × DICT Blockchain Developer Event',
      org: 'Cagayan de Oro City',
      desc: 'Completed intensive training on distributed ledger concepts, smart contract architectures, and Web3 fundamentals.'
    },
    {
      date: 'April 5, 2025',
      tag: 'Developer Meetup',
      title: 'Devcon CDO × DICT Geek Up 2025',
      org: 'Devcon CDO',
      desc: 'Participated in developer workshops, networking sessions, and collaborative discussions on the future of Philippine tech.'
    },
    {
      date: 'April 3, 2025',
      tag: 'Technical Competition',
      title: 'GDSC Xavier Ateneo: CTRL+ALT+DELVE Into Code',
      org: 'Xavier University - Ateneo de Cagayan',
      desc: 'Engaged in rapid coding problem-solving challenges, algorithmic problem sets, and software engineering methodologies.'
    },
    {
      date: 'June 19, 2024',
      tag: 'Certification',
      title: 'Oracle Academy: Java Fundamentals Award',
      org: 'Oracle Academy',
      desc: 'Demonstrated proficiency in object-oriented programming, data structures, and algorithmic logic in Java.'
    }
  ];

  return (
    <section id="journey">
      <div className="section-label">03 — Career &amp; Milestones</div>
      <h2 className="section-title">Milestones &amp; <em>Journey</em></h2>
      
      <div className="timeline-container">
        {milestones.map((m, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-node"></div>
            <div className="timeline-card">
              <div className="timeline-meta">
                <span className="timeline-date">{m.date}</span>
                <span className="timeline-tag">{m.tag}</span>
              </div>
              <h3 className="timeline-title">{m.title}</h3>
              <div className="timeline-org">{m.org}</div>
              <p className="timeline-desc">{m.desc}</p>
              {m.hasButton && (
                <button className="btn-ghost-sm" onClick={() => onOpenArch('arch-overview')} style={{ marginTop: '0.8rem', display: 'inline-flex' }}>
                  📐 View Architecture Blueprints →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
