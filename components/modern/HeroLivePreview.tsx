import { Play } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Demo data sets for auto-cycling
const demoSets = [
  {
    genre: "Úvaha",
    topic: "Technológie v živote mladých ľudí",
    text: "Dnešná mládež žije v digitálnom svete, kde technológie nie sú len nástrojom, ale súčasťou identity..."
  },
  {
    genre: "Rozprávanie",
    topic: "Môj najobľúbenejší výlet",
    text: "Bol krásny slnečný deň, keď sme sa s rodinou vybrali na nezabudnuteľný výlet do Tatier..."
  },
  {
    genre: "Úvaha",
    topic: "Význam priateľstva v živote",
    text: "Priateľstvo je jednou z najcennejších hodnôt, ktoré môže človek vo svojom živote získať..."
  },
  {
    genre: "Charakteristika",
    topic: "Môj obľúbený literárny hrdina",
    text: "Harry Potter nie je len obyčajný chlapec s jazvou na čele, ale symbol odvahy a vytrvalosti..."
  }
];

// Improved Typewriter Hook
const useTypewriter = (
  text: string,
  delay: number = 50,
  onComplete?: () => void,
  start: boolean = false
) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (start && text) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsFinished(false);
    }
  }, [text, start]);

  useEffect(() => {
    if (!start) {
      return;
    }

    if (!text || currentIndex >= text.length) {
      if (currentIndex >= text.length && text && !isFinished) {
        setIsFinished(true);
        if (onComplete) {
          onComplete();
        }
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(text.substring(0, currentIndex + 1));
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, text, start, isFinished, onComplete]);

  if (!start) return '';
  return displayText;
};

export const HeroLivePreview: React.FC = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [startGenre, setStartGenre] = useState(false);
  const [startTopic, setStartTopic] = useState(false);
  const [startContent, setStartContent] = useState(false);
  const [showCaret, setShowCaret] = useState(false);

  const currentSet = demoSets[currentSetIndex];

  // Full strings for each line
  const genreFull = `Žáner: ${currentSet.genre}`;
  const topicFull = `Téma: "${currentSet.topic}"`;
  const contentFull = currentSet.text;

  // Sequential typewriter effects
  const genreText = useTypewriter(
    genreFull,
    60,
    () => setStartTopic(true),
    startGenre
  );

  const topicText = useTypewriter(
    topicFull,
    60,
    () => setStartContent(true),
    startTopic
  );

  const contentText = useTypewriter(
    contentFull,
    40,
    () => {
      setShowCaret(true);
      // Wait 2 seconds, then cycle to next demo
      setTimeout(() => {
        // Reset all flags
        setStartGenre(true);
        setStartTopic(false);
        setStartContent(false);
        setShowCaret(false);
        // Move to next demo set
        setCurrentSetIndex((prev) => (prev + 1) % demoSets.length);
      }, 2000);
    },
    startContent
  );

  // Initialize the sequence on mount
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStartGenre(true);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <div
      className="hero-preview-card"
      style={{
        maxWidth: "min(680px, calc(100vw - 2rem))", // Mobile-first responsive width
        width: "100%",
        margin: "0 auto",
        padding: "1rem", // Reduced padding on mobile
        borderRadius: "var(--border-radius)", // Use CSS variables
        background: "rgba(11,14,26,0.95)", // More opaque on mobile for better contrast
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.3)", // Adjusted for mobile
        border: "1px solid rgba(94,60,246,0.25)",
        backdropFilter: "blur(14px)",
        transition: "transform 0.2s ease-out",
      }}
      onMouseEnter={(e) => {
        if (window.innerWidth >= 768) { // Only hover effects on larger screens
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.08), 0 15px 40px rgba(0,0,0,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (window.innerWidth >= 768) {
          e.currentTarget.style.transform = "translateY(0px)";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.3)";
        }
      }}
    >
      {/* Top meta row - Left aligned like desktop */}
      <div
        className="hero-preview-header"
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "var(--space-3)", // Use CSS variable
          marginBottom: "var(--space-3)",
          justifyContent: "flex-start" // Left align on mobile (like desktop)
        }}
      >
        <Play className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: "#5E3CF6" }} />
        <span
          style={{ 
            fontSize: "var(--font-size-sm)", // Use CSS variable 
            fontWeight: 600, 
            color: "rgba(255,255,255,0.7)" 
          }}
        >
          Živá ukážka nástroja
        </span>
      </div>

      {/* Window dots row - Left aligned like desktop */}
      <div style={{ 
        display: "flex", 
        gap: "var(--space-2)", 
        marginBottom: "var(--space-3)",
        justifyContent: "flex-start" // Left align like desktop
      }}>
        <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#EF4444" }} />
        <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#F59E0B" }} />
        <div style={{ width: 8, height: 8, borderRadius: 9999, background: "#22C55E" }} />
      </div>

      {/* Content block - Mobile-first responsive layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: "var(--space-2)",
        padding: "var(--space-3)",
        minHeight: 100, // Slightly reduced for mobile
      }}>
        {/* Genre line - Mobile responsive */}
        <div style={{ 
          fontSize: "var(--font-size-xs)", 
          color: "rgba(255,255,255,0.65)", 
          fontWeight: 600,
          textAlign: "center",
          minHeight: 16,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}>
          {genreText || '\u00A0'} {/* Non-breaking space when empty */}
        </div>

        {/* Topic line - Mobile responsive */}
        <div style={{
          width: '100%',
          background: topicText ? "rgba(94,60,246,0.12)" : "rgba(94,60,246,0.05)",
          color: "rgba(255,255,255,0.85)",
          borderRadius: "var(--border-radius)",
          padding: "var(--space-2) var(--space-3)", // Mobile responsive padding
          fontSize: "var(--font-size-sm)",
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: "var(--touch-target-min)", // Touch-friendly on mobile
          transition: 'background-color 0.2s ease',
        }}>
          <span style={{ 
            wordBreak: 'break-word', // Prevent text overflow on mobile
            hyphens: 'auto' 
          }}>
            {topicText || '\u00A0'}
          </span>
        </div>

        {/* Sample text - Mobile responsive */}
        <div
          className="sample-row"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: "var(--touch-target-min)",
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: "var(--space-2) 0",
          }}
        >
          {/* Left purple line (absolutely positioned) */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: "var(--space-2)",
              bottom: "var(--space-2)",
              width: 2,
              background: contentText ? 'rgba(94,60,246,0.3)' : 'rgba(94,60,246,0.1)',
              transition: 'background-color 0.2s ease',
            }}
          />
          
          {/* Text container – left aligned with proper mobile spacing */}
          <div
            style={{
              marginLeft: "var(--space-4)", // spacing between the line and text
              textAlign: 'left', // Left aligned for reading
              fontSize: "var(--font-size-sm)",
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)',
              width: 'calc(100% - var(--space-4))',
              wordBreak: 'break-word', // Prevent overflow on mobile
              hyphens: 'auto',
            }}
          >
            {contentText ? `"${contentText}"` : '\u00A0'}
            {showCaret && (
              <span className="blink-caret" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLivePreview;
