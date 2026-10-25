import { useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import BackgroundEffects from '../components/BackgroundEffects';
import FloatingNavbar from '../components/FloatingNavbar';
import WelcomeSection from '../sections/WelcomeSection';
import StorySection from '../sections/StorySection';
import GallerySection from '../sections/GallerySection';
import ReasonsSection from '../sections/ReasonsSection';
import QuotesSection from '../sections/QuotesSection';
import QuizSection from '../sections/QuizSection';
import SurpriseSection from '../sections/SurpriseSection';
import FinalLetterSection from '../sections/FinalLetterSection';

export default function LovePage({ onRelock }) {
  useEffect(() => {
    document.title = 'Our Little World ♡';
  }, []);
  const yourName = loveConfig.yourName === 'MY_NAME' ? 'someone who loves you' : loveConfig.yourName;
  return (
    <div className="love-world">
      <BackgroundEffects />
      <FloatingNavbar onRelock={onRelock} />
      <main className="journey-main">
        <WelcomeSection />
        <StorySection />
        <GallerySection />
        <ReasonsSection />
        <QuotesSection />
        <QuizSection />
        <SurpriseSection />
        <FinalLetterSection />
      </main>
      <footer className="love-footer">
        <div className="footer-heart"><Heart size={18} fill="currentColor" /></div>
        <p>made with every little bit of love</p>
        <span className="footer-rule" />
        <small>{yourName} · for {loveConfig.girlfriendName === 'GIRLFRIEND_NAME' ? 'my favorite person' : loveConfig.girlfriendName}</small>
        <div className="footer-last-line"><Sparkles size={12} /> our little world, always <Sparkles size={12} /></div>
      </footer>
      <button className="relock-float" type="button" onClick={onRelock}><Heart size={13} fill="currentColor" /> Relock our world</button>
    </div>
  );
}
