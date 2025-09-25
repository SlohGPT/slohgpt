'use client'

import { useState } from 'react'

const essayTypes = [
  { id: 'rozpravanie', icon: 'fas fa-book-open', label: 'Rozprávanie' },
  { id: 'uvaha', icon: 'fas fa-lightbulb', label: 'Úvaha' },
  { id: 'vyklad', icon: 'fas fa-graduation-cap', label: 'Výklad' },
  { id: 'charakteristika', icon: 'fas fa-user', label: 'Charakteristika' },
  { id: 'opis', icon: 'fas fa-eye', label: 'Opis' },
  { id: 'prejav', icon: 'fas fa-microphone', label: 'Prejav' },
  { id: 'zivotopis', icon: 'fas fa-scroll', label: 'Životopis' },
  { id: 'diskusia', icon: 'fas fa-comments', label: 'Diskusia' }
]

export default function GeneratorCard() {
  const [selectedType, setSelectedType] = useState('')
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedType || !topic.trim()) {
      alert('Prosím, vyplň všetky polia!')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate generation delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setShowPreview(true)
      
      // Smooth scroll to preview
      setTimeout(() => {
        const previewElement = document.getElementById('essayPreview')
        if (previewElement) {
          previewElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
      
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      // ALWAYS reset button state
      setIsGenerating(false)
    }
  }

  return (
    <>
      <div className="essay-generator-card">
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
          Vygeneruj svoj sloh
        </h2>
        
        <form onSubmit={handleGenerate}>
          <div className="essay-types-grid">
            {essayTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className={`essay-type-btn ${selectedType === type.id ? 'selected' : ''}`}
                onClick={() => setSelectedType(type.id)}
                data-type={type.id}
              >
                <i className={type.icon}></i>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          <div className="topic-input-group">
            <label htmlFor="topicInput" className="topic-input-label">Téma slohu</label>
            <textarea
              id="topicInput"
              className="topic-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Napíš svoju tému... Napríklad: 'Zima v mojom meste', 'Moja budúcnosť', 'Význam priateľstva' atď."
              rows={4}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="generate-button"
              disabled={isGenerating || !selectedType || !topic.trim()}
            >
              {isGenerating ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Generujem...
                </>
              ) : (
                <>
                  <i className="fas fa-magic"></i>
                  Vygenerovať sloh
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Preview Section - appears below card */}
      {showPreview && (
        <div id="essayPreview" className="essay-preview-section">
          <h2>Osnova slohu</h2>
          <div className="preview-content">
            <div className="preview-item">
              <h3>📝 Štruktúra a osnova</h3>
              <ul>
                <li>Úvod - zaujímavý začiatok a predstavenie témy</li>
                <li>Hlavná časť - rozvinutie myšlienok s konkrétnymi príkladmi</li>
                <li>Záver - zhrnutie a osobné zamyslenie</li>
              </ul>
            </div>
            
            <div className="preview-item">
              <h3>🎯 Jazykové prostriedky na mieru</h3>
              <ul>
                <li>Vhodné slovesá pre dynamiku</li>
                <li>Prídavné mená pre atmosféru</li>
                <li>Metaforické vyjadrovanie</li>
              </ul>
            </div>
            
            <div className="preview-item">
              <h3>✨ Tipy pre úspech</h3>
              <ul>
                <li>Začnite zaujímavým úvodom</li>
                <li>Použite konkrétne príklady</li>
                <li>Zakončite silným záverom</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
