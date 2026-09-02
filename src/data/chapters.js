export const LOFI_GIRL_CHAPTERS = [
  { start: 0, title: "Aura", artist: "luv pug" },
  { start: 125, title: "Zephyr", artist: "Hazy Year" },
  { start: 289, title: "The Key", artist: "flowray" },
  { start: 447, title: "Artifact", artist: "little blue, Allem Iversom" },
  { start: 599, title: "Life", artist: "Klemsis" },
  { start: 750, title: "Second Chance", artist: "fnonose" },
  { start: 929, title: "Run Away Together", artist: "pepperonibeats" },
  { start: 1098, title: "Underground Sea", artist: "Mondo Loops" },
  { start: 1263, title: "Starblessed", artist: "No Spirit, Casiio" },
  { start: 1433, title: "Equator", artist: "towerz, quist" },
  { start: 1594, title: "Aetherbloom", artist: "Odd Panda" },
  { start: 1746, title: "Mycosynth Lattice", artist: "MyceliumBug" },
  { start: 1897, title: "Lost Alara", artist: "Beach Pomodoros" },
  { start: 2063, title: "Dear Yesterday", artist: "sleepermane" },
  { start: 2211, title: "The Balance of Mana", artist: "saint rumi, Shopan, Ian Ewing" },
  { start: 2369, title: "Black Lotus", artist: "marsquake" },
  { start: 2518, title: "Serra's Dream", artist: "cxlt., amies" },
  { start: 2716, title: "Weatherlight", artist: "ODYSSEE, L'Indécis" },
  { start: 2901, title: "Urza's Tower", artist: "Alto" },
  { start: 3082, title: "Slow Growth", artist: "steezy prime, Spaniel Mac" },
  { start: 3257, title: "Back To You", artist: "Thaehan" },
  { start: 3420, title: "So Simple", artist: "WYS" },
  { start: 3574, title: "Bumbleflower", artist: "takeo" },
  { start: 3726, title: "View From the Abbey", artist: "Kainbeats" }
];

export const CLASSIC_ROCK_CHAPTERS = [
  { start: 0, title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
  { start: 356, title: "Enter Sandman", artist: "Metallica" },
  { start: 688, title: "Back in Black", artist: "AC/DC" },
  { start: 940, title: "Highway to Hell", artist: "AC/DC" },
  { start: 1150, title: "Comfortably Numb", artist: "Pink Floyd" },
  { start: 1530, title: "Another Brick in the Wall", artist: "Pink Floyd" },
  { start: 1770, title: "Every Breath You Take", artist: "The Police" },
  { start: 2025, title: "Stairway to Heaven", artist: "Led Zeppelin" },
  { start: 2510, title: "Dream On", artist: "Aerosmith" },
  { start: 2795, title: "Smoke on the Water", artist: "Deep Purple" },
  { start: 3120, title: "Bohemian Rhapsody", artist: "Queen" },
  { start: 3480, title: "Hotel California", artist: "Eagles" },
  { start: 3870, title: "Nothing Else Matters", artist: "Metallica" },
  { start: 4250, title: "November Rain", artist: "Guns N' Roses" },
  { start: 4790, title: "Don't Cry", artist: "Guns N' Roses" },
  { start: 5080, title: "Paradise City", artist: "Guns N' Roses" },
  { start: 5490, title: "Thunderstruck", artist: "AC/DC" },
  { start: 5785, title: "Roxanne", artist: "The Police" },
  { start: 6010, title: "Wish You Were Here", artist: "Pink Floyd" }
];

export const TRACK_MAP = {
  'mp3-lofi-girl': {
    type: 'mp3',
    src: '/audio/lofi-girl.mp3',
    mode: 'lofi',
    title: '☕ Lofi Girl (MP3)',
    sub: 'Lofi Girl × Secret Lair',
    totalDuration: 3874,
    chapters: LOFI_GIRL_CHAPTERS,
    yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg'
  },
  'mp3-classic-rock': {
    type: 'mp3',
    src: '/audio/classic-rock.mp3',
    mode: 'rock',
    title: '🎸 Classic Rock (MP3)',
    sub: 'Classic Rock Legends 70s-90s',
    totalDuration: 6388,
    chapters: CLASSIC_ROCK_CHAPTERS,
    yt: 'https://www.youtube.com/watch?v=erfv9QasZAw'
  },
  'synth-sunset': { type: 'synth', bpm: 76, mode: 'lofi', title: '☕ Sunset Study', sub: '76 BPM · Warm Rhodes & Vinyl', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'synth-rain': { type: 'synth', bpm: 70, mode: 'lofi', title: '🌧 Rainy Night', sub: '70 BPM · Moody Neo-Soul', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'synth-midnight': { type: 'synth', bpm: 80, mode: 'lofi', title: '🌙 Midnight Code', sub: '80 BPM · Japanese City Lofi', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'synth-afternoon': { type: 'synth', bpm: 74, mode: 'lofi', title: '🍃 Afternoon Breeze', sub: '74 BPM · Acoustic Jazz', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'synth-galaxy': { type: 'synth', bpm: 66, mode: 'lofi', title: '🌌 Starry Sky', sub: '66 BPM · Dreamy Ambient', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'synth-golden': { type: 'synth', bpm: 84, mode: 'lofi', title: '🛹 Golden Hour', sub: '84 BPM · Bouncy Boombap', yt: 'https://www.youtube.com/watch?v=P12XxVMbYXg' },
  'sweet-child': { type: 'synth', bpm: 126, mode: 'rock', title: '🎸 Sweet Child O\' Mine', sub: 'Live Band Synthesizer Jam', yt: 'https://www.youtube.com/watch?v=erfv9QasZAw' }
};

export function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

export function getCurrentChapter(chapters, currentTime) {
  if (!chapters || chapters.length === 0) return null;
  for (let i = chapters.length - 1; i >= 0; i--) {
    if (currentTime >= chapters[i].start) {
      return { index: i, ...chapters[i] };
    }
  }
  return { index: 0, ...chapters[0] };
}
