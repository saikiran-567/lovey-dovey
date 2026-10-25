import { Heart, Sparkles } from 'lucide-react';
import LoveQuiz from '../components/LoveQuiz';

export default function QuizSection() {
  return (
    <section id="quiz" className="page-section section-padding quiz-section">
      <div className="quiz-heading section-heading centered-heading">
        <span className="section-icon"><Sparkles size={18} /></span>
        <p className="eyebrow">CHAPTER FOUR · A LITTLE GAME</p>
        <h2>Remember when?<br /><em>Let's find out.</em></h2>
        <p className="section-intro">A playful little quiz about our story. No pressure, no grades — just love, memories, and a few giggles.</p>
      </div>
      <LoveQuiz />
      <p className="quiz-bottom-note"><Heart size={12} fill="currentColor" /> The best score is getting to make more memories together.</p>
    </section>
  );
}
