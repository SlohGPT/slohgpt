'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Step = 1 | 2 | 3

export default function LiveDemo() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showTooltips, setShowTooltips] = useState(false)

  const intervalRef = useRef<number | null>(null)

  const sampleEssay = useMemo(
    () =>
      'Moja budúcnosť je ako nepopísaná kniha. Každý deň do nej chcem vpísať nové skúsenosti. Po strednej škole plánujem študovať odbor, ktorý ma baví, cestovať a spoznávať svet. Verím, že vytrvalosť a poctivá práca ma privedú k úspechu.',
    []
  )

  // Start typewriter when we enter step 2
  useEffect(() => {
    if (currentStep !== 2) return
    setIsTyping(true)
    setTypedText('')

    const text = sampleEssay
    let index = 0
    intervalRef.current = window.setInterval(() => {
      index += 1
      setTypedText(text.slice(0, index))
      if (index >= text.length) {
        if (intervalRef.current) window.clearInterval(intervalRef.current)
        setIsTyping(false)
        window.setTimeout(() => setCurrentStep(3), 500)
      }
    }, 50)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [currentStep, sampleEssay])

  // Reveal tooltips shortly after step 3 appears
  useEffect(() => {
    if (currentStep !== 3) return
    const t = window.setTimeout(() => setShowTooltips(true), 500)
    return () => window.clearTimeout(t)
  }, [currentStep])

  return (
    <section className="demo-section">
      <div className="container">
        {/* Progress */}
        <div className="demo-progress" aria-label="Postup ukážky v 3 krokoch">
          {[1, 2, 3].map((n, idx) => (
            <div key={n} className="demo-progress-item">
              <div
                className={`demo-circle ${currentStep >= (n as Step) ? 'is-active' : ''}`}
                aria-current={currentStep === n ? 'step' : undefined}
              >
                {n}
              </div>
              {idx < 2 && (
                <div className={`demo-line ${currentStep > n ? 'is-active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step cards */}
        <div className="demo-cards">
          {/* Step 1 */}
          <div className={`demo-card glass-card ${currentStep === 1 ? 'is-visible step-1' : ''}`}>
            <div className="demo-header">
              <span className="demo-step-label">Krok 1</span>
              <h3 className="demo-title">Vyber žáner a tému</h3>
            </div>
            <div className="demo-body">
              <div className="demo-inputs">
                <div className="demo-input disabled">
                  <label>Žáner</label>
                  <input type="text" value="Rozprávanie" disabled readOnly />
                </div>
                <div className="demo-input disabled">
                  <label>Téma</label>
                  <input type="text" value="Moja budúcnosť" disabled readOnly />
                </div>
              </div>
              <button
                className="demo-generate-btn"
                onClick={() => setCurrentStep(2)}
                aria-label="Generovať ukážku slohu"
              >
                Generuj sloh
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`demo-card glass-card ${currentStep === 2 ? 'is-visible step-2' : ''}`}>
            <div className="demo-header">
              <span className="demo-step-label">Krok 2</span>
              <h3 className="demo-title">Generuj ukážku slohu</h3>
            </div>
            <div className="demo-body">
              <p className="demo-essay demo-typing">
                {typedText}
                {isTyping && <span className="demo-caret">|</span>}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`demo-card glass-card ${currentStep === 3 ? 'is-visible step-3' : ''}`}>
            <div className="demo-header">
              <span className="demo-step-label">Krok 3</span>
              <h3 className="demo-title">Nauč sa zo slohu</h3>
            </div>
            <div className="demo-body">
              <div className="demo-essay-wrapper">
                <p className="demo-essay">{sampleEssay}</p>
                {showTooltips && (
                  <>
                    <div className="demo-tooltip" style={{ top: '3%', left: '6%' }}>
                      Úvod: metafora „Moja budúcnosť je ako nepopísaná kniha“
                    </div>
                    <div className="demo-tooltip" style={{ top: '45%', left: '55%' }}>
                      Rozvoj: konkrétne plány (štúdium, cestovanie, objavovanie)
                    </div>
                    <div className="demo-tooltip" style={{ top: '82%', left: '25%' }}>
                      Záver: dôraz na vytrvalosť a úspech
                    </div>
                  </>
                )}
              </div>
              <div className="demo-actions">
                <a href="/pricing" className="demo-buy-btn">
                  Chcem celý sloh za 14,99 €
                </a>
                <button
                  className="demo-reset-link"
                  onClick={() => {
                    setShowTooltips(false)
                    setTypedText('')
                    setCurrentStep(1)
                  }}
                >
                  Alebo vyskúšaj ďalší demo žáner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


