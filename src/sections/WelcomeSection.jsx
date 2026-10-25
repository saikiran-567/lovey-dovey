import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import HeartButton from '../components/HeartButton';

export default function WelcomeSection() {
  const reducedMotion = useReducedMotion();
  const [heartNoteOpen, setHeartNoteOpen] = useState(false);
  const girlfriend = loveConfig.girlfriendName === 'GIRLFRIEND_NAME' ? 'Beautiful' : loveConfig.girlfriendName;
  const scrollToStory = () => document.getElementById('story')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  return (
    <section id="home" className="welcome-section page-section">
      <div className="welcome-copy">
        <motion.p className="eyebrow welcome-eyebrow" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <span className="tiny-star">✧</span> A SMALL UNIVERSE, JUST FOR US <span className="tiny-star">✧</span>
        </motion.p>
        <motion.h1 initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
          Hey, <em>{girlfriend}.</em><br /><span className="heading-second-line">You make life</span><br /><span className="heading-script">feel like poetry.</span>
        </motion.h1>
        <motion.p className="welcome-description" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.28 }}>
          {loveConfig.intro}
        </motion.p>
        <motion.div className="welcome-actions" initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}>
          <HeartButton onClick={scrollToStory}>Enter Our Little World</HeartButton>
          <span className="made-note"><Heart size={13} fill="currentColor" /> made with you in mind</span>
        </motion.div>
        <div className="welcome-signature"><span className="signature-line" /> <span>{loveConfig.welcomeNote}</span></div>
      </div>
      <motion.div className="welcome-visual" initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.16 }}>
        <div className="visual-halo halo-one" /><div className="visual-halo halo-two" />
        <div className="hero-art-card art-card-back"><span>♡</span><small>the little things</small></div>
        <div className="hero-art-card art-card-front"><div className="art-card-top"><span>for you, always</span><Sparkles size={14} /></div><button type="button" className={`art-heart-frame ${heartNoteOpen ? 'heart-note-open' : ''}`} aria-label="Reveal a little love note" aria-expanded={heartNoteOpen} onClick={() => setHeartNoteOpen((value) => !value)}><Heart fill="currentColor" strokeWidth={0.6} /><span className="heart-secret-note">{loveConfig.heartHoverMessage}</span></button><div className="art-card-bottom"><span>with love</span><span className="art-card-line" /></div></div>
        <motion.div className="floating-sticker sticker-one" animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [4, 0, 4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><Sparkles size={17} /><span>you are magic</span></motion.div>
        <motion.div className="floating-sticker sticker-two" animate={reducedMotion ? undefined : { y: [0, 7, 0], rotate: [-7, -3, -7] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><Heart size={15} fill="currentColor" /><span>my favorite</span></motion.div>
        <span className="visual-sparkle sparkle-one">✧</span><span className="visual-sparkle sparkle-two">✦</span><span className="visual-sparkle sparkle-three">·</span>
      </motion.div>
      <button className="welcome-scroll-hint" onClick={scrollToStory}><span>SCROLL INTO OUR STORY</span><ArrowDown size={15} /></button>
    </section>
  );
}
