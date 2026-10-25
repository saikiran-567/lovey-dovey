import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Camera, Heart, Images, Sparkles } from 'lucide-react';
import { loveConfig } from '../config/loveConfig';
import { asset } from '../utils';
import PhotoLightbox from '../components/PhotoLightbox';

export default function GallerySection() {
  const [photoIndex, setPhotoIndex] = useState(-1);
  const reducedMotion = useReducedMotion();
  return (
    <section id="photos" className="page-section section-padding gallery-section">
      <div className="section-heading">
        <span className="section-icon"><Camera size={18} /></span>
        <p className="eyebrow">CHAPTER TWO · LITTLE SNAPSHOTS</p>
        <h2>Our moments,<br /><em>kept close.</em></h2>
        <p className="section-intro">A little scrapbook for the days we want to remember, the places we have been, and the moments still waiting to happen.</p>
      </div>
      <div className="gallery-note"><Sparkles size={14} /><span>YOUR MEMORY WALL</span><span className="gallery-note-rule" /><span>{loveConfig.photos.length.toString().padStart(2, '0')} little frames</span></div>
      {loveConfig.photos.length === 0 ? (
        <div className="gallery-empty-state"><Images size={25} /><strong>Your scrapbook is waiting for its first photo.</strong><p>Add items to the <code>photos</code> array in <code>src/config/loveConfig.js</code>.</p></div>
      ) : <div className="photo-gallery">
        {loveConfig.photos.map((photo, index) => (
          <motion.button
            type="button"
            key={`${photo.src}-${index}`}
            className={`photo-tile photo-tile-${index % 6} ${photo.featured ? 'photo-featured' : ''}`}
            onClick={() => setPhotoIndex(index)}
            initial={reducedMotion ? false : { opacity: 0, y: 18, rotate: index % 2 ? 1.5 : -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : (index % 3) * 0.07 }}
            aria-label={`Open photograph: ${photo.caption}`}
          >
            <span className="photo-image-wrap"><img src={asset(photo.src)} alt={photo.alt || photo.caption} loading="lazy" /><span className="photo-gloss" /><span className="photo-open-icon"><Images size={16} /></span></span>
            <span className="photo-tile-caption"><span className="photo-date">{photo.date || 'A little memory'}</span><span className="photo-caption-text">{photo.caption}</span><span className="photo-heart"><Heart size={12} fill="currentColor" /></span></span>
          </motion.button>
        ))}
      </div>}
      <div className="gallery-footer-note"><span className="script-note">The best pictures are the ones that feel like us.</span><span className="gallery-footer-hearts">♡ ♡ ♡</span></div>
      <PhotoLightbox photos={loveConfig.photos} index={photoIndex} setIndex={setPhotoIndex} onClose={() => setPhotoIndex(-1)} />
    </section>
  );
}
