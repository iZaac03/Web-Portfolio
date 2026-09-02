import React, { useState, useEffect, useRef } from 'react';
import { playLofiSnare } from '../../utils/audioEngine';

export default function BugCatcher({ onToast }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [running, setRunning] = useState(false);

  const snakeRef = useRef([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const bugRef = useRef({ x: 5, y: 5 });
  const intervalRef = useRef(null);

  function spawnBug() {
    bugRef.current = {
      x: Math.floor(Math.random() * 18) + 1,
      y: Math.floor(Math.random() * 18) + 1
    };
  }

  function startGame() {
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    setScore(0);
    spawnBug();
    setRunning(true);
    onToast('🐛 Bug Catcher Started! Catch green bugs.');
  }

  function end() {
    setRunning(false);
    clearInterval(intervalRef.current);
    onToast(`💥 Syntax Crash! Bugs Fixed: ${score}`);
  }

  function setDirection(d) {
    if (d === 'UP' && dirRef.current.y === 0) dirRef.current = { x: 0, y: -1 };
    if (d === 'DOWN' && dirRef.current.y === 0) dirRef.current = { x: 0, y: 1 };
    if (d === 'LEFT' && dirRef.current.x === 0) dirRef.current = { x: -1, y: 0 };
    if (d === 'RIGHT' && dirRef.current.x === 0) dirRef.current = { x: 1, y: 0 };
  }

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    intervalRef.current = setInterval(() => {
      const snake = snakeRef.current;
      const head = { x: snake[0].x + dirRef.current.x, y: snake[0].y + dirRef.current.y };

      // Wall collision
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        end();
        return;
      }
      // Self collision
      for (let seg of snake) {
        if (seg.x === head.x && seg.y === head.y) {
          end();
          return;
        }
      }

      snake.unshift(head);

      // Eat bug
      if (head.x === bugRef.current.x && head.y === bugRef.current.y) {
        setScore(s => {
          const next = s + 10;
          setHighScore(h => Math.max(h, next));
          return next;
        });
        spawnBug();
        playLofiSnare(false);
      } else {
        snake.pop();
      }

      // Draw
      ctx.fillStyle = '#03070b';
      ctx.fillRect(0, 0, 380, 380);

      // Bug
      ctx.fillStyle = '#00ffb4';
      ctx.beginPath();
      ctx.arc(bugRef.current.x * 19 + 9.5, bugRef.current.y * 19 + 9.5, 7, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((seg, idx) => {
        ctx.fillStyle = idx === 0 ? '#a78bfa' : '#38bdf8';
        ctx.fillRect(seg.x * 19 + 1, seg.y * 19 + 1, 17, 17);
      });
    }, 110);

    return () => clearInterval(intervalRef.current);
  }, [running, score]);

  useEffect(() => {
    const handleKey = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowUp' || e.key === 'w') setDirection('UP');
      if (e.key === 'ArrowDown' || e.key === 's') setDirection('DOWN');
      if (e.key === 'ArrowLeft' || e.key === 'a') setDirection('LEFT');
      if (e.key === 'ArrowRight' || e.key === 'd') setDirection('RIGHT');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="arcade-game-view active">
      <div className="game-hud">
        <div className="hud-stat"><span>BUGS FIXED</span><strong>{score}</strong></div>
        <div className="hud-stat"><span>HIGH SCORE</span><strong>{highScore}</strong></div>
        <button className="btn-primary" onClick={startGame}>
          {running ? '🔄 Restart' : '▶ Play Bug Catcher'}
        </button>
      </div>

      <div className="snake-stage">
        <canvas ref={canvasRef} width="380" height="380" id="snake-canvas" />
      </div>

      <div className="snake-touch-controls">
        <button className="d-pad up" onClick={() => setDirection('UP')}>▲</button>
        <div className="d-pad-row">
          <button className="d-pad left" onClick={() => setDirection('LEFT')}>◀</button>
          <button className="d-pad down" onClick={() => setDirection('DOWN')}>▼</button>
          <button className="d-pad right" onClick={() => setDirection('RIGHT')}>▶</button>
        </div>
      </div>
      <p className="game-instructions">Use Arrow Keys / WASD or D-Pad to catch bug fixes (🐛) and avoid syntax crash walls.</p>
    </div>
  );
}
