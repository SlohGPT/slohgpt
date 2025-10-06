'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const pathname = usePathname()

  // Only show on homepage and pricing, not on dashboard or auth pages
  const showOnCurrentPage = pathname === '/' || pathname === '/pricing'

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (!isMobile || !showOnCurrentPage) {
      setIsVisible(false)
      return
    }

    // Find the trigger element (first proof section - could be pain point or benefits section)
    const triggerElement = document.querySelector('.student-pain-section, .jaw-dropping-benefits, .our-story-section')
    
    if (!triggerElement) return

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA when the proof section has been viewed (is no longer intersecting)
        setIsVisible(!entry.isIntersecting)
      },
      {
        rootMargin: '0px 0px -50% 0px', // Trigger when element is halfway out of view
        threshold: 0
      }
    )

    observerRef.current.observe(triggerElement)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isMobile, showOnCurrentPage])

  const handleDemoClick = () => {
    const demoSection = document.getElementById('idemo-card')
    if (demoSection) {
      demoSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Don't render if not mobile or not on allowed pages
  if (!isMobile || !showOnCurrentPage) {
    return null
  }

  return (
    <>
      {/* Sticky CTA Bar */}
      <div 
        className={`sticky-cta ${isVisible ? 'sticky-cta-visible' : 'sticky-cta-hidden'}`}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '72px',
          background: 'linear-gradient(135deg, rgba(11, 14, 26, 0.98) 0%, rgba(15, 20, 35, 0.98) 100%)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(94, 60, 246, 0.3)',
          borderTop: '2px solid rgba(94, 60, 246, 0.4)',
          borderBottom: 'none',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-5)',
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.4), 0 -2px 16px rgba(94, 60, 246, 0.1)',
        }}
      >
        {/* Benefit text */}
        <div className="sticky-cta-text" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2
          }}>
            Napíš sloh za pár minút
          </span>
          <span style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.2
          }}>
            Skús zadarmo →
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleDemoClick}
          className="sticky-cta-button"
          style={{
            minHeight: '52px',
            padding: 'var(--space-3) var(--space-6)',
            background: 'linear-gradient(135deg, #5E3CF6 0%, #8B5CF6 50%, #A855F7 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            fontSize: 'var(--font-size-base)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            flexShrink: 0,
            boxShadow: '0 4px 16px rgba(94, 60, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95)'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <Sparkles className="h-5 w-5" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' }} />
          <span>Vyskúšaj</span>
        </button>
      </div>

      {/* Add bottom safe area for content when sticky CTA is visible */}
      {isVisible && (
        <div 
          className="sticky-cta-spacer"
          style={{
            height: '88px', // 72px + 16px extra spacing
            width: '100%',
            position: 'fixed',
            bottom: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
      )}
    </>
  )
}
