import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Eye, EyeOff, Heart, LockKeyhole, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import BackgroundEffects from '../components/BackgroundEffects';
import GlassCard from '../components/GlassCard';
import HeartButton from '../components/HeartButton';

export default function LoginPage({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('A tiny secret stands between you and a little love.');
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => () => { window.clearTimeout(window.__loveUnlockTimeout); }, []);

  const submit = (event) => {
    event.preventDefault();
    if (unlocking) return;
    if (password === loveConfig.accessPassword) {
      setError(false);
      setUnlocking(true);
      setMessage(`Welcome to your little world, ${loveConfig.girlfriendName === 'GIRLFRIEND_NAME' ? 'beautiful' : loveConfig.girlfriendName} ♡`);
      window.__loveUnlockTimeout = window.setTimeout(() => onUnlock(), reducedMotion ? 20 : 900);
    } else {
      setError(true);
      setMessage('Not quite, my love. Try the little secret again. 💗');
      setPassword('');
    }
  };

  return (
    <main className={`login-screen ${unlocking ? 'is-unlocking' : ''}`}>
      <BackgroundEffects />
      <div className="login-topline"><span className="tiny-star">✧</span> A PRIVATE LITTLE UNIVERSE <span className="tiny-star">✧</span></div>
      <div className="login-layout">
        <motion.div
          className="login-art"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="art-overline"><Sparkles size={13} /> MADE WITH ALL MY HEART</div>
          <div className="heart-universe" aria-hidden="true">
            <span className="heart-orbit orbit-a" />
            <span className="heart-orbit orbit-b" />
            <span className="heart-orbit orbit-c" />
            <motion.div
              className="hero-heart"
              animate={reducedMotion ? undefined : unlocking ? { scale: [1, 1.18, 1.05], rotate: [0, -7, 0] } : { y: [0, -8, 0], rotate: [0, 2, 0] }}
              transition={unlocking ? { duration: 0.8 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="hero-heart-icon" fill="currentColor" strokeWidth={0.7} />
              <span className="heart-glimmer" />
            </motion.div>
            <span className="orbit-star star-a">✦</span><span className="orbit-star star-b">✧</span>
            <span className="orbit-star star-c">✦</span><span className="orbit-star star-d">·</span>
            <div className="art-caption"><span className="caption-rule" /> a world that begins with you</div>
          </div>
          <p className="login-art-note">Some things are too special for the whole world.<br />This one is just for you.</p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <GlassCard className="login-card">
            <div className="lock-medallion"><LockKeyhole size={19} strokeWidth={1.5} /></div>
            <p className="eyebrow">A LITTLE WORLD MADE JUST FOR YOU</p>
            <h1>Come a little<br /><em>closer, my love.</em></h1>
            <p className="login-description">Some places are special because of the person waiting inside.</p>
            <form onSubmit={submit} className="login-form">
              <label htmlFor="love-password">Your little secret</label>
              <div className={`password-wrap ${error ? 'has-error' : ''}`}>
                <input
                  id="love-password"
                  autoComplete="off"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => { setPassword(event.target.value); setError(false); }}
                  placeholder="Enter the secret word..."
                  aria-describedby="login-message"
                  required
                />
                <button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <HeartButton type="submit" className="login-submit" disabled={unlocking}>
                {unlocking ? 'Opening our little world…' : 'Unlock My Heart'}
              </HeartButton>
            </form>
            <motion.p id="login-message" className={`login-message ${error ? 'error-message' : ''}`} key={message} initial={reducedMotion ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
              <span>{error ? '♡' : '✧'}</span> {message}
            </motion.p>
            <div className="login-card-footer"><span>MADE WITH LOVE</span><Heart size={12} fill="currentColor" /><span>JUST FOR YOU</span></div>
          </GlassCard>
        </motion.div>
      </div>
      <p className="login-bottom-note">Take a breath. You're exactly where you're meant to be. ♡</p>
    </main>
  );
}
