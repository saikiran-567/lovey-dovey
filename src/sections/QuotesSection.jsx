import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bookmark, Check, Quote, RefreshCw, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { readStorage, writeStorage } from '../utils';

export default function QuotesSection() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [favorites, setFavorites] = useState(() => readStorage('loveFavoriteQuotes', []));
  const [savedPulse, setSavedPulse] = useState(false);
  const reducedMotion = useReducedMotion();
  const quote = loveConfig.quotes[quoteIndex] || 'You are loved, always.';
  const saved = favorites.includes(quote);

  const anotherQuote = () => {
    if (loveConfig.quotes.length < 2) return;
    const options = loveConfig.quotes.map((_, index) => index).filter((index) => index !== quoteIndex);
    setQuoteIndex(options[Math.floor(Math.random() * options.length)]);
    setSavedPulse(false);
  };
  const toggleFavorite = () => {
    const next = saved ? favorites.filter((item) => item !== quote) : [...favorites, quote];
    setFavorites(next);
    writeStorage('loveFavoriteQuotes', next);
    setSavedPulse(!saved);
  };

  return (
    <section id="quotes" className="page-section quotes-section section-padding">
      <div className="quotes-side-note"><span className="side-note-line" /><span>WORDS FROM<br />THE HEART</span><Sparkles size={15} /></div>
      <div className="quotes-content">
        <div className="section-heading centered-heading">
          <span className="section-icon"><Quote size={18} /></span>
          <p className="eyebrow">A FEW WORDS, A LOT OF FEELING</p>
          <h2>Little notes for<br /><em>your heart.</em></h2>
        </div>
        <div className="quote-stage">
          <div className="quote-mark">“</div>
          <AnimatePresence mode="wait">
            <motion.blockquote key={quoteIndex} initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
              {quote}
            </motion.blockquote>
          </AnimatePresence>
          <span className="quote-attribution">— a little thought, from me to you —</span>
          <div className="quote-controls">
            <button type="button" className={`soft-action ${saved ? 'is-saved' : ''}`} onClick={toggleFavorite} aria-pressed={saved}>
              {saved ? <Check size={15} /> : <Bookmark size={15} />} {saved ? 'Saved to your favorites' : 'Save My Favorite'}
            </button>
            <button type="button" className="soft-action" onClick={anotherQuote} disabled={loveConfig.quotes.length < 2}><RefreshCw size={15} /> Another little note</button>
          </div>
          {favorites.length > 0 && <div className="favorite-count"><span className="favorite-count-dot" /> {favorites.length} {favorites.length === 1 ? 'little note saved' : 'little notes saved'} on this device</div>}
          {savedPulse && <motion.span className="save-sparkle" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>♡ tucked away for later</motion.span>}
        </div>
      </div>
    </section>
  );
}
