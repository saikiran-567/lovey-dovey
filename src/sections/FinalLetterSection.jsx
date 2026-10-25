import { Heart, Mail } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import LoveLetter from '../components/LoveLetter';

export default function FinalLetterSection() {
  return (
    <section id="letter" className="page-section section-padding final-letter-section">
      <div className="section-heading centered-heading">
        <span className="section-icon"><Mail size={18} /></span>
        <p className="eyebrow">THE LAST PAGE · BUT NEVER THE END</p>
        <h2>For you, from<br /><em>the deepest part of me.</em></h2>
        <p className="section-intro">Some things deserve paper, a quiet moment, and all the time in the world. This one is yours.</p>
      </div>
      <LoveLetter />
      <p className="final-message"><Heart size={13} fill="currentColor" /> {loveConfig.finalMessage}</p>
    </section>
  );
}
