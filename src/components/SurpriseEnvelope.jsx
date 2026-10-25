import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import HeartButton from './HeartButton';

export default function SurpriseEnvelope() {
  const [opened, setOpened] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const reducedMotion = useReducedMotion();
  const openGift = () => { setOpened(true); setCelebrationKey((value) => value + 1); };
  const continueToLetter = () => document.getElementById('letter')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  return (
    <div className={`surprise-stage ${opened ? 'surprise-open' : ''}`}>
      <div className="gift-illustration" aria-hidden="true">
        <motion.div className="gift-glow" animate={reducedMotion ? undefined : { scale: [1, 1.05, 1], opacity: [0.45, 0.7, 0.45] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.div className="gift-box" animate={reducedMotion ? undefined : opened ? { y: [0, -8, 0], rotate: [0, -3, 0] } : { y: [0, -5, 0] }} transition={opened ? { duration: 0.55 } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="gift-lid"><span className="gift-bow bow-left" /><span className="gift-bow bow-right" /><Heart size={17} fill="currentColor" /></div>
          <div className="gift-body"><span className="gift-ribbon" /><span className="gift-body-heart">♡</span></div>
        </motion.div>
        <span className="gift-spark gift-spark-one">✦</span><span className="gift-spark gift-spark-two">✧</span><span className="gift-spark gift-spark-three">·</span>
        {opened && <motion.div key={celebrationKey} className="celebration-burst" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 1.8], y: [6, -24, -42] }} transition={{ duration: reducedMotion ? 0 : 1.1 }}><span>♡</span><span>✦</span><span>♥</span><span>✧</span><span>♡</span></motion.div>}
      </div>
      <div className="surprise-copy">
        {!opened ? <>
          <span className="surprise-kicker"><Gift size={15} /> ONE LAST LITTLE SURPRISE</span>
          <h3>There is one more<br /><em>little thing for you…</em></h3>
          <p>A little gift, wrapped up with all the feelings that are sometimes hard to fit into words.</p>
          <HeartButton onClick={openGift}>Open Your Surprise</HeartButton>
        </> : <motion.div key="gift-message" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="surprise-kicker"><Sparkles size={15} /> A LITTLE NOTE JUST FOR YOU</span>
          <h3>Surprise, <em>my love.</em></h3>
          <p className="surprise-message">{loveConfig.surpriseMessage}</p>
          <HeartButton onClick={continueToLetter}>There's a letter for you, too</HeartButton>
        </motion.div>}
      </div>
    </div>
  );
}
