import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { asset } from '../utils';

export default function PhotoLightbox({ photos, index, setIndex, onClose }) {
  const touchStart = useRef(null);
  const dialogRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const photo = index >= 0 ? photos[index] : null;
  const previous = () => setIndex((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setIndex((current) => (current + 1) % photos.length);

  useEffect(() => {
    if (index < 0) return undefined;
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    const keyHandler = (event) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!focusable?.length) { event.preventDefault(); dialogRef.current?.focus(); return; }
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function' && previouslyFocused.isConnected) previouslyFocused.focus();
    };
  }, [index, photos.length]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div ref={dialogRef} tabIndex={-1} className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={photo.caption || 'Photo viewer'} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="lightbox-close icon-button" onClick={onClose} aria-label="Close photo viewer"><X size={22} /></button>
          {photos.length > 1 && <button className="lightbox-arrow lightbox-prev" onClick={previous} aria-label="Previous photo"><ChevronLeft size={26} /></button>}
          <motion.div className="lightbox-content" key={photo.src + index} initial={reducedMotion ? false : { opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }}
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) (delta > 0 ? previous : next)(); touchStart.current = null; }}>
            <img src={asset(photo.src)} alt={photo.alt || photo.caption} />
            <div className="lightbox-caption"><span>{photo.date || 'A little memory'}</span><p>{photo.caption}</p></div>
            <div className="lightbox-count">{index + 1} <span>/</span> {photos.length}</div>
          </motion.div>
          {photos.length > 1 && <button className="lightbox-arrow lightbox-next" onClick={next} aria-label="Next photo"><ChevronRight size={26} /></button>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
