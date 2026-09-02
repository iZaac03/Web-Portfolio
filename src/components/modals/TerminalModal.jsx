import React, { useState, useEffect, useRef } from 'react';

export default function TerminalModal({ 
  open, 
  onClose, 
  onOpenProfile, 
  onOpenResume, 
  onOpenArch, 
  onPlayTrack, 
  onSetVolume, 
  onSetTheme, 
  onToast 
}) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to JISD Interactive Terminal v2.0. Type <span class="highlight">help</span> to view available commands.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  function addLine(text, type = 'output') {
    setHistory(prev => [...prev, { type, text }]);
  }

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    addLine(`&gt; ${rawCmd}`, 'cmd');

    if (cmd.startsWith('volume ') || cmd.startsWith('vol ')) {
      const num = parseInt(cmd.split(' ')[1]);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        onSetVolume(num / 100);
        addLine(`Master volume set to: <span class="highlight">${num}%</span>`, 'output');
      } else {
        addLine(`Usage: volume &lt;0-100&gt; (e.g. volume 80)`, 'output');
      }
      return;
    }

    switch (cmd) {
      case 'help':
        addLine(`Available commands:<br/>
        • <span class="highlight">profile</span> / <span class="highlight">whoami</span> — Open Profile Snapshot &amp; Portrait<br/>
        • <span class="highlight">mysql</span> / <span class="highlight">sql</span> — Scroll to MySQL 100% Academy &amp; Sandbox<br/>
        • <span class="highlight">arcade</span> / <span class="highlight">games</span> — Open Cyber Arcade (Rhythm, Snake, Quiz, Type)<br/>
        • <span class="highlight">rhythm</span> — Launch Guitar Rhythm Hero Game<br/>
        • <span class="highlight">snake</span> — Launch Cyber Bug Catcher Snake Game<br/>
        • <span class="highlight">quiz</span> / <span class="highlight">trivia</span> — Start Systems Analyst Speed Quiz<br/>
        • <span class="highlight">typer</span> / <span class="highlight">type</span> — Launch Developer Speed Type Test<br/>
        • <span class="highlight">lofi</span> / <span class="highlight">lofi-girl</span> — Play Lofi Girl × Secret Lair MP3<br/>
        • <span class="highlight">rock</span> / <span class="highlight">classic-rock</span> — Play Classic Rock Legends MP3<br/>
        • <span class="highlight">sweet-child</span> — Play Sweet Child O' Mine Band Jam<br/>
        • <span class="highlight">volume &lt;0-100&gt;</span> — Adjust audio master volume<br/>
        • <span class="highlight">blueprints</span> — Open Capstone Systems Architecture Modal<br/>
        • <span class="highlight">certs</span> — Oracle, Bitskwela, Devcon credentials<br/>
        • <span class="highlight">resume</span> — Open formatted CV modal<br/>
        • <span class="highlight">theme &lt;emerald|neon|azure|amber&gt;</span> — Switch visual theme<br/>
        • <span class="highlight">sudo hire-isaac</span> — Recruiter priority protocol<br/>
        • <span class="highlight">clear</span> — Clear terminal screen<br/>
        • <span class="highlight">exit</span> — Close terminal modal`, 'output');
        break;

      case 'profile':
      case 'whoami':
        onClose();
        onOpenProfile();
        break;

      case 'mysql':
      case 'sql':
      case 'database':
      case 'sandbox':
        onClose();
        document.querySelector('#mysql-hub')?.scrollIntoView({ behavior: 'smooth' });
        onToast('🗄️ Navigated to MySQL 100% Academy & SQL Sandbox');
        break;

      case 'arcade':
      case 'games':
        onClose();
        document.querySelector('#arcade')?.scrollIntoView({ behavior: 'smooth' });
        onToast('🎮 Welcome to Cyber Arcade!');
        break;

      case 'lofi':
      case 'lofi-girl':
        onPlayTrack('mp3-lofi-girl');
        addLine(`Now Playing: <span class="highlight">☕ Lofi Girl × Secret Lair (Original MP3)</span>`, 'output');
        break;

      case 'rock':
      case 'classic-rock':
        onPlayTrack('mp3-classic-rock');
        addLine(`Now Playing: <span class="highlight">🎸 Classic Rock Legends 70s-90s Medley (Original MP3)</span>`, 'output');
        break;

      case 'blueprints':
      case 'architecture':
      case 'erd':
      case 'dfd':
        onClose();
        onOpenArch();
        break;

      case 'resume':
      case 'cv':
        onClose();
        onOpenResume();
        break;

      case 'theme emerald':
      case 'theme neon':
      case 'theme azure':
      case 'theme amber':
      case 'theme mono':
      case 'theme white':
      case 'theme black':
        const t = (cmd.includes('white') || cmd.includes('black')) ? 'mono' : cmd.split(' ')[1];
        onSetTheme(t);
        addLine(`Theme changed to <span class="highlight">${t === 'mono' ? 'PLAIN WHITE & BLACK' : t.toUpperCase()}</span>`, 'output');
        break;

      case 'sudo hire-isaac':
      case 'hire':
        addLine(`<span class="highlight">[ACCESS GRANTED: ROOT PRIORITY]</span><br/>Initiating recruiter channel to: isaacdaumar03@gmail.com`, 'system');
        setTimeout(() => {
          onClose();
          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 1200);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
      case 'quit':
        onClose();
        break;

      default:
        addLine(`Command not recognized: '${cmd}'. Type <span class="highlight">'help'</span> for reference.`, 'output');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const val = inputVal;
      setInputVal('');
      executeCommand(val);
    }
  }

  if (!open) return null;

  return (
    <div className="cyber-modal open" id="terminal-modal" onClick={(e) => { if (e.target.classList.contains('cyber-modal')) onClose(); }}>
      <div className="cyber-modal-box">
        <div className="cyber-modal-header">
          <div className="cyber-modal-title">
            <span className="pulse-dot"></span>
            <span>isaac@sti-cdo-capstone:~ (Interactive CLI)</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="terminal-body" ref={bodyRef}>
          <div className="terminal-history">
            {history.map((h, idx) => (
              <div 
                key={idx} 
                className={`terminal-line ${h.type}`}
                dangerouslySetInnerHTML={{ __html: h.text }}
              />
            ))}
          </div>
          <div className="terminal-input-row">
            <span className="terminal-prompt">isaac@sti:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoFocus 
            />
          </div>
        </div>

        <div className="terminal-quick-cmds">
          <span>Quick Commands:</span>
          <button className="terminal-chip" onClick={() => executeCommand('help')}>help</button>
          <button className="terminal-chip" onClick={() => executeCommand('profile')}>profile</button>
          <button className="terminal-chip" onClick={() => executeCommand('mysql')}>mysql</button>
          <button className="terminal-chip" onClick={() => executeCommand('arcade')}>arcade</button>
          <button className="terminal-chip" onClick={() => executeCommand('lofi')}>lofi</button>
          <button className="terminal-chip" onClick={() => executeCommand('rock')}>rock</button>
          <button className="terminal-chip" onClick={() => executeCommand('blueprints')}>blueprints</button>
          <button className="terminal-chip" onClick={() => executeCommand('resume')}>resume</button>
          <button className="terminal-chip" onClick={() => executeCommand('sudo hire-isaac')}>sudo hire-isaac</button>
        </div>
      </div>
    </div>
  );
}
