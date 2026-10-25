import { Heart, Sparkles } from 'lucide-react';
import SurpriseEnvelope from '../components/SurpriseEnvelope';

export default function SurpriseSection() {
  return (
    <section id="surprise" className="page-section section-padding surprise-section">
      <div className="section-heading centered-heading">
        <span className="section-icon"><Sparkles size={18} /></span>
        <p className="eyebrow">CHAPTER FIVE · JUST A LITTLE EXTRA</p>
        <h2>Because you deserve<br /><em>to be surprised.</em></h2>
      </div>
      <SurpriseEnvelope />
      <p className="surprise-signoff"><Heart size={12} fill="currentColor" /> made especially for you, with all my love</p>
    </section>
  );
}
