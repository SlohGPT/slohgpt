'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import type { Step } from '../../types'

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [highestStepReached, setHighestStepReached] = useState<Step>(1)
  const [selectedEssayType, setSelectedEssayType] = useState<string | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
  const [generatedContent, setGeneratedContent] = useState('')
  const [generationKey, setGenerationKey] = useState(0) // Force component remount
  const containerRef = useRef<HTMLDivElement>(null)

  const content = useMemo(() => {
    if (!selectedTopic) return ''
    // Repeat the selected number 10 times with spaces
    return Array.from({ length: 10 })
      .map(() => String(selectedTopic))
      .join(' ')
  }, [selectedTopic])

  const handleSelectType = (label: string, topicNum: number) => {
    setSelectedEssayType(label)
    setSelectedTopic(topicNum)
  }

  // NEW: helper to scroll to a given step card and center it
  const scrollToStep = (step: 1|2|3) => {
    const root = containerRef.current
    if (!root) return
    const card = root.querySelector(`[data-step="${step}"]`) as HTMLElement | null
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleGenerate = () => {
    setGeneratedContent(content)
    
    // If this is a regeneration (we've reached step 3 before), reset to fresh flow
    if (highestStepReached >= 3) {
      // First hide steps 2 & 3 by resetting current step
      setCurrentStep(1)
      setHighestStepReached(1)
      
      // Then after a brief moment, start the fresh sequence
      setTimeout(() => {
        setCurrentStep(2)
        setHighestStepReached(2)
        setGenerationKey(prev => prev + 1) // Force StepTwo to remount and restart
        setTimeout(() => scrollToStep(2), 120)
      }, 100) // Brief pause to show the reset
    } else {
      // First-time generation - normal flow
      setCurrentStep(2)
      setHighestStepReached(2)
      setGenerationKey(prev => prev + 1) // Force StepTwo to remount and restart
      setTimeout(() => scrollToStep(2), 120)
    }
  }

  const handleStepTwoDone = useCallback(() => {
    setCurrentStep(3)
    setHighestStepReached(3)
    setTimeout(() => scrollToStep(3), 120)
  }, [])

  // NEW: used by "choose another genre" - don't collapse steps, just scroll and open dropdown
  const handlePickAnotherGenre = () => {
    // Don't reset currentStep - keep steps 2 & 3 visible
    setTimeout(() => {
      scrollToStep(1)
      // ask StepOne to open its dropdown (StepOne will listen for this event)
      window.dispatchEvent(new CustomEvent('sgpt:open-genre-dropdown'))
    }, 120)
  }

  return (
    <section className="idemo-section" id="idemo-card">
      <div className="container idemo-container" ref={containerRef}>
        <div className="idemo-title-block">
          <h2 className="section-title">Interaktívna ukážka</h2>
          <p className="idemo-subtitle">Pozri, ako SlohGPT funguje v 3 krokoch</p>
        </div>

        <div className="idemo-progress" aria-label="Postup ukážky">
          {[1,2,3].map((n, idx) => (
            <div key={n} className="idemo-progress-item">
              <div
                className={`idemo-circle ${currentStep >= n ? 'is-active' : ''}`}
                aria-current={currentStep === n ? 'step' : undefined}
              >
                {n}
              </div>
              {idx < 2 && (
                <div className={`idemo-line ${currentStep > n ? 'is-active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        <div data-step="1">
          <StepOne
            selectedEssayType={selectedEssayType}
            selectedTopic={selectedTopic}
            onSelectType={handleSelectType}
            onGenerate={handleGenerate}
          />
        </div>

        {/* STEP 2 */}
        {currentStep >= 2 && (
          <div data-step="2">
            <StepTwo
              key={generationKey} // Force remount on new generation
              content={generatedContent}
              onDone={handleStepTwoDone}
            />
          </div>
        )}

        {/* STEP 3 */}
        {currentStep >= 3 && (
          <div data-step="3">
            <StepThree
              key={`step3-${generationKey}`} // Force remount on new generation
              content={generatedContent}
              onPickAnotherGenre={handlePickAnotherGenre}
            />
          </div>
        )}
      </div>
    </section>
  )
}