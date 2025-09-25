'use client'

import { Zap } from 'lucide-react'
import TypingAnimation from './TypingAnimation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function StepTwo({
  content,
  onDone,
}: {
  content: string
  onDone: () => void
}) {
  const sampleEssay = "Moja budúcnosť je ako nepopísaná kniha. Predstavujem si, že budem študovať, cestovať a spoznávať svet. Každý nový deň je pre mňa príležitosťou objaviť niečo, čo ma posunie bližšie k môjmu cieľu. Verím, že tvrdá práca a vytrvalosť mi otvoria dvere k úspechu."

  // NEW: height management for the essay box
  const boxRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(true) // true while TypingAnimation runs

  // establishes baseline 1-row height before typing starts
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    // compute one-row height using a hidden measurer
    const measurer = document.createElement('div')
    measurer.style.cssText = `
      position:absolute; visibility:hidden; pointer-events:none;
      white-space:nowrap; line-height:1.6; font-size:inherit; font-family:inherit;
      padding:0; margin:0;
    `
    measurer.textContent = 'A' // one row
    box.appendChild(measurer)
    const oneRow = measurer.getBoundingClientRect().height || 28
    box.removeChild(measurer)

    // lock to one-row height immediately (prevents full collapse)
    box.style.height = `${Math.ceil(oneRow)}px`
    box.style.transition = 'height .25s ease'
    // allow the first frame to paint with 1 row, then TypingAnimation will start
  }, [])

  // while typing grows, track content height and animate box height up
  useEffect(() => {
    if (!contentRef.current || !boxRef.current) return
    const box = boxRef.current
    const el = contentRef.current

    const ro = new ResizeObserver(() => {
      const h = el.scrollHeight
      if (h > 0) box.style.height = `${h}px`
    })
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  // when TypingAnimation ends, release the lock (let natural height take over)
  const handleDone = () => {
    setIsTyping(false)
    // let the last measured height settle, then remove inline height
    requestAnimationFrame(() => {
      const box = boxRef.current
      if (!box) return
      // after a tiny delay, remove explicit height to avoid future rigidity
      setTimeout(() => { box.style.height = ''; }, 200)
    })
    onDone()
  }

  return (
    <div className="idemo-card">
      <div className="idemo-header">
        <div className="idemo-header-icon" style={{
          width: 64,
          height: 64,
          borderRadius: 9999,
          position: "relative",
          display: "grid",
          placeItems: "center",
          background: `radial-gradient(120px 120px at 50% 40%, rgba(0,224,255,0.35) 0%, rgba(0,0,0,0.0) 65%), 
                       radial-gradient(120px 120px at 50% 60%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.0) 70%)`,
          boxShadow: `0 12px 30px rgba(0,224,255,0.40), inset 0 1px 0 rgba(255,255,255,0.06)`,
          border: `2px solid rgba(0,224,255,0.70)`,
        }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              boxShadow: `0 0 60px 16px rgba(0,224,255,0.40)`,
              filter: "blur(2px)",
              opacity: 0.55,
            }}
          />
          <Zap style={{ width: 28, height: 28, color: "#00E0FF" }} />
        </div>
        <h3 className="idemo-title" style={{
          background: "linear-gradient(135deg, hsl(280 90% 65%), hsl(250 85% 60%))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}>Krok 2: Generuj ukážku slohu</h3>
      </div>
      {/* HEIGHT-CONTROLLED BOX */}
      <div ref={boxRef} className="idemo-essaybox idemo-essaybox--animated">
        <div ref={contentRef}>
          <TypingAnimation text={sampleEssay} speed={30} onDone={handleDone} />
        </div>
      </div>
    </div>
  )
}


