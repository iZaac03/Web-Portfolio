import React from 'react';
import { playLofiKick, playLofiSnare, playLofiHiHat, playRhodesChord, playRockLead, playSubBass, chordDm9, chordG13, D5, D2 } from '../../utils/audioEngine';

export default function JamPad({ onToast }) {
  function triggerJam(type, label) {
    switch (type) {
      case 'kick': playLofiKick(true); break;
      case 'snare': playLofiSnare(true); break;
      case 'hat': playLofiHiHat(); break;
      case 'rhodes1': playRhodesChord(chordDm9, 1.4); break;
      case 'rhodes2': playRhodesChord(chordG13, 1.4); break;
      case 'lead1': playRockLead(D5, 0.4); break;
      case 'bassD': playSubBass(D2, 0.6); break;
    }
    onToast(label);
  }

  return (
    <div className="jam-bar">
      <button className="jam-key" onClick={() => triggerJam('kick', '🥁 Kick')}>
        <kbd>Q</kbd> Kick
      </button>
      <button className="jam-key" onClick={() => triggerJam('snare', '🥁 Snare')}>
        <kbd>W</kbd> Snare
      </button>
      <button className="jam-key" onClick={() => triggerJam('hat', '🥁 Hi-Hat')}>
        <kbd>E</kbd> Hat
      </button>
      <button className="jam-key" onClick={() => triggerJam('rhodes1', '☕ Dm9 Chord')}>
        <kbd>1</kbd> Dm9
      </button>
      <button className="jam-key" onClick={() => triggerJam('rhodes2', '☕ G13 Chord')}>
        <kbd>2</kbd> G13
      </button>
      <button className="jam-key" onClick={() => triggerJam('lead1', '🎸 Lead Solo')}>
        <kbd>3</kbd> Solo
      </button>
      <button className="jam-key" onClick={() => triggerJam('bassD', '🎸 Sub Bass')}>
        <kbd>A</kbd> Bass
      </button>
    </div>
  );
}
