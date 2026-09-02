import React, { useState, useEffect, useRef } from 'react';
import { TRACK_MAP, getCurrentChapter } from '../../data/chapters';
import TimelineScrubber from './TimelineScrubber';
import JamPad from './JamPad';

export default function AudioHud({ 
  currentTrackKey, 
  isPlaying, 
  onTogglePlay, 
  onSelectTrack, 
  onSkipSong, 
  currentTime, 
  duration, 
  onSeek, 
  volume, 
  onVolumeChange, 
  onToast 
}) {
  const [jamOpen, setJamOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [pos, setPos] = useState(null); // null means default CSS positioning
  const [isMuted, setIsMuted] = useState(false);
  const [prevVol, setPrevVol] = useState(0.85);

  const hudRef = useRef(null);
  const vizCanvasRef = useRef(null);
  const dragStartRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const currentTrack = TRACK_MAP[currentTrackKey] || TRACK_MAP['mp3-lofi-girl'];
  const currentCh = currentTrack.chapters ? getCurrentChapter(currentTrack.chapters, currentTime) : null;

  // Draggable physics
  function handleDragStart(e) {
    const target = e.target;
    if (['BUTTON', 'SELECT', 'INPUT', 'OPTION', 'A'].includes(target.tagName) ||
        target.closest('.hud-min-btn') ||
        target.closest('.yt-timeline-track') ||
        target.closest('.volume-wrap') ||
        target.closest('.jam-bar') ||
        target.closest('.audio-select') ||
        target.closest('.playback-controls') ||
        target.closest('.audio-mode-tabs')) {
      return;
    }

    setIsDragging(true);
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const rect = hudRef.current.getBoundingClientRect();
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initX: rect.left,
      initY: rect.top
    };

    if (e.type.startsWith('touch')) {
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    } else {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
    }
  }

  function handleDragMove(e) {
    if (e.cancelable && e.type.startsWith('touch')) e.preventDefault();
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragStartRef.current.startX;
    const dy = clientY - dragStartRef.current.startY;

    const hudW = hudRef.current?.offsetWidth || 390;
    const hudH = hudRef.current?.offsetHeight || 160;

    const newX = Math.max(12, Math.min(dragStartRef.current.initX + dx, window.innerWidth - hudW - 12));
    const newY = Math.max(12, Math.min(dragStartRef.current.initY + dy, window.innerHeight - hudH - 12));

    setPos({ x: newX, y: newY });
  }

  function handleDragEnd() {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
  }

  // 5-bar Spectrum Visualizer
  useEffect(() => {
    const canvas = vizCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function renderViz() {
      ctx.clearRect(0, 0, 50, 20);
      const themeColor = currentTrack.mode === 'lofi' ? '#a78bfa' : '#00ffb4';
      ctx.fillStyle = isPlaying ? themeColor : 'rgba(255,255,255,0.15)';

      for (let i = 0; i < 5; i++) {
        const h = isPlaying ? Math.random() * (currentTrack.mode === 'lofi' ? 12 : 16) + 3 : 2;
        ctx.fillRect(i * 10 + 1, 20 - h, 7, h);
      }
      animId = requestAnimationFrame(renderViz);
    }
    renderViz();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTrack.mode, isMinimized]);

  function toggleMute() {
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange(prevVol);
    } else {
      setPrevVol(volume);
      setIsMuted(true);
      onVolumeChange(0);
    }
  }

  const dynamicStyle = pos
    ? { left: `${pos.x}px`, top: `${pos.y}px`, bottom: 'auto', right: 'auto' }
    : { bottom: '32px', left: '32px', right: 'auto', top: 'auto' };

  return (
    <div 
      ref={hudRef}
      className={`audio-hud ${isDragging ? 'is-dragging' : ''} ${isMinimized ? 'is-minimized' : ''}`}
      style={dynamicStyle}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Drag Bar & Minimize Button */}
      <div className="audio-hud-drag-bar" title="Drag to move player">
        <span className="drag-grip">⋮⋮</span>
        <span className="drag-label">{isMinimized ? 'PLAYER (MINI)' : 'DRAG TO MOVE PLAYER'}</span>
        <button 
          className="hud-min-btn" 
          onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
          title={isMinimized ? "Expand Music Player" : "Minimize Music Player"}
        >
          {isMinimized ? '▢' : '─'}
        </button>
      </div>

      {/* MINIMIZED VIEW: Compact Floating Mini Bar */}
      {isMinimized ? (
        <div className="audio-hud-mini-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flex: 1, overflow: 'hidden' }}>
            <button 
              className={`audio-btn ${currentTrack.mode === 'lofi' ? 'lofi-mode' : ''}`} 
              style={{ width: '30px', height: '30px', fontSize: '0.75rem' }}
              onClick={onTogglePlay} 
              title="Toggle Audio"
            >
              {isPlaying ? '■' : '▶'}
            </button>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text)' }}>
                {currentTrack.title}
              </div>
              <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {currentCh ? `${currentCh.title} (${currentCh.artist})` : currentTrack.sub}
              </div>
            </div>
          </div>
          <button className="track-skip-btn" onClick={() => onSkipSong(1)} title="Next Song (⏭)">⏭</button>
        </div>
      ) : (
        /* EXPANDED FULL VIEW */
        <>
          {/* Top Row: Skip, Play, Title & Mode Tabs */}
          <div className="audio-hud-main">
            <div className="playback-controls">
              <button className="track-skip-btn" onClick={() => onSkipSong(-1)} title="Previous Song (⏮)">⏮</button>
              <button 
                className={`audio-btn ${currentTrack.mode === 'lofi' ? 'lofi-mode' : ''}`} 
                onClick={onTogglePlay} 
                title="Toggle Audio"
              >
                {isPlaying ? '■' : '▶'}
              </button>
              <button className="track-skip-btn" onClick={() => onSkipSong(1)} title="Next Song (⏭)">⏭</button>
            </div>

            <div className="audio-info">
              <span className="audio-title">
                {currentTrack.title}
                {isPlaying && <span className={`pulse-dot ${currentTrack.mode === 'lofi' ? 'lofi-pulse' : ''}`} style={{ display: 'inline-block' }}></span>}
              </span>
              <span className={`audio-sub ${currentTrack.mode === 'lofi' ? 'lofi-text' : ''}`}>
                {currentCh ? `${currentCh.title} — ${currentCh.artist}` : currentTrack.sub}
              </span>
            </div>

            <div className="audio-mode-tabs">
              <button 
                className={`audio-mode-btn ${currentTrack.mode === 'lofi' ? 'active lofi-active' : ''}`}
                onClick={() => onSelectTrack('mp3-lofi-girl')}
              >
                ☕ Lofi
              </button>
              <button 
                className={`audio-mode-btn ${currentTrack.mode === 'rock' ? 'active' : ''}`}
                onClick={() => onSelectTrack('mp3-classic-rock')}
              >
                🎸 Rock
              </button>
            </div>
          </div>

          {/* Track Selector Dropdown */}
          <select 
            className="audio-select" 
            value={currentTrackKey} 
            onChange={(e) => onSelectTrack(e.target.value)}
          >
            <optgroup label="☕ Real MP3 Audio Tracks (From YouTube)">
              <option value="mp3-lofi-girl">☕ Lofi Girl × Secret Lair — Beats to Cast (Original MP3)</option>
              <option value="mp3-classic-rock">🎸 Classic Rock Legends 70s-90s Medley (Original MP3)</option>
            </optgroup>
            <optgroup label="🎹 Live Synthesized Beats">
              <option value="synth-sunset">☕ Sunset Study in CDO (Warm Rhodes &amp; Vinyl)</option>
              <option value="synth-rain">🌧 Rainy Night in Puntod (Moody Neo-Soul)</option>
              <option value="synth-midnight">🌙 Midnight Code &amp; Coffee (Japanese City Lofi)</option>
              <option value="synth-afternoon">🍃 Afternoon Breeze in CDO (Acoustic Jazz)</option>
              <option value="synth-galaxy">🌌 Starry Sky Over Xavier (Dreamy Ambient)</option>
              <option value="synth-golden">🛹 Golden Hour Groove (Bouncy Boombap)</option>
              <option value="sweet-child">🎸 Sweet Child O' Mine (Live Rock Band)</option>
            </optgroup>
          </select>

          {/* YouTube Chapter Timeline & Scrubber */}
          {currentTrack.type === 'mp3' && currentTrack.chapters && (
            <TimelineScrubber 
              track={currentTrack}
              currentTime={currentTime}
              duration={duration}
              onSeek={onSeek}
              onToast={onToast}
            />
          )}

          {/* Bottom Controls */}
          <div className="audio-bottom-row">
            <div className="volume-wrap">
              <button className="volume-icon-btn" onClick={toggleMute} title="Mute/Unmute">
                {isMuted || volume === 0 ? '🔇' : (volume < 0.5 ? '🔉' : '🔊')}
              </button>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={isMuted ? 0 : volume}
                onChange={(e) => { setIsMuted(false); onVolumeChange(parseFloat(e.target.value)); }}
                className="volume-slider" 
              />
            </div>

            {currentTrack.yt && (
              <a href={currentTrack.yt} target="_blank" rel="noopener noreferrer" className="yt-link-btn">
                ▶ YT
              </a>
            )}

            <button 
              className={`jam-btn-pill ${jamOpen ? 'active' : ''}`}
              onClick={() => setJamOpen(!jamOpen)}
            >
              🎹 Jam
            </button>

            <canvas ref={vizCanvasRef} width="50" height="20" className="audio-visualizer" />
          </div>

          {/* Jam Pad Keys */}
          {jamOpen && <JamPad onToast={onToast} />}
        </>
      )}
    </div>
  );
}
