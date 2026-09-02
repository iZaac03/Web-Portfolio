import React, { useState, useRef } from 'react';
import { formatTime, getCurrentChapter } from '../../data/chapters';

export default function TimelineScrubber({ track, currentTime, duration, onSeek, onToast }) {
  const [tooltip, setTooltip] = useState({ text: '', left: 0, visible: false });
  const trackRef = useRef(null);

  const total = duration || (track ? track.totalDuration : 1);
  const pct = Math.min(100, Math.max(0, (currentTime / total) * 100));
  const currentCh = track?.chapters ? getCurrentChapter(track.chapters, currentTime) : null;

  function handleTrackClick(e) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const clickPct = offsetX / rect.width;
    const newTime = clickPct * total;
    onSeek(newTime);
    const ch = track?.chapters ? getCurrentChapter(track.chapters, newTime) : null;
    onToast(`⏱ ${formatTime(newTime)}${ch ? ' • ' + ch.title : ''}`);
  }

  function handleMouseMove(e) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const hoverPct = offsetX / rect.width;
    const hoverTime = hoverPct * total;

    let text = formatTime(hoverTime);
    if (track?.chapters) {
      const ch = getCurrentChapter(track.chapters, hoverTime);
      if (ch) text = `${formatTime(hoverTime)} • ${ch.title} (${ch.artist})`;
    }
    setTooltip({
      text,
      left: Math.min(rect.width - 50, Math.max(40, offsetX)),
      visible: true
    });
  }

  return (
    <div className="audio-timeline-wrap">
      <div className="timeline-header">
        <span className="timeline-song-title">
          {currentCh ? `🎵 ${currentCh.title} — ${currentCh.artist} (${currentCh.index + 1}/${track.chapters.length})` : track.title}
        </span>
        <span className="timeline-time">
          {formatTime(currentTime)} / {formatTime(total)}
        </span>
      </div>

      <div 
        ref={trackRef}
        className="yt-timeline-track"
        onClick={handleTrackClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
      >
        <div className="yt-timeline-progress" style={{ width: `${pct}%` }}></div>
        <div className="yt-timeline-handle" style={{ left: `${pct}%` }}></div>
        <div className="yt-chapter-markers">
          {track?.chapters?.map((ch, idx) => {
            if (idx === 0) return null;
            const notchPct = (ch.start / total) * 100;
            return (
              <div 
                key={idx} 
                className="yt-chapter-notch" 
                style={{ left: `${notchPct}%` }}
                title={`${formatTime(ch.start)} — ${ch.title}`}
              />
            );
          })}
        </div>
      </div>

      {tooltip.visible && (
        <div className="yt-timeline-tooltip" style={{ left: `${tooltip.left}px`, opacity: 1 }}>
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
