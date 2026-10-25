import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Flower2, Heart, MessageCircle, Sparkles } from 'lucide-react';
import { asset } from '../utils';
import Modal from './Modal';

const memoryIcons = { 'sparkles': Sparkles, 'message-circle': MessageCircle, 'heart': Heart, 'flower-2': Flower2 };

export default function LoveTimeline({ memories }) {
  const [selected, setSelected] = useState(null);
  const reducedMotion = useReducedMotion();
  if (!memories?.length) return <p className="empty-state">Your story is waiting for its first little memory. Add entries in <code>src/config/loveConfig.js</code>.</p>;
  return (
    <>
      <div className="timeline">
        {memories.map((memory, index) => {
          const Icon = memoryIcons[memory.icon] || Heart;
          return (
            <motion.button
              type="button"
              key={`${memory.title}-${index}`}
              className={`timeline-item ${index % 2 ? 'timeline-right' : 'timeline-left'}`}
              onClick={() => setSelected(memory)}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : (index % 2) * 0.08 }}
            >
              <span className="timeline-node"><Icon size={17} strokeWidth={1.7} /></span>
              <span className="timeline-card">
                <span className="timeline-date"><CalendarDays size={13} /> {memory.date}</span>
                <span className="timeline-body">
                  <span className="timeline-copy"><strong>{memory.title}</strong><span>{memory.description}</span><em>Open this memory <span aria-hidden="true">↗</span></em></span>
                  {memory.image && <span className="timeline-thumb"><img src={asset(memory.image)} alt="" loading="lazy" /></span>}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} className="memory-modal" label={selected?.title || 'A relationship memory'}>
        {selected && <>
          <div className="modal-kicker">A PAGE FROM OUR STORY · {selected.date}</div>
          <h3 className="modal-heading">{selected.title}</h3>
          {selected.image && <img className="memory-modal-image" src={asset(selected.image)} alt="Decorative memory placeholder" />}
          <p className="modal-story-text">{selected.description}</p>
          <p className="script-note">Every little moment matters. ♡</p>
        </>}
      </Modal>
    </>
  );
}
