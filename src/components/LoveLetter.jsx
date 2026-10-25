import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, Maximize2, Minimize2, Printer, RefreshCw, X } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import HeartButton from './HeartButton';

function readableName(value, fallback) {
  return !value || value === 'GIRLFRIEND_NAME' || value === 'MY_NAME' ? fallback : value;
}

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const recipient = readableName(loveConfig.girlfriendName, 'my favorite person');
  const signature = readableName(loveConfig.signature || loveConfig.yourName, 'someone who loves you very much');
  useEffect(() => () => window.clearTimeout(timerRef.current), []);
  const finishOpening = () => {
    setAnimationKey((value) => value + 1);
    setOpened(true);
    setOpening(false);
  };
  const openLetter = () => {
    if (opening) return;
    setOpening(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(finishOpening, reducedMotion ? 20 : 740);
  };
  const foldLetter = () => {
    window.clearTimeout(timerRef.current);
    setOpened(false); setOpening(false); setEnlarged(false);
  };
  const replayOpening = () => {
    window.clearTimeout(timerRef.current);
    setOpened(false); setEnlarged(false); setOpening(false);
    if (reducedMotion) { finishOpening(); return; }
    timerRef.current = window.setTimeout(() => {
      setOpening(true);
      timerRef.current = window.setTimeout(finishOpening, 740);
    }, 600);
  };
  const printLetter = () => window.print();

  return (
    <div className={`love-letter-experience ${opened ? 'letter-is-open' : ''} ${opening ? 'envelope-opening' : ''} ${enlarged ? 'letter-is-enlarged' : ''}`}>
      <div className="letter-ambient-glow" />
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div key="closed-envelope" className="envelope-intro" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: reducedMotion ? 0 : 0.35 }}>
            <div className="envelope-art" aria-hidden="true">
              <div className="envelope-shadow" />
              <div className="envelope-back" />
              <div className="envelope-letter-teaser"><span>my love,</span><i>there are so many things…</i></div>
              <div className="envelope-front"><span className="envelope-fold-left" /><span className="envelope-fold-right" /><span className="envelope-fold-bottom" /></div>
              <div className="envelope-flap"><span /></div>
              <div className="wax-seal"><Heart size={22} fill="currentColor" strokeWidth={0.8} /></div>
              <span className="envelope-gold-dot gold-dot-one" /><span className="envelope-gold-dot gold-dot-two" />
            </div>
            <p className="eyebrow">SOMETHING I WANTED YOU TO KEEP</p>
            <h3>One last thing,<br /><em>my love…</em></h3>
            <p className="envelope-subtitle">A letter from my heart to yours.</p>
            <HeartButton onClick={openLetter} disabled={opening}>{opening ? 'Opening your letter…' : 'Open My Heart'}</HeartButton>
          </motion.div>
        ) : (
          <motion.div key={`opened-letter-${animationKey}`} className="opened-letter-wrap" initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: 'easeOut' }}>
            <article className={`letter-paper ${enlarged ? 'letter-paper-large' : ''}`}>
              <div className="paper-corner corner-top-left" /><div className="paper-corner corner-top-right" /><div className="paper-corner corner-bottom-left" /><div className="paper-corner corner-bottom-right" />
              <div className="letter-paper-top"><span className="letter-paper-monogram"><Heart size={15} fill="currentColor" /></span><span>SEALED WITH LOVE</span><span className="letter-date">{loveConfig.letterDate}</span></div>
              <div className="letter-divider"><span /><Heart size={11} fill="currentColor" /><span /></div>
              <p className="letter-greeting">{loveConfig.letterGreeting}</p>
              <h3 className="letter-recipient">{recipient},</h3>
              <div className="letter-body-copy">{loveConfig.letterBody.map((paragraph, index) => <p key={`${animationKey}-${index}`}>{paragraph}</p>)}</div>
              <p className="letter-closing">With all my love,</p>
              <p className="letter-signature">{signature}</p>
              <div className="letter-bottom-heart"><span /><Heart size={17} fill="currentColor" /><span /></div>
            </article>
            <div className="letter-actions no-print">
              <button type="button" className="soft-action" onClick={() => setEnlarged((value) => !value)}>{enlarged ? <Minimize2 size={15} /> : <Maximize2 size={15} />}{enlarged ? 'Make it smaller' : 'Read it a little larger'}</button>
              <button type="button" className="soft-action" onClick={printLetter}><Printer size={15} /> Print this letter</button>
              <button type="button" className="soft-action" onClick={replayOpening}><RefreshCw size={15} /> Replay the opening</button>
              <button type="button" className="soft-action" onClick={foldLetter}><X size={15} /> Fold it up</button>
            </div>
            <div className="read-again-wrap no-print"><HeartButton onClick={replayOpening}>Read It Again, My Love</HeartButton><p>Keep this little letter for the days you need a warm reminder. ♡</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
