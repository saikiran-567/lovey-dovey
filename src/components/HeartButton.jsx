import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function HeartButton({ children, onClick, type = 'button', className = '', disabled = false, ...props }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      type={type}
      className={`heart-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={reducedMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      {...props}
    >
      <span>{children}</span><Heart size={16} strokeWidth={1.8} aria-hidden="true" />
    </motion.button>
  );
}
