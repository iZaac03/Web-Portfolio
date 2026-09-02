import React from 'react';

export default function AboutSection() {
  return (
    <section id="about">
      <div className="section-label">01 — ABOUT ME</div>
      <h2 className="section-title">Developer.<br />Analyst. <em>Musician.</em></h2>
      
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm <strong>John Isaac Daumar</strong>, an Information Technology student at <strong>STI College Cagayan de Oro</strong> with a deep passion for building scalable web applications and analyzing complex system workflows.
          </p>
          <p>
            As the <strong>Systems Analyst</strong> for our senior capstone project, I bridge technical system design (ERDs, DFDs, use cases, database normalization) with actual business problem-solving.
          </p>
          <p>
            When I'm not architecting systems or writing code, you'll find me chilling to <strong>Lofi Girl MP3 background music</strong> or jamming on the <strong>electric guitar</strong> playing classic rock anthems from Guns N' Roses, Metallica, and Pink Floyd — music and engineering share the exact same rhythm of discipline and creativity.
          </p>

          <div className="about-stats">
            <div className="stat">
              <span className="stat-num">5+</span>
              <span className="stat-label">CERTIFICATIONS</span>
            </div>
            <div className="stat">
              <span className="stat-num">4+</span>
              <span className="stat-label">TECH EVENTS</span>
            </div>
            <div className="stat">
              <span className="stat-num">1</span>
              <span className="stat-label">CAPSTONE ANALYST</span>
            </div>
            <div className="stat">
              <span className="stat-num">2+ hrs</span>
              <span className="stat-label">MP3 MUSIC TRACKS</span>
            </div>
          </div>

          <div className="role-card">
            <div className="role-icon">⬡</div>
            <div>
              <strong>Systems Analyst Lead</strong>
              <p>Senior Capstone Project · STI College Cagayan de Oro</p>
            </div>
          </div>
        </div>

        <div className="about-role">
          <div className="info-card">
            <h4>PERSONAL INFORMATION</h4>
            <div className="info-row">
              <span className="info-key">LOCATION</span>
              <span>Puntod, Cagayan De Oro City, Philippines</span>
            </div>
            <div className="info-row">
              <span className="info-key">PHONE</span>
              <span>09167140570</span>
            </div>
            <div className="info-row">
              <span className="info-key">EMAIL</span>
              <span>isaacdaumar03@gmail.com</span>
            </div>
            <div className="info-row">
              <span className="info-key">ROLE</span>
              <span>Systems Analyst &amp; Developer</span>
            </div>
            <div className="info-row">
              <span className="info-key">SCHOOL</span>
              <span>STI College Cagayan de Oro</span>
            </div>
          </div>

          <div className="hobbies-card">
            <h4>HOBBIES &amp; CREATIVE PURSUITS</h4>
            <div className="hobby-tags">
              <span>☕ Lofi Girl × Secret Lair MP3</span>
              <span>⚡ Classic Rock 70s-90s MP3</span>
              <span>🎸 Electric Guitar Riffs</span>
              <span>🎵 Bass Guitar</span>
              <span>💻 Full-Stack Dev</span>
              <span>🔗 Blockchain</span>
              <span>🛠 Open Source</span>
              <span>🎧 Web Audio Synthesis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
