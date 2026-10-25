import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import LovePage from './pages/LovePage';

function getInitialUnlockState() {
  try { return sessionStorage.getItem('loveUnlocked') === 'true'; } catch { return false; }
}

export default function App() {
  const [unlocked, setUnlocked] = useState(getInitialUnlockState);
  const reducedMotion = useReducedMotion();
  const unlock = () => {
    try { sessionStorage.setItem('loveUnlocked', 'true'); } catch { /* navigation still works without storage */ }
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };
  const relock = () => {
    try { sessionStorage.removeItem('loveUnlocked'); } catch { /* storage is optional */ }
    setUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <AnimatePresence mode="wait">
      {unlocked ? (
        <motion.div key="love" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.45 }}>
          <LovePage onRelock={relock} />
        </motion.div>
      ) : (
        <motion.div key="login" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.35 }}>
          <LoginPage onUnlock={unlock} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
