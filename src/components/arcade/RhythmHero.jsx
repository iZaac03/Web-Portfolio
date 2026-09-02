import React, { useState, useEffect, useRef } from 'react';
import { playLofiKick, playLofiSnare, playLofiHiHat, playRhodesChord, playRockLead, chordDm9, chordG13, D5 } from '../../utils/audioEngine';

const RHYTHM_LANES = ['Q', 'W', 'E', '1', '2', '3'];
const LANE_COLORS = ['#ff0055', '#a78bfa', '#00ffb4', '#00c8ff', '#ffb703', '#ff6b35'];

export default function RhythmHero({ onToast }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [running, setRunning] = useState(false);
  const notesRef = useRef([]);
  const animRef = useRef(null);
  const spawnTimerRef = useRef(null);

  function triggerSound(laneIdx) {
    switch (laneIdx) {
      case 0: playLofiKick(true); break;
      case 1: playLofiSnare(true); break;
      case 2: playLofiHiHat(); break;
      case 3: playRhodesChord(chordDm9, 1.4); break;
      case 4: playRhodesChord(chordG13, 1.4); break;
      case 5: playRockLead(D5, 0.4); break;
    }
  }

  function spawnNote() {
    if (!running) return;
    const laneIdx = Math.floor(Math.random() * 6);
    notesRef.current.push({
      lane: laneIdx,
      y: 0,
      speed: 3.2,
      key: RHYTHM_LANES[laneIdx],
      color: LANE_COLORS[laneIdx],
      hit: false
    });
    spawnTimerRef.current = setTimeout(spawnNote, Math.random() * 600 + 400);
  }

  function handleHit(keyChar) {
    if (!running) return;
    const keyUpper = keyChar.toUpperCase();
    const laneIdx = RHYTHM_LANES.indexOf(keyUpper);
    if (laneIdx === -1) return;

    const targetY = 240;
    let hitNote = null;
    let minDiff = 999;

    notesRef.current.forEach(n => {
      if (n.lane === laneIdx && !n.hit) {
        const diff = Math.abs(n.y - targetY);
        if (diff < minDiff && diff < 55) {
          minDiff = diff;
          hitNote = n;
        }
      }
    });

    if (hitNote) {
      hitNote.hit = true;
      const pts = minDiff < 20 ? 100 : 50;
      setScore(s => s + pts);
      setStreak(st => {
        const nextSt = st + 1;
        onToast(`🎯 ${minDiff < 20 ? 'PERFECT! +100' : 'GOOD +50'} (Streak: ${nextSt}x)`);
        return nextSt;
      });
      triggerSound(laneIdx);
    }
  }

  function startGame() {
    notesRef.current = [];
    setScore(0);
    setStreak(0);
    setRunning(true);
    onToast('🎸 Rhythm Hero Started! Hit notes on the target line.');
  }

  useEffect(() => {
    if (running) {
      spawnNote();
    } else {
      clearTimeout(spawnTimerRef.current);
    }
    return () => clearTimeout(spawnTimerRef.current);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const laneW = 600 / 6;

    function renderLoop() {
      if (!running) {
        ctx.fillStyle = '#020508';
        ctx.fillRect(0, 0, 600, 300);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Press "Start Jam Game" to begin!', 300, 150);
        return;
      }

      ctx.fillStyle = '#020508';
      ctx.fillRect(0, 0, 600, 300);

      // Lanes
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.strokeRect(i * laneW, 0, laneW, 300);
      }

      // Target Line
      ctx.strokeStyle = 'rgba(0,255,180,0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 240);
      ctx.lineTo(600, 240);
      ctx.stroke();
      ctx.lineWidth = 1;

      // Notes
      for (let i = notesRef.current.length - 1; i >= 0; i--) {
        const n = notesRef.current[i];
        n.y += n.speed;

        if (!n.hit) {
          ctx.beginPath();
          ctx.arc(n.lane * laneW + laneW / 2, n.y, 16, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.stroke();
          ctx.fillStyle = '#000';
          ctx.font = 'bold 12px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.key, n.lane * laneW + laneW / 2, n.y);
        }

        if (n.y > 290 && !n.hit) {
          setStreak(0);
          notesRef.current.splice(i, 1);
        } else if (n.y > 300 || n.hit) {
          notesRef.current.splice(i, 1);
        }
      }

      animRef.current = requestAnimationFrame(renderLoop);
    }
    renderLoop();

    return () => cancelAnimationFrame(animRef.current);
  }, [running]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      handleHit(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [running]);

  return (
    <div className="arcade-game-view active">
      <div className="game-hud">
        <div className="hud-stat"><span>SCORE</span><strong>{score}</strong></div>
        <div className="hud-stat"><span>STREAK</span><strong>{streak}x</strong></div>
        <div className="hud-stat"><span>SONG</span><strong>Sweet Child Riff</strong></div>
        <button className="btn-primary" onClick={startGame}>
          {running ? '🔄 Restart Jam' : '🎮 Start Jam Game'}
        </button>
      </div>

      <div className="rhythm-stage">
        <canvas ref={canvasRef} width="600" height="300" id="rhythm-canvas" />
        <div className="rhythm-keys-overlay">
          {RHYTHM_LANES.map((k, idx) => (
            <div key={k} className="r-key" onClick={() => handleHit(k)}>
              <span>{k}</span>
              <small>{['Kick', 'Snare', 'Hat', 'Dm9', 'G13', 'Solo'][idx]}</small>
            </div>
          ))}
        </div>
      </div>
      <p className="game-instructions">Press keyboard keys (Q, W, E, 1, 2, 3) or click buttons as notes hit the target line!</p>
    </div>
  );
}
