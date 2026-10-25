import { useMemo, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { shuffle } from '../utils';
import ReasonCard from '../components/ReasonCard';
import HeartButton from '../components/HeartButton';

export default function ReasonsSection() {
  const initialIndexes = useMemo(() => Array.from({ length: Math.min(4, loveConfig.reasons.length) }, (_, index) => index), []);
  const [visibleIndexes, setVisibleIndexes] = useState(initialIndexes);
  const [roundOrder, setRoundOrder] = useState(() => shuffle(loveConfig.reasons.map((_, index) => index)));
  const [shownThisRound, setShownThisRound] = useState(initialIndexes);
  const [spotlight, setSpotlight] = useState(null);

  const revealAnother = () => {
    if (!loveConfig.reasons.length) return;
    const unseen = roundOrder.filter((index) => !shownThisRound.includes(index));
    if (unseen.length > 0) {
      const next = unseen[0];
      setVisibleIndexes((items) => items.includes(next) ? items : [...items, next]);
      setShownThisRound((items) => [...items, next]);
      setSpotlight(next);
      return;
    }
    const nextOrder = shuffle(loveConfig.reasons.map((_, index) => index));
    const next = nextOrder[0];
    setRoundOrder(nextOrder);
    setShownThisRound([next]);
    setVisibleIndexes((items) => items.includes(next) ? items : [...items, next]);
    setSpotlight(next);
  };

  return (
    <section id="reasons" className="page-section section-padding reasons-section">
      <div className="section-heading centered-heading">
        <span className="section-icon"><Heart size={18} fill="currentColor" /></span>
        <p className="eyebrow">CHAPTER THREE · THE LITTLE THINGS</p>
        <h2>Little things I love<br /><em>about you.</em></h2>
        <p className="section-intro">Not a complete list — just a few little reminders of the ways you make the world feel warmer.</p>
      </div>
      {loveConfig.reasons.length === 0 ? <p className="empty-state">Add a few personal reasons in <code>src/config/loveConfig.js</code> to fill these cards.</p> : <div className="reasons-grid">
        {visibleIndexes.map((index) => <ReasonCard key={index} reason={loveConfig.reasons[index]} index={index} />)}
      </div>}
      {spotlight !== null && (
        <div className="reason-spotlight" aria-live="polite" key={spotlight}>
          <span><Sparkles size={16} /> ANOTHER LITTLE REASON</span>
          <strong>{loveConfig.reasons[spotlight].front}</strong>
          <p>{loveConfig.reasons[spotlight].back}</p>
        </div>
      )}
      <div className="reason-action"><HeartButton onClick={revealAnother} disabled={loveConfig.reasons.length === 0}>Give Me Another Reason</HeartButton><span><Heart size={12} fill="currentColor" /> no two little reasons in a row</span></div>
    </section>
  );
}
