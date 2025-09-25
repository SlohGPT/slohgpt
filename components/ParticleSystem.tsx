"use client";

import React from 'react';

interface ParticleSystemProps {
  particleCount?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ particleCount = 60 }) => {
  const particles = Array.from({ length: particleCount });

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {particles.map((_, i) => {
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5; // 0.5px - 2px
        const delay = Math.random() * 4000;
        const duration = 4000 + Math.random() * 4000;

        return (
          <div
            key={i}
            className="absolute"
            style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}ms` }}
          >
            <div
              className="rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                background: 'hsl(var(--primary))',
                boxShadow: '0 0 10px hsl(var(--primary)/0.6)',
                opacity: 0.6,
                animation: `twinkle ${duration}ms ease-in-out infinite` as any,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ParticleSystem;


