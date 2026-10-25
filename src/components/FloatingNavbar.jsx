import { useEffect, useState } from 'react';
import { ArrowUp, Heart, LockKeyhole, Music2, Pause, Play } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { asset, readStorage, writeStorage } from '../utils';

const links = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'story', label: 'Our story', icon: '♡' },
  { id: 'photos', label: 'Photos', icon: '✧' },
  { id: 'reasons', label: 'Reasons', icon: '♥' },
  { id: 'quotes', label: 'Quotes', icon: '❝' },
  { id: 'quiz', label: 'Love quiz', icon: '✿' },
  { id: 'surprise', label: 'Surprise', icon: '✦' },
  { id: 'letter', label: 'Love letter', icon: '✉' },
];

export default function FloatingNavbar({ onRelock }) {
  const [active, setActive] = useState('home');
  const [visitedSections, setVisitedSections] = useState(() => {
    const saved = readStorage('loveVisitedSections', ['home']);
    return Array.isArray(saved) ? saved.filter((id) => links.some((link) => link.id === id)) : ['home'];
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    try { return localStorage.getItem('loveMusicEnabled') === 'true'; } catch { return false; }
  });

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
      setShowTop(window.scrollY > 500);
      const marker = window.scrollY + window.innerHeight * 0.33;
      let currentSection = 'home';
      for (const item of [...links].reverse()) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= marker) { currentSection = item.id; break; }
      }
      setActive(currentSection);
      setVisitedSections((current) => {
        if (current.includes(currentSection)) return current;
        const next = [...current, currentSection];
        writeStorage('loveVisitedSections', next);
        return next;
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!loveConfig.music.enabled || !musicEnabled) return undefined;
    const audio = document.getElementById('love-background-audio');
    if (!audio) return undefined;
    audio.volume = 0.28;
    if (musicPlaying) {
      audio.play().catch(() => { setMusicPlaying(false); setMusicError(true); });
    } else {
      audio.pause();
    }
    return undefined;
  }, [musicPlaying, musicEnabled]);

  const toggleMusic = () => {
    if (musicPlaying) {
      setMusicPlaying(false);
      return;
    }
    setMusicEnabled(true);
    setMusicPlaying(true);
    try { localStorage.setItem('loveMusicEnabled', 'true'); } catch { /* preference is optional */ }
  };

  return (
    <>
      <div className="scroll-progress-track" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>
      <header className="floating-nav-wrap">
        <a className="nav-brand" href="#home" aria-label="Back to home" onClick={() => setActive('home')}>
          <span className="brand-icon"><Heart size={16} fill="currentColor" /></span>
          <span><strong>our little world</strong><small>just us, always</small></span>
        </a>
        <nav className="floating-nav" aria-label="Main navigation">
          {links.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={active === item.id ? 'active' : ''} onClick={() => setActive(item.id)}>
              <span className="nav-symbol" aria-hidden="true">{item.icon}</span><span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="nav-progress-counter" title={`${visitedSections.length} of ${links.length} chapters visited`} aria-label={`${visitedSections.length} of ${links.length} chapters visited`}>✧ {visitedSections.length}/{links.length}</span>
          {loveConfig.music.enabled && (
            <button className={`nav-icon-button ${musicPlaying ? 'music-active' : ''}`} onClick={toggleMusic} title={musicPlaying ? 'Pause music' : 'Play music'} aria-label={musicPlaying ? 'Pause music' : 'Play music'}>
              {musicPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
          )}
          <button className="nav-icon-button relock-button" onClick={onRelock} title="Relock this little world" aria-label="Relock this little world"><LockKeyhole size={15} /></button>
        </div>
      </header>
      {loveConfig.music.enabled && <audio id="love-background-audio" src={asset(loveConfig.music.src)} loop preload="none" onError={() => { setMusicError(true); setMusicPlaying(false); }} />}
      {musicError && <div className="music-error-note" role="status">Add your music file to <code>public/{loveConfig.music.src}</code> to play it.</div>}
      {showTop && <button className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={17} /></button>}
    </>
  );
}
