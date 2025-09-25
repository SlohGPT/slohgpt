'use client'

import { useState, useEffect, useRef } from 'react'
import { BookOpen } from 'lucide-react'
import { ESSAY_TYPES } from '../../types'

export default function StepOne({
  selectedEssayType,
  selectedTopic,
  onSelectType,
  onGenerate,
}: {
  selectedEssayType: string | null
  selectedTopic: number | null
  onSelectType: (label: string, topicNum: number) => void
  onGenerate: () => void
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLUListElement>(null)
  const topicPlaceholderRef = useRef<HTMLDivElement>(null)
  const canGenerate = Boolean(selectedEssayType && selectedTopic)

  const handleSelectType = (label: string, topicNum: number, autoGenerate: boolean = false) => {
    onSelectType(label, topicNum)
    setIsDropdownOpen(false)

    // Only auto-generate if explicitly requested (not for manual selections)
    if (autoGenerate && hasGeneratedOnce) {
      // tiny delay so close animation/layout settles
      setTimeout(() => { onGenerate() }, 120)
    }
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Listen for dropdown open command from parent
  useEffect(() => {
    const open = () => setIsDropdownOpen(true)
    window.addEventListener('sgpt:open-genre-dropdown', open)
    return () => window.removeEventListener('sgpt:open-genre-dropdown', open)
  }, [])

  // Auto-scroll to selected option when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && selectedEssayType && optionsRef.current) {
      // Use requestAnimationFrame for instant positioning
      requestAnimationFrame(() => {
        const selectedOption = optionsRef.current?.querySelector('.idemo-option.selected') as HTMLElement
        if (selectedOption && optionsRef.current) {
          const optionsContainer = optionsRef.current
          const scrollTop = selectedOption.offsetTop - (optionsContainer.clientHeight / 2) + (selectedOption.clientHeight / 2)
          
          // Direct scrollTop assignment for instant positioning
          optionsContainer.scrollTop = Math.max(0, scrollTop)
        }
      })
    }
  }, [isDropdownOpen, selectedEssayType])

  // Blend topic placeholder with dropdown background on mobile when genre dropdown is open
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    
    if (isMobile && topicPlaceholderRef.current) {
      if (isDropdownOpen) {
        // Make topic placeholder blend with dropdown background
        topicPlaceholderRef.current.style.setProperty('background', 'rgba(11,14,26,1)', 'important') // Fully opaque to block shadows
        topicPlaceholderRef.current.style.setProperty('color', 'rgba(11,14,26,1)', 'important')
        topicPlaceholderRef.current.style.setProperty('border', '1px solid rgba(255,255,255,0.2)', 'important')
        topicPlaceholderRef.current.style.setProperty('border-top', 'none', 'important') // Remove top border to blend
        topicPlaceholderRef.current.style.setProperty('border-radius', '0 0 12px 12px', 'important') // Only bottom corners
        topicPlaceholderRef.current.style.setProperty('margin-top', '-1px', 'important') // Close gap
        topicPlaceholderRef.current.style.setProperty('box-shadow', 'none', 'important') // Remove any shadows
        topicPlaceholderRef.current.style.setProperty('position', 'relative', 'important') // Ensure it's above shadows
        topicPlaceholderRef.current.style.setProperty('z-index', '999', 'important') // Above shadow effects
        topicPlaceholderRef.current.style.setProperty('transition', 'all 0.2s ease', 'important')
        // Make all child elements invisible and remove their borders
        const children = topicPlaceholderRef.current.querySelectorAll('*')
        children.forEach((child: Element) => {
          if (child instanceof HTMLElement) {
            child.style.setProperty('color', 'transparent', 'important')
            child.style.setProperty('background', 'rgba(11,14,26,0.99)', 'important')
            child.style.setProperty('border', 'none', 'important')
            child.style.setProperty('box-shadow', 'none', 'important')
            child.style.setProperty('outline', 'none', 'important')
          }
        })
      } else {
        // Restore original styling when dropdown is closed
        topicPlaceholderRef.current.style.removeProperty('background')
        topicPlaceholderRef.current.style.removeProperty('color')
        topicPlaceholderRef.current.style.removeProperty('border')
        topicPlaceholderRef.current.style.removeProperty('border-top')
        topicPlaceholderRef.current.style.removeProperty('border-radius')
        topicPlaceholderRef.current.style.removeProperty('margin-top')
        topicPlaceholderRef.current.style.removeProperty('box-shadow')
        topicPlaceholderRef.current.style.removeProperty('position')
        topicPlaceholderRef.current.style.removeProperty('z-index')
        topicPlaceholderRef.current.style.removeProperty('transition')
        // Restore child elements
        const children = topicPlaceholderRef.current.querySelectorAll('*')
        children.forEach((child: Element) => {
          if (child instanceof HTMLElement) {
            child.style.removeProperty('color')
            child.style.removeProperty('background')
            child.style.removeProperty('border')
            child.style.removeProperty('box-shadow')
            child.style.removeProperty('outline')
          }
        })
      }
    }
  }, [isDropdownOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <div className={`idemo-card ${isDropdownOpen ? 'idemo-card--menu-open' : ''}`}>
      <div className="idemo-header">
        <div className="idemo-header-icon" style={{
          width: 64,
          height: 64,
          borderRadius: 9999,
          position: "relative",
          display: "grid",
          placeItems: "center",
          background: `radial-gradient(120px 120px at 50% 40%, rgba(94,60,246,0.35) 0%, rgba(0,0,0,0.0) 65%), 
                       radial-gradient(120px 120px at 50% 60%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.0) 70%)`,
          boxShadow: `0 12px 30px rgba(94,60,246,0.35), inset 0 1px 0 rgba(255,255,255,0.06)`,
          border: `2px solid rgba(94,60,246,0.65)`,
        }}>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 9999,
              boxShadow: `0 0 60px 16px rgba(94,60,246,0.35)`,
              filter: "blur(2px)",
              opacity: 0.55,
            }}
          />
          <BookOpen style={{ width: 28, height: 28, color: "#5E3CF6" }} />
        </div>
        <h3 className="idemo-title" style={{
          background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(250 85% 70%))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}>Krok 1: Vyber žáner a tému</h3>
      </div>
      
      <div className="idemo-inputs">
        <div className="idemo-input-group">
          <label className="idemo-label">Žáner slohu</label>
          <div className="idemo-dropdown" ref={dropdownRef}>
            <button 
              className={`idemo-select ${selectedEssayType ? 'selected' : ''}`}
              aria-haspopup="listbox" 
              aria-expanded={isDropdownOpen}
              onClick={handleDropdownToggle}
            >
              <i className="fas fa-books"></i>
              <span className="idemo-select-text">
                {selectedEssayType ?? 'Vyber typ slohu'}
              </span>
              <i className="fas fa-chevron-down"></i>
            </button>
            {isDropdownOpen && (
              <ul className="idemo-options" role="listbox" ref={optionsRef}>
                {ESSAY_TYPES.map((t) => {
                  const isSelected = selectedEssayType === `${t.label} ${t.emoji}`
                  return (
                    <li key={t.id} role="option">
                      <button 
                        className={`idemo-option ${isSelected ? 'selected' : ''}`} 
                        onClick={() => handleSelectType(`${t.label} ${t.emoji}`, t.id)}
                      >
                        <span className="idemo-emoji" aria-hidden>
                          {t.emoji}
                        </span>
                        {t.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="idemo-input-group" ref={topicPlaceholderRef}>
          <label className="idemo-label">Téma</label>
          <div className="idemo-dropdown disabled">
            <div className="idemo-select" aria-disabled="true">
              <i className="fas fa-lightbulb"></i>
              <span className="idemo-select-text">
                {selectedTopic ? `Téma ${selectedTopic}` : 'Vyber tému slohu'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button className="idemo-generate-btn" disabled={!canGenerate} onClick={() => { onGenerate(); setHasGeneratedOnce(true) }}>
        <i className="fas fa-bolt"></i>
        Generuj sloh
      </button>
    </div>
  )
}


