import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flower2, Heart, Sparkles } from 'lucide-react';

const icons = [Heart, Flower2, Sparkles];
export default function ReasonCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = icons[index % icons.length];
  const reducedMotion = useReducedMotion();
  return (
    <motion.button type="button" className={`reason-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((value) => !value)} aria-pressed={flipped} aria-label={`${flipped ? 'Hide' : 'Reveal'} reason: ${reason.front}`} whileHover={reducedMotion ? undefined : { y: -4 }}>
      <span className="reason-card-inner">
        <span className="reason-face reason-front"><span className="reason-number">0{index + 1}</span><span className="reason-icon"><Icon size={20} strokeWidth={1.5} /></span><strong>{reason.front}</strong><span className="reason-tap">tap to turn over <span>↗</span></span></span>
        <span className="reason-face reason-back"><span className="reason-back-heart"><Heart size={16} fill="currentColor" /></span><span>{reason.back}</span><em>a little reason, just for you</em></span>
      </span>
    </motion.button>
  );
}
