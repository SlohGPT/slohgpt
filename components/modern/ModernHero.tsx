"use client";

import React from 'react';
import HeroLivePreview from '@/components/modern/HeroLivePreview';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModernHeroProps {
  onDemoClick?: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onDemoClick }) => {
  const handleDemoClick = () => {
    // Scroll to the interactive demo section
    const demoSection = document.getElementById('idemo-card');
    if (demoSection) {
      demoSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Call the original onDemoClick if provided
    if (onDemoClick) {
      onDemoClick();
    }
  };

  return (
    <section 
      className="modern-hero"
      style={{ 
        position: 'relative', 
        minHeight: 'max(600px, 80vh)', // Avoid iOS vh issues, ensure minimum content height
        width: '100%', 
        overflow: 'hidden',
        paddingTop: '0rem', // Remove top padding
        paddingBottom: 'var(--space-16)'
      }}
    >
      {/* Content Layer - Mobile-first responsive */}
      <div className="hero-inner" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          {/* HEADLINE - Mobile responsive */}
          <motion.div 
            className="hero-headline"
            style={{ 
              marginBottom: 'var(--space-10)', // Mobile-first spacing
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-6)'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Desktop Hero Title */}
            <h1 className="modern-hero-title desktop-title" style={{
              fontSize: 'clamp(48px, 6vw, 80px)', // More responsive scaling for smaller windows
              lineHeight: 1.0,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 'var(--space-4)',
              maxWidth: '95vw', // Prevent edge clipping
              textAlign: 'center',
              width: '100%',
              padding: '0 var(--space-2)' // Add small padding for safety
            }}>
              <span style={{ 
                display: 'block', 
                marginBottom: 'var(--space-2)',
                fontWeight: 900,
                whiteSpace: 'nowrap' // Prevent wrapping within sentence
              }}>
                Nie je to len ďalší AI generátor.
              </span>
              <span style={{ 
                display: 'block',
                fontWeight: 900,
                whiteSpace: 'nowrap' // Prevent wrapping within sentence
              }}>
                Je to tvoja <span className="text-gradient-primary" style={{ fontWeight: 900 }}>tajná zbraň</span> na slohy.
              </span>
            </h1>
            
            {/* Mobile Hero Title */}
            <h1 className="modern-hero-title mobile-title" style={{
              fontSize: 'var(--font-size-4xl)',
              lineHeight: 1.1,
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: 'var(--space-4)',
              maxWidth: 'min(90vw, 600px)',
              textAlign: 'center'
            }}>
              <span style={{ 
                display: 'block', 
                marginBottom: 'var(--space-2)',
                fontSize: '0.9em',
                fontWeight: 900,
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Tajná zbraň pre slohy
              </span>
              <span className="text-gradient-primary" style={{ 
                display: 'block',
                fontSize: '1.2em',
                fontWeight: 900
              }}>
                SlohGPT
              </span>
            </h1>
            <p className="modern-hero-subtitle" style={{
              fontSize: 'var(--font-size-lg)',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.8)',
              // maxWidth: 'var(--max-line-length)', // Removed for better centering
              margin: '0 auto',
              textAlign: 'center'
            }}>
              Zadaj tému a žáner, získaj celý sloh za pár minút.
            </p>
          </motion.div>

          {/* Live Preview Card - Mobile responsive */}
          <motion.div 
            style={{ 
              marginTop: 'var(--space-8)', 
              marginBottom: 'var(--space-8)',
              width: '100%'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <HeroLivePreview />
          </motion.div>

          {/* CTAs - Mobile-first with proper touch targets */}
          <motion.div 
            className="modern-hero-ctas"
            style={{
              marginBottom: 'var(--space-4)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            <button 
              className="btn-hero-primary" 
              onClick={handleDemoClick}
              style={{
                minHeight: 'var(--touch-target-min)',
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-2)',
                background: 'var(--hero-gradient)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles className="h-5 w-5" />
              Vyskúšaj zdarma demo
            </button>
            <a 
              href="#examples" 
              className="btn-hero-secondary"
              style={{
                minHeight: 'var(--touch-target-min)',
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Pozri reálne príklady
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;


