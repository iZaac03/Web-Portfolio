import React from 'react';

export default function HeroSection({ onOpenProfile, onOpenResume, onOpenTerminal, isPlaying, currentMode, onPlayTrack }) {
  return (
    <section id="hero">
      <div className="hero-tag-wrap">
        <div className="hero-tag">
          <span className="pulse-dot"></span>
          sys.init → developer_mode
        </div>
        <button className="hero-tag-btn" onClick={onOpenTerminal}>
          &gt;_ Terminal Shell
        </button>
        <button 
          className={`hero-tag-btn ${currentMode === 'lofi' && isPlaying ? 'lofi-tag-active' : ''}`}
          onClick={() => onPlayTrack('mp3-lofi-girl')}
        >
          ☕ Lofi MP3: {currentMode === 'lofi' && isPlaying ? 'ON' : 'OFF'}
        </button>
        <button 
          className={`hero-tag-btn ${currentMode === 'rock' && isPlaying ? 'active' : ''}`}
          onClick={() => onPlayTrack('mp3-classic-rock')}
        >
          🎸 Rock Band: {currentMode === 'rock' && isPlaying ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-sub">FULL-STACK DEVELOPER &amp; SYSTEMS ANALYST</div>

          <h1 className="hero-name">
            John<br />
            Isaac<br />
            Samon<br />
            <em>Daumar</em>
          </h1>

          <p className="hero-desc">
            IT Student at STI College CDO · Capstone Systems Analyst · Guitarist &amp; Bass Player · Builder of robust web architectures and impactful digital solutions.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn-primary">Explore Projects →</a>
            <button className="btn-ghost" onClick={onOpenResume}>View Resume / CV</button>
            <a href="#contact" className="btn-ghost" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)' }}>Get in Touch</a>
          </div>
        </div>

        <div className="hero-right">
          <div 
            className="profile-frame" 
            id="profile-trigger" 
            title="Click to view full profile &amp; bio snapshot"
            onClick={onOpenProfile}
          >
            <div className="profile-ring"></div>
            <div className="profile-ring r2"></div>
            <img src="/images/Profile.jpg" alt="John Isaac Samon Daumar" className="profile-img" />
            <div className="profile-overlay">
              <span>🔍 Expand Portrait</span>
            </div>
          </div>

          <div className="hero-badges">
            <span className="badge">💻 Full-Stack Dev</span>
            <span className="badge">📊 Systems Analyst</span>
            <span className="badge">🎸 Lead &amp; Bass Guitar</span>
            <span className="badge" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>🗄️ MySQL 100%</span>
            <span className="badge">⚙️ Laravel / PHP</span>
          </div>
        </div>
      </div>

      <div className="ticker-wrap">
        <div className="ticker">
          <span>ANALYST ✦ STI COLLEGE CDO ✦ GUITARIST &amp; BASSIST ✦ LOFI GIRL MP3 BACKGROUND MUSIC ✦ CLASSIC ROCK 70S 80S 90S MP3 ✦ SWEET CHILD O MINE ✦ LARAVEL MVC ✦ MYSQL 100% MASTERY ✦ SYSTEMS BLUEPRINTS ✦ CAPSTONE LEAD</span>
          <span>ANALYST ✦ STI COLLEGE CDO ✦ GUITARIST &amp; BASSIST ✦ LOFI GIRL MP3 BACKGROUND MUSIC ✦ CLASSIC ROCK 70S 80S 90S MP3 ✦ SWEET CHILD O MINE ✦ LARAVEL MVC ✦ MYSQL 100% MASTERY ✦ SYSTEMS BLUEPRINTS ✦ CAPSTONE LEAD</span>
        </div>
      </div>
    </section>
  );
}
