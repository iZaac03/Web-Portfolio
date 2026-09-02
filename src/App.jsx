import React, { useState, useEffect, useRef } from 'react';
import { TRACK_MAP, getCurrentChapter } from './data/chapters';
import { 
  initAudioEngine, 
  setMasterVolume, 
  playRhodesChord, 
  playLofiKick, 
  playLofiSnare, 
  playLofiHiHat, 
  playRockLead, 
  playSubBass, 
  chordAbmaj9, 
  chordDm9, 
  chordG13, 
  D5, 
  D2 
} from './utils/audioEngine';

// Common & Layout
import CustomCursor from './components/common/CustomCursor';
import BackgroundCanvas from './components/common/BackgroundCanvas';
import Toast from './components/common/Toast';
import Navbar from './components/layout/Navbar';
import MobileDrawer from './components/layout/MobileDrawer';
import Footer from './components/layout/Footer';

// Sections
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import JourneySection from './components/sections/JourneySection';
import ProjectsSection from './components/sections/ProjectsSection';
import MysqlHubSection from './components/sections/MysqlHubSection';
import ArcadeSection from './components/sections/ArcadeSection';
import CertsSection from './components/sections/CertsSection';
import ContactSection from './components/sections/ContactSection';

// Audio HUD
import AudioHud from './components/audio/AudioHud';

// Modals
import TerminalModal from './components/modals/TerminalModal';
import ProfileModal from './components/modals/ProfileModal';
import ArchitectureModal from './components/modals/ArchitectureModal';
import ResumeModal from './components/modals/ResumeModal';
import CertLightboxModal from './components/modals/CertLightboxModal';

export default function App() {
  const [theme, setTheme] = useState('emerald');
  const [currentTrackKey, setCurrentTrackKey] = useState('mp3-lofi-girl');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(3874);
  const [volume, setVolState] = useState(0.85);

  // Modals
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [archModal, setArchModal] = useState({ open: false, tab: 'arch-overview' });
  const [lightbox, setLightbox] = useState({ open: false, src: '', title: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState({ message: '', visible: false });
  const toastTimerRef = useRef(null);

  const bgAudioRef = useRef(null);
  const synthTimerRef = useRef(null);
  const synthStepRef = useRef(0);
  const hasAutoStartedRef = useRef(false);

  const currentTrack = TRACK_MAP[currentTrackKey] || TRACK_MAP['mp3-lofi-girl'];

  function showToast(msg) {
    clearTimeout(toastTimerRef.current);
    setToast({ message: msg, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 2600);
  }

  function handleSetTheme(newTheme) {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    showToast(`🎨 Palette: ${newTheme.toUpperCase()}`);
  }

  function handleVolumeChange(newVol) {
    setVolState(newVol);
    setMasterVolume(newVol);
  }

  // Track playback
  function loadAndPlayTrack(trackKey, autoPlay = true) {
    const track = TRACK_MAP[trackKey] || TRACK_MAP['mp3-lofi-girl'];
    setCurrentTrackKey(trackKey);

    if (track.type === 'mp3') {
      clearTimeout(synthTimerRef.current);
      if (bgAudioRef.current) {
        if (!bgAudioRef.current.src.endsWith(track.src)) {
          bgAudioRef.current.src = track.src;
        }
        if (autoPlay) {
          initAudioEngine(bgAudioRef.current);
          bgAudioRef.current.play().then(() => {
            setIsPlaying(true);
            showToast(`▶ Playing: ${track.title}`);
          }).catch(err => {
            console.log('Autoplay pending click:', err);
          });
        }
      }
    } else {
      if (bgAudioRef.current) bgAudioRef.current.pause();
      if (autoPlay) {
        initAudioEngine(bgAudioRef.current);
        setIsPlaying(true);
        synthStepRef.current = 0;
        runSynthLoop();
        showToast(`▶ Playing Synthesizer: ${track.title}`);
      }
    }
  }

  function runSynthLoop() {
    playRhodesChord(chordAbmaj9, 1.6);
    playLofiKick(false);
    synthStepRef.current++;
    synthTimerRef.current = setTimeout(runSynthLoop, (60 / 76 / 2) * 1000);
  }

  function togglePlay() {
    initAudioEngine(bgAudioRef.current);
    if (isPlaying) {
      setIsPlaying(false);
      if (bgAudioRef.current) bgAudioRef.current.pause();
      clearTimeout(synthTimerRef.current);
      showToast('Audio Paused');
    } else {
      setIsPlaying(true);
      if (currentTrack.type === 'mp3') {
        bgAudioRef.current?.play();
      } else {
        runSynthLoop();
      }
      showToast(`▶ Playing: ${currentTrack.title}`);
    }
  }

  function skipSong(direction = 1) {
    initAudioEngine(bgAudioRef.current);
    if (currentTrack.type === 'mp3' && currentTrack.chapters) {
      const curTime = bgAudioRef.current ? bgAudioRef.current.currentTime : 0;
      const ch = getCurrentChapter(currentTrack.chapters, curTime);
      let targetIdx = 0;

      if (direction === 1) {
        targetIdx = ch ? ch.index + 1 : 0;
        if (targetIdx >= currentTrack.chapters.length) targetIdx = 0;
      } else {
        if (ch && curTime - ch.start > 3) {
          targetIdx = ch.index;
        } else {
          targetIdx = ch ? ch.index - 1 : 0;
          if (targetIdx < 0) targetIdx = currentTrack.chapters.length - 1;
        }
      }

      const nextCh = currentTrack.chapters[targetIdx];
      if (bgAudioRef.current) {
        bgAudioRef.current.currentTime = nextCh.start;
        if (!isPlaying) {
          bgAudioRef.current.play();
          setIsPlaying(true);
        }
      }
      showToast(`⏭ ${direction === 1 ? 'Next' : 'Previous'}: ${nextCh.title} — ${nextCh.artist}`);
    } else {
      const keys = Object.keys(TRACK_MAP);
      const curIdx = keys.indexOf(currentTrackKey);
      let nextIdx = (curIdx + direction) % keys.length;
      if (nextIdx < 0) nextIdx = keys.length - 1;
      loadAndPlayTrack(keys[nextIdx], true);
    }
  }

  function handleSeek(newTime) {
    initAudioEngine(bgAudioRef.current);
    if (bgAudioRef.current) {
      bgAudioRef.current.currentTime = newTime;
      if (!isPlaying) {
        bgAudioRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  // HTML5 Audio Time updates
  useEffect(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => audio.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  // Autoplay on load and user gesture
  useEffect(() => {
    const triggers = ['click', 'touchstart', 'scroll', 'keydown'];
    function startAutoAudio() {
      triggers.forEach(evt => window.removeEventListener(evt, startAutoAudio, { capture: true }));
      if (!hasAutoStartedRef.current) {
        hasAutoStartedRef.current = true;
        loadAndPlayTrack('mp3-lofi-girl', true);
      }
    }
    triggers.forEach(evt => window.addEventListener(evt, startAutoAudio, { capture: true, once: true }));
    return () => triggers.forEach(evt => window.removeEventListener(evt, startAutoAudio, { capture: true }));
  }, []);

  // Keyboard Shortcuts (Ctrl+K, Esc, Jam Keys)
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setTerminalOpen(false);
        setProfileOpen(false);
        setResumeOpen(false);
        setArchModal({ open: false, tab: 'arch-overview' });
        setLightbox({ open: false, src: '', title: '' });
        setDrawerOpen(false);
      }
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      const k = e.key.toUpperCase();
      if (k === 'Q') { playLofiKick(true); showToast('🥁 Kick'); }
      if (k === 'W') { playLofiSnare(true); showToast('🥁 Snare'); }
      if (k === 'E') { playLofiHiHat(); showToast('🥁 Hi-Hat'); }
      if (k === '1') { playRhodesChord(chordDm9, 1.4); showToast('☕ Dm9 Jazz Chord'); }
      if (k === '2') { playRhodesChord(chordG13, 1.4); showToast('☕ G13 Jazz Chord'); }
      if (k === '3') { playRockLead(D5, 0.4); showToast('🎸 Lead D5 Riff'); }
      if (k === 'A') { playSubBass(D2, 0.6); showToast('🎸 Warm Sub D2'); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <CustomCursor />
      <BackgroundCanvas />
      <Toast message={toast.message} visible={toast.visible} />

      {/* Hidden HTML5 Audio Element */}
      <audio 
        ref={bgAudioRef} 
        id="bg-audio" 
        src={currentTrack.type === 'mp3' ? currentTrack.src : '/audio/lofi-girl.mp3'} 
        preload="auto" 
        loop
      />

      {/* Navbar */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        theme={theme}
        onSetTheme={handleSetTheme}
        onToggleDrawer={() => setDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <HeroSection 
          onOpenProfile={() => setProfileOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })}
          isPlaying={isPlaying}
          currentMode={currentTrack.mode}
          onPlayTrack={(key) => loadAndPlayTrack(key, true)}
        />
        <AboutSection onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })} />
        <SkillsSection />
        <JourneySection onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })} />
        <ProjectsSection 
          onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <MysqlHubSection onToast={showToast} />
        <ArcadeSection onToast={showToast} />
        <CertsSection onOpenLightbox={(src, title) => setLightbox({ open: true, src, title })} />
        <ContactSection onToast={showToast} />
      </main>

      <Footer />

      {/* Floating Draggable Audio HUD */}
      <AudioHud 
        currentTrackKey={currentTrackKey}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onSelectTrack={(key) => loadAndPlayTrack(key, true)}
        onSkipSong={skipSong}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onToast={showToast}
      />

      {/* Modals */}
      <TerminalModal 
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenProfile={() => setProfileOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })}
        onPlayTrack={(key) => loadAndPlayTrack(key, true)}
        onSetVolume={handleVolumeChange}
        onSetTheme={handleSetTheme}
        onToast={showToast}
      />

      <ProfileModal 
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenArch={(tab) => setArchModal({ open: true, tab: tab || 'arch-overview' })}
        onToast={showToast}
      />

      <ArchitectureModal 
        open={archModal.open}
        initialTab={archModal.tab}
        onClose={() => setArchModal({ open: false, tab: 'arch-overview' })}
      />

      <ResumeModal 
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <CertLightboxModal 
        open={lightbox.open}
        imageSrc={lightbox.src}
        title={lightbox.title}
        onClose={() => setLightbox({ open: false, src: '', title: '' })}
      />
    </>
  );
}
