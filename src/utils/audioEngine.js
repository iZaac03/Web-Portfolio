let audioCtx = null;
let masterGain = null;
let bgAudioSource = null;
let currentVolume = 0.85;

export const chordAbmaj9 = [207.65, 261.63, 311.13, 392.00, 466.16];
export const chordDm9 = [146.83, 174.61, 220.00, 261.63, 329.63];
export const chordG13 = [98.00, 174.61, 246.94, 329.63, 440.00];
export const D5 = 587.33;
export const D2 = 73.42;

export function initAudioEngine(bgAudioElement) {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    if (bgAudioElement && !bgAudioSource) {
      try {
        bgAudioSource = audioCtx.createMediaElementSource(bgAudioElement);
        bgAudioSource.connect(masterGain);
      } catch (err) {
        console.warn('Audio element already connected or pending:', err);
      }
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return { audioCtx, masterGain };
}

export function getAudioContext() {
  return audioCtx;
}

export function setMasterVolume(vol) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
  }
}

export function getMasterVolume() {
  return currentVolume;
}

export function playRhodesChord(freqArray, dur = 1.6) {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  freqArray.forEach(freq => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(time);
    osc.stop(time + dur);
  });
}

export function playLofiKick(heavy = false) {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.setValueAtTime(heavy ? 130 : 110, time);
  osc.frequency.exponentialRampToValueAtTime(36, time + 0.18);
  gain.gain.setValueAtTime(heavy ? 0.6 : 0.45, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.22);
}

export function playLofiSnare(heavy = false) {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, time);
  osc.frequency.exponentialRampToValueAtTime(70, time + 0.1);
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.12);
}

export function playLofiHiHat() {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(6000, time);
  gain.gain.setValueAtTime(0.06, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.05);
}

export function playSubBass(freq, dur = 0.5) {
  if (!audioCtx || freq <= 0) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.35, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + dur);
}

export function playRockLead(freq, dur = 0.3) {
  if (!audioCtx || freq <= 0) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0.2, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + dur);
}

export function playKeyClickSound() {
  if (!audioCtx) return;
  const time = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800 + Math.random() * 200, time);
  gain.gain.setValueAtTime(0.04, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(time);
  osc.stop(time + 0.04);
}
