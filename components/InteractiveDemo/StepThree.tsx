'use client'

import { GraduationCap } from 'lucide-react'

export default function StepThree({ 
  content, 
  onPickAnotherGenre 
}: { 
  content: string; 
  onPickAnotherGenre: () => void 
}) {
  const sampleEssay = "Moja budúcnosť je ako nepopísaná kniha. Predstavujem si, že budem študovať, cestovať a spoznávať svet. Každý nový deň je pre mňa príležitosťou objaviť niečo, čo ma posunie bližšie k môjmu cieľu. Verím, že tvrdá práca a vytrvalosť mi otvoria dvere k úspechu."

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
          background: `radial-gradient(120px 120px at 50% 40%, rgba(168,85,247,0.35) 0%, rgba(0,0,0,0.0) 65%), 
                       radial-gradient(120px 120px at 50% 60%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.0) 70%)`,
          boxShadow: `0 12px 30px rgba(168,85,247,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
          border: `2px solid rgba(168,85,247,0.65)`,
        }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              boxShadow: `0 0 60px 16px rgba(168,85,247,0.35)`,
              filter: "blur(2px)",
              opacity: 0.55,
            }}
          />
          <GraduationCap style={{ width: 28, height: 28, color: "#A855F7" }} />
        </div>
        <h3 className="idemo-title" style={{
          background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(250 85% 70%))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}>Krok 3: Nauč sa zo slohu</h3>
      </div>
      <div className="idemo-essaybox idemo-analysis">
        <div className="idemo-essayline">
          <span className="idemo-highlight one" data-tooltip="Úvod: metafora &quot;Moja budúcnosť je ako nepopísaná kniha&quot;">Moja budúcnosť je ako nepopísaná kniha.</span>
          <span> Predstavujem si, že budem </span>
          <span className="idemo-highlight two" data-tooltip="Rozvoj: konkrétne plány (štúdium, cestovanie, objavovanie)">študovať, cestovať a spoznávať svet. Každý nový deň je pre mňa príležitosťou objaviť niečo, čo ma posunie bližšie k môjmu cieľu.</span>
          <span> </span>
          <span className="idemo-highlight three" data-tooltip="Záver: dôraz na vytrvalosť a úspech">Verím, že tvrdá práca a vytrvalosť mi otvoria dvere k úspechu.</span>
        </div>
      </div>
      <div className="idemo-cta-section">
        <button 
          className="idemo-cta-btn"
          onClick={() => {
            // Redirect to pricing page
            window.location.href = '/pricing'
          }}
          aria-label="Chcem celý sloh za €8.99"
        >
          Chcem celý sloh za €8.99
        </button>
        <a 
          href="#" 
          className="idemo-demo-link"
          onClick={(e) => {
            e.preventDefault()
            onPickAnotherGenre()       // let parent reset + open dropdown
          }}
        >
          Alebo vyskúšaj ďalší demo žáner
        </a>
      </div>
    </div>
  )
}


