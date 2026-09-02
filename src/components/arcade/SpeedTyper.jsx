import React, { useState, useEffect, useRef } from 'react';
import { TYPER_SNIPPETS } from '../../data/typeSnippets';
import { playKeyClickSound } from '../../utils/audioEngine';

export default function SpeedTyper({ onToast }) {
  const [category, setCategory] = useState('sql');
  const [targetText, setTargetText] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [acc, setAcc] = useState(100);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);

  function pickSnippet(cat = category) {
    clearInterval(timerRef.current);
    const list = TYPER_SNIPPETS[cat] || TYPER_SNIPPETS.sql;
    const chosen = list[Math.floor(Math.random() * list.length)];
    setTargetText(chosen);
    setTypedInput('');
    setTimeLeft(30);
    setStarted(false);
    setFinished(false);
    setErrors(0);
    setWpm(0);
    setAcc(100);
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  useEffect(() => {
    pickSnippet(category);
    return () => clearInterval(timerRef.current);
  }, [category]);

  function handleInputChange(e) {
    const val = e.target.value;
    if (finished) return;

    if (!started && val.length > 0) {
      setStarted(true);
      startTimeRef.current = performance.now();
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            endGame();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    playKeyClickSound();
    setTypedInput(val);

    // Calculate errors & stats
    let errCount = 0;
    let correctCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correctCount++;
      else errCount++;
    }
    setErrors(errCount);

    const elapsedMin = Math.max(0.04, (performance.now() - startTimeRef.current) / 1000 / 60);
    const currentWpm = Math.round((correctCount / 5) / elapsedMin);
    const currentAcc = val.length > 0 ? Math.round((correctCount / val.length) * 100) : 100;

    setWpm(currentWpm);
    setAcc(currentAcc);

    if (val.length >= targetText.length) {
      endGame();
    }
  }

  function endGame() {
    clearInterval(timerRef.current);
    setFinished(true);
    onToast(`⚡ Type Test Complete: ${wpm} WPM · Accuracy: ${acc}%`);
  }

  let rank = '🌱 Code Apprentice';
  if (wpm >= 85) rank = '🏆 Lead Systems Architect (Elite 85+ WPM)';
  else if (wpm >= 65) rank = '⚡ Senior Full-Stack Engineer (65-84 WPM)';
  else if (wpm >= 45) rank = '💻 Pro Developer (45-64 WPM)';

  return (
    <div className="arcade-game-view active">
      <div className="game-hud">
        <div className="hud-stat"><span>SPEED</span><strong>{wpm} WPM</strong></div>
        <div className="hud-stat"><span>ACCURACY</span><strong>{acc}%</strong></div>
        <div className="hud-stat"><span>TIME</span><strong>{timeLeft}s</strong></div>
        <div className="hud-stat"><span>ERRORS</span><strong>{errors}</strong></div>
        <button className="btn-primary" onClick={() => pickSnippet(category)}>
          🔄 New Snippet
        </button>
      </div>

      <div className="typer-container">
        <div className="typer-category-picker">
          <span>Snippet Category:</span>
          {[
            { id: 'sql', label: '🗄️ MySQL Query' },
            { id: 'laravel', label: '💻 Laravel / PHP' },
            { id: 'analyst', label: '📊 Systems Analysis' },
            { id: 'audio', label: '🎸 Rock & Web Audio' }
          ].map(c => (
            <button 
              key={c.id} 
              className={`typer-cat-chip ${category === c.id ? 'active' : ''}`}
              onClick={() => { setCategory(c.id); }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="typer-text-box" onClick={() => inputRef.current?.focus()}>
          {targetText.split('').map((char, idx) => {
            let cls = 'typer-char';
            if (idx < typedInput.length) {
              cls += typedInput[idx] === char ? ' correct' : ' incorrect';
            } else if (idx === typedInput.length) {
              cls += ' current';
            } else {
              cls += ' untyped';
            }
            return <span key={idx} className={cls}>{char}</span>;
          })}
        </div>

        <input 
          ref={inputRef}
          type="text" 
          value={typedInput}
          onChange={handleInputChange}
          disabled={finished}
          className="typer-input-bar" 
          autoComplete="off" 
          autoCorrect="off" 
          autoCapitalize="off" 
          spellCheck="false" 
          placeholder="Click here or start typing immediately..." 
        />

        {finished && (
          <div className="typer-feedback-card">
            <div className="typer-badge-rank">{rank}</div>
            <p id="typer-result-summary">
              Completed at {wpm} WPM with {acc}% accuracy ({errors} syntax error{errors === 1 ? '' : 's'}).
            </p>
          </div>
        )}
      </div>
      <p className="game-instructions">Type the code snippet as fast and accurately as possible. Includes mechanical keystroke audio!</p>
    </div>
  );
}
