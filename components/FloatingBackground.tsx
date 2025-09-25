"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Star, Sparkles, Pen, BookOpen, Edit3 } from 'lucide-react';

export const FloatingBackground: React.FC<{ mode?: 'viewport' | 'hero' }> = ({ mode = 'viewport' }) => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    mediaQuery.addEventListener('change', (e) => setPrefersReducedMotion(e.matches));
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', (e) => setPrefersReducedMotion(e.matches));
    };
  }, []);

  // Memoize the base floating items to prevent recreation on every render
  const baseFloatingItems = useMemo(() => [
    // Far Left Edge
    { Icon: Star, position: { top: "20%", left: "2vw" }, delay: 0, color: "#00E0FF", size: "h-8 w-8" },
    { Icon: Sparkles, position: { top: "60%", left: "4vw" }, delay: 1500, color: "#A855F7", size: "h-8 w-8" },
    
    // Left Quarter
    { Icon: Edit3, position: { top: "40%", left: "15vw" }, delay: 800, color: "#5E3CF6", size: "h-8 w-8" },
    { Icon: Pen, position: { top: "75%", left: "20vw" }, delay: 2200, color: "#00E0FF", size: "h-8 w-8" },
    
    // Center-Left
    { Icon: BookOpen, position: { top: "30%", left: "35vw" }, delay: 1200, color: "#A855F7", size: "h-8 w-8" },
    { Icon: Star, position: { top: "65%", left: "40vw" }, delay: 2800, color: "#5E3CF6", size: "h-8 w-8" },
    
    // True Center
    { Icon: Sparkles, position: { top: "25%", left: "50vw" }, delay: 600, color: "#00E0FF", size: "h-8 w-8" },
    
    // Center-Right
    { Icon: Edit3, position: { top: "45%", left: "65vw" }, delay: 1800, color: "#A855F7", size: "h-8 w-8" },
    { Icon: Pen, position: { top: "70%", left: "70vw" }, delay: 3200, color: "#5E3CF6", size: "h-8 w-8" },
    
    // Right Quarter
    { Icon: BookOpen, position: { top: "35%", left: "80vw" }, delay: 1000, color: "#00E0FF", size: "h-8 w-8" },
    { Icon: Star, position: { top: "55%", left: "85vw" }, delay: 2600, color: "#A855F7", size: "h-8 w-8" },
    
    // Far Right Edge
    { Icon: Sparkles, position: { top: "25%", left: "92vw" }, delay: 1400, color: "#5E3CF6", size: "h-8 w-8" },
    { Icon: Edit3, position: { top: "65%", left: "95vw" }, delay: 3000, color: "#00E0FF", size: "h-8 w-8" },
    
    // Lower sections coverage - desktop only
    { Icon: BookOpen, position: { top: "75%", left: "12vw" }, delay: 3600, color: "#A855F7", size: "h-8 w-8" },
    { Icon: Star, position: { top: "82%", left: "88vw" }, delay: 4000, color: "#5E3CF6", size: "h-8 w-8" },
    { Icon: Pen, position: { top: "78%", left: "55vw" }, delay: 3800, color: "#00E0FF", size: "h-8 w-8" },
  ], []);

  // Move the early return after all hooks to maintain consistent hook order
  if (!isClient) {
    return null; // Don't render anything on the server
  }

  // Reduce effects on mobile and for users who prefer reduced motion
  const shouldReduceEffects = isMobile || prefersReducedMotion;
  
  // Reduce particles on mobile (take first 8 items only)
  const floatingItems = shouldReduceEffects 
    ? baseFloatingItems.slice(0, 8) 
    : baseFloatingItems;

  const wrapperStyle =
    mode === 'viewport'
      ? { position: 'fixed' as const, inset: 0, pointerEvents: 'none' as const, zIndex: 0, overflow: 'hidden' }
      : { position: 'absolute' as const, inset: 0, pointerEvents: 'none' as const, zIndex: 0, overflow: 'hidden' };

  return (
    <div style={wrapperStyle}>
      {/* Layer 1: Main Floating Icons */}
      {floatingItems.map(({ Icon, position, delay, color, size }, i) => (
        <div 
          key={`icon-${i}`} 
          className="floating"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            opacity: shouldReduceEffects ? 0.08 : 0.15, // Reduced opacity, especially on mobile
            animationDelay: `${delay}ms`,
            animationDuration: shouldReduceEffects ? '6s' : '4s', // Slower animation on mobile
          }}
        >
          <Icon className={shouldReduceEffects ? 'h-6 w-6' : size} style={{ color }} />
        </div>
      ))}

      {/* Layer 2: Small Scattered Stars (Procedural) - Reduced on mobile */}
      {shouldReduceEffects ? null : Array.from({ length: isMobile ? 12 : 25 }).map((_, index) => (
        <div
          key={`star-${index}`}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4000}ms`,
            animationDuration: `${3000 + Math.random() * 3000}ms`,
          }}
        >
          <div 
            className="twinkle-animation"
            style={{
              width: isMobile ? '3px' : '4px',
              height: isMobile ? '3px' : '4px',
              borderRadius: '50%',
              background: '#5E3CF6',
              boxShadow: `0 0 ${isMobile ? '4px' : '8px'} rgba(94,60,246,0.4)`,
              opacity: isMobile ? (0.1 + Math.random() * 0.2) : (0.2 + Math.random() * 0.3), // Much lower opacity on mobile
            }}
          />
        </div>
      ))}

      {/* Layer 3: Gradient Overlays for Atmospheric Depth - Greatly reduced on mobile */}
      {!shouldReduceEffects && (
        <>
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: isMobile 
                ? 'linear-gradient(135deg, rgba(0,224,255,0.01) 0%, transparent 60%, rgba(168,85,247,0.01) 100%)'
                : 'linear-gradient(135deg, rgba(0,224,255,0.03) 0%, transparent 50%, rgba(168,85,247,0.03) 100%)'
            }} 
          />
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: isMobile ? '64px' : '128px',
              background: isMobile
                ? 'linear-gradient(180deg, rgba(94,60,246,0.02) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(94,60,246,0.05) 0%, transparent 100%)'
            }} 
          />
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: isMobile ? '64px' : '128px',
              background: isMobile
                ? 'linear-gradient(0deg, rgba(0,224,255,0.01) 0%, transparent 100%)'
                : 'linear-gradient(0deg, rgba(0,224,255,0.03) 0%, transparent 100%)'
            }} 
          />
        </>
      )}
    </div>
  );
};

export default FloatingBackground;


