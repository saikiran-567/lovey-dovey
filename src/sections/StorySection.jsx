import { BookOpen, Heart } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import LoveTimeline from '../components/LoveTimeline';

export default function StorySection() {
  return (
    <section id="story" className="page-section story-section section-padding">
      <div className="section-heading centered-heading">
        <span className="section-icon"><BookOpen size={18} /></span>
        <p className="eyebrow">CHAPTER ONE · THE BEGINNING OF US</p>
        <h2>Every love has a story.<br /><em>This one is ours.</em></h2>
        <p className="section-intro">Little moments, tiny milestones, and all the things that have slowly become part of our story.</p>
        <div className="heading-ornament"><span /><Heart size={13} fill="currentColor" /><span /></div>
      </div>
      <LoveTimeline memories={loveConfig.memories} />
      <p className="timeline-footnote"><span>✧</span> Tap any moment to open its little story <span>✧</span></p>
    </section>
  );
}
