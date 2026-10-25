import { memo } from 'react';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  delay: `${(i % 8) * -1.7}s`,
  duration: `${15 + (i % 7) * 2}s`,
  size: `${8 + (i % 4) * 3}px`,
  drift: `${(i % 2 ? 1 : -1) * (20 + (i % 5) * 8)}px`,
}));

function BackgroundEffects() {
  return (
    <div className="ambient-effects" aria-hidden="true">
      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />
      <div className="ambient-orb orb-three" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className={`ambient-particle ${particle.id % 4 === 0 ? 'particle-heart' : particle.id % 3 === 0 ? 'particle-petal' : 'particle-sparkle'}`}
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            '--particle-size': particle.size,
            '--particle-drift': particle.drift,
          }}
        />
      ))}
    </div>
  );
}

export default memo(BackgroundEffects);
