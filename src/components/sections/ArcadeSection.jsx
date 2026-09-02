import React, { useState } from 'react';
import RhythmHero from '../arcade/RhythmHero';
import BugCatcher from '../arcade/BugCatcher';
import SystemsQuiz from '../arcade/SystemsQuiz';
import SpeedTyper from '../arcade/SpeedTyper';

export default function ArcadeSection({ onToast }) {
  const [activeGame, setActiveGame] = useState('rhythm');

  const games = [
    { id: 'rhythm', label: '🎸 1. Guitar Rhythm Hero' },
    { id: 'snake', label: '👾 2. Cyber Bug Catcher (Snake)' },
    { id: 'trivia', label: '🧠 3. Systems Analyst Quiz' },
    { id: 'typer', label: '⚡ 4. Developer Type Test' }
  ];

  return (
    <section id="arcade">
      <div className="section-label">06 — INTERACTIVE ENTERTAINMENT</div>
      <h2 className="section-title">Cyber <em>Arcade</em></h2>
      <p className="section-intro">Take a break from reviewing code and systems architecture! Enjoy 4 retro mini-games built with Vanilla JavaScript and Web Audio.</p>

      <div className="arcade-card">
        <div className="arcade-nav-tabs">
          {games.map(g => (
            <button 
              key={g.id}
              className={`arcade-tab-btn ${activeGame === g.id ? 'active' : ''}`}
              onClick={() => setActiveGame(g.id)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {activeGame === 'rhythm' && <RhythmHero onToast={onToast} />}
        {activeGame === 'snake' && <BugCatcher onToast={onToast} />}
        {activeGame === 'trivia' && <SystemsQuiz onToast={onToast} />}
        {activeGame === 'typer' && <SpeedTyper onToast={onToast} />}
      </div>
    </section>
  );
}
