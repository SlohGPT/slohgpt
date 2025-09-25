'use client'

import { useState, useEffect } from 'react'
import { submitVote, getVoteCounts, subscribeToVoteUpdates, getUserVote } from '../../lib/voting'
import { VoteCount } from '../../lib/supabase-voting'
import PricingFAQ from '@/components/PricingFAQ'

export default function PricingPage() {
  const [voteCounts, setVoteCounts] = useState<VoteCount[]>([])
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [userVotes, setUserVotes] = useState<{ [key: string]: 'up' | 'down' | null }>({})
  const [isClient, setIsClient] = useState(false)
  const [essayQuantity, setEssayQuantity] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // CTA scroll functions
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToDemo = () => {
    // Scroll to homepage demo
    window.location.href = '/#idemo-card'
  }

  const scrollToPricing = () => {
    scrollTo('.sgpt-pricing-section')
  }

  // Cool section-by-section animation logic
  useEffect(() => {
    // Check if coming from homepage with pricing intent
    const urlParams = new URLSearchParams(window.location.search)
    const fromHomepage = urlParams.get('from') === 'homepage'
    const scrollToPricingSection = urlParams.get('scroll') === 'pricing'

    // Simple homepage-style animation
    const animatePage = async () => {
      // Small delay like homepage
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
      setShowContent(true)

      // If coming from homepage and should scroll to pricing
      if (fromHomepage && scrollToPricingSection) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        scrollToPricing()
        
        // Clean up URL parameters
        const newUrl = window.location.pathname
        window.history.replaceState({}, '', newUrl)
      }
    }

    animatePage()
  }, [])

  // Essay quantity and pricing functions - Psychologically optimized
  const basePrice = 7.99
  
  // Strategic discount tiers using psychological pricing principles:
  // 1. Anchor effect: Single essay establishes value perception
  // 2. Decoy effect: 2 essays create urgency without being too aggressive
  // 3. Scarcity principle: 3 essays feel like "sweet spot" 
  // 4. Loss aversion: 4 essays prevent "missing out" on bigger savings
  // 5. Social proof: 5 essays for "serious students" (premium positioning)
  const discounts = {
    1: 0,    // Anchor: Full price establishes value
    2: 7,    // Decoy: Small discount creates urgency (7% feels more significant than 5%)
    3: 12,   // Sweet spot: 12% feels substantial but not desperate
    4: 18,   // Loss aversion: 18% prevents missing bigger savings
    5: 25    // Premium: 25% for "serious students" (quarter off feels significant)
  }

  const calculatePrice = (quantity: number) => {
    const discount = discounts[quantity as keyof typeof discounts] || 0
    const totalPrice = basePrice * quantity
    const discountAmount = (totalPrice * discount) / 100
    let finalPrice = totalPrice - discountAmount
    
    // Strategic psychological rounding:
    // - .99 for premium feel (1 essay, 5 essays)
    // - .49 for value feel (2, 3, 4 essays)
    // This creates perceived value hierarchy
    if (quantity === 1 || quantity === 5) {
      finalPrice = Math.floor(finalPrice) + 0.99  // Premium positioning
    } else {
      finalPrice = Math.floor(finalPrice) + 0.49  // Value positioning
    }
    
    return {
      totalPrice: finalPrice,
      discount,
      originalPrice: totalPrice
    }
  }

  const currentPricing = calculatePrice(essayQuantity)

  // Dynamic price anchors for psychological pricing
  const getPriceAnchor = (quantity: number) => {
    const anchors = {
      1: "Menej ako jedna veľká pizza, čo zmizne za 10 minút 🍕",
      2: "Menej ako nové Nike ponožky, ktoré aj tak stratíš 🧦",
      3: "Menej ako 1 hodina súkromného doučka 🤓",
      4: "Menej ako piatok večer v meste 🥳",
      5: "Menej ako dve nočné jazdy taxíkom domov 🚕"
    }
    return anchors[quantity as keyof typeof anchors] || anchors[1]
  }

  // Ensure this only runs on client to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isDropdownOpen && !target.closest('.sgpt-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Timeline scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const timelineContainer = document.querySelector('.timeline-container')
      const timelineLine = document.getElementById('timeline-line')
      const numbers = document.querySelectorAll('.timeline-number')
      const contents = document.querySelectorAll('.timeline-content')
      
      if (!timelineContainer || !timelineLine || numbers.length === 0) return

      const containerRect = timelineContainer.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate timeline line height based on how much of the container is visible
      const visibleHeight = Math.max(0, windowHeight - containerRect.top)
      const totalHeight = containerRect.height + windowHeight
      const lineProgress = Math.min(1, visibleHeight / totalHeight)
      
      // Update timeline line height
      timelineLine.style.height = `${lineProgress * 100}%`
      
      // Show/hide both numbers and content based on when they reach the middle of the screen
      numbers.forEach((number, index) => {
        const numberElement = number as HTMLElement
        const contentElement = contents[index] as HTMLElement
        
        if (!contentElement) return
        
        // Get the position of this step relative to the viewport
        const stepRect = numberElement.getBoundingClientRect()
        const stepCenter = stepRect.top + (stepRect.height / 2)
        const screenCenter = windowHeight / 2
        
        // Step appears when its center reaches the middle of the screen
        const isVisible = stepCenter <= screenCenter + 100 // Add 100px buffer
        
        if (isVisible) {
          // Step is visible
          numberElement.classList.add('timeline-visible')
          contentElement.classList.add('timeline-visible')
        } else {
          // Step is not yet visible
          numberElement.classList.remove('timeline-visible')
          contentElement.classList.remove('timeline-visible')
        }
      })
    }

    // Initial call
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  // Hidden original cards (kept for future use)
  const hiddenPricingTiers = [
    {
      id: 1,
      name: "Rýchly Boost",
      price: "0.99 €",
      originalPrice: "2.99 €",
      discount: "67%",
      subtitle: "Personalizované nápady na sloh. <br/>Ideálne pre poslednú chvíľu.",
      microtext: "Stojí menej než 1 káva ☕",
      immediateFeatures: [
        "Okamžité tipy, ktoré tvoju prácu posunú o level vyššie",
        "Personalizované metafory a výrazy, ktoré zapôsobia na učiteľa"
      ],
      whyFeatures: [
        "Kľúčové frázy, aby si mal jasný smer",
        "Rýchly prehľad štruktúry, aby si neblúdil",
        "Okamžité výsledky bez čakania"
      ],
      icon: "fas fa-lightbulb",
      color: "from-blue-500 to-cyan-500",
      popular: false
    },
    {
      id: 2,
      name: "Tvoj coach v slohu",
      price: "4.99 €",
      originalPrice: "11.99 €",
      discount: "58%",
      subtitle: "Naučí ťa to, čo tvoja učiteľka<br/>nezvládla za 4 roky",
      microtext: "Stojí menej než 1 kebab 🌯",
      immediateFeatures: [
        "Tvoj AI učiteľ zistí, kde robíš chyby, a ukáže, čo zlepšiť",
        "Konkrétne odporúčania, ktoré ti pomôžu posunúť sa minimálne na dvojku"
      ],
      whyFeatures: [
        "Silnejšie úvody a závery, ktoré učitelia milujú",
        "Plynulejšie prechody medzi odstavcami",
        "Tipy prispôsobené tvojmu štýlu písania"
      ],
      icon: "fas fa-graduation-cap",
      color: "from-purple-500 to-pink-500",
      popular: true
    }
  ]

  // Current active pricing tier (middle card)
  const activePricingTier = {
      id: 3,
    name: "Complete Essay Auction",
      price: "14.99 €",
      originalPrice: "24.99 €",
      discount: "40%",
      subtitle: "Perfektný vzor, z ktorého sa naučíš ako má vyzerať jednotkársky sloh.",
      microtext: "Perfektný sloh za cenu pizze 🍕",
      immediateFeatures: [
        "Bezchybný ukážkový sloh na tvoju tému na jednotku",
        "Rozbor: prečo funguje štruktúra, výrazy a jazykové prostriedky"
      ],
      whyFeatures: [
        "Zistíš ako tento postup zopakuješ vo vlastnej práci",
        "Profesionálne upravený text bez chýb",
        "Dostaneš výsledok aj návod – aby si sa zlepšoval"
      ],
      icon: "fas fa-star",
      color: "from-cyan-500 to-blue-500",
    popular: true
  }

  // Consolidated, concise feature list for the active plan (max 4 bullets)
  const activeFeatures: string[] = [
    ...activePricingTier.immediateFeatures,
    ...activePricingTier.whyFeatures,
  ].slice(0, 4)

  // Coming soon cards data - just AI Coach now
  const comingSoonCards = [
    {
      id: 'ai-coach',
      name: "AI Coach",
      description: "Osobný AI tréner, ktorý ťa krok po kroku naučí písať lepšie slohy. Personalizované lekcie a tipy.",
      icon: "fas fa-graduation-cap",
      color: "from-purple-500 to-pink-500"
    }
  ]

  // Load vote counts and user votes on component mount (only on client)
  useEffect(() => {
    if (!isClient) return // Wait for client-side hydration
    
    const loadData = async () => {
      const counts = await getVoteCounts()
      setVoteCounts(counts)
      
      // Load user's current votes for each card
      const userVotePromises = comingSoonCards.map(async (card) => {
        const userVote = await getUserVote(card.id)
        return { cardId: card.id, vote: userVote }
      })
      
      const userVoteResults = await Promise.all(userVotePromises)
      const userVoteMap: { [key: string]: 'up' | 'down' | null } = {}
      userVoteResults.forEach(({ cardId, vote }) => {
        userVoteMap[cardId] = vote
      })
      setUserVotes(userVoteMap)
    }
    
    loadData()

    // Subscribe to real-time updates
    const subscription = subscribeToVoteUpdates((counts) => {
      setVoteCounts(counts)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [isClient])

  // Get upvote count for a specific card
  const getUpvoteCount = (cardId: string) => {
    const count = voteCounts.find(vc => vc.card_id === cardId)
    return count ? count.upvotes : 0
  }

  // Get downvote count for a specific card
  const getDownvoteCount = (cardId: string) => {
    const count = voteCounts.find(vc => vc.card_id === cardId)
    return count ? count.downvotes : 0
  }

  // Handle voting with real-time database updates
  const handleVote = async (cardId: string, voteType: 'up' | 'down') => {
    console.log('=== VOTE DEBUG START ===')
    console.log('Card ID:', cardId)
    console.log('Vote Type:', voteType)
    console.log('Current loading state:', loading[cardId])
    console.log('Current user vote:', userVotes[cardId])
    
    // Prevent multiple clicks
    if (loading[cardId]) {
      console.log('Already loading, returning')
      return
    }
    
    const currentUserVote = userVotes[cardId]
    console.log(`Current user vote for ${cardId}: ${currentUserVote}, clicking: ${voteType}`)
    
    console.log('Setting loading state to true')
    setLoading(prev => ({ ...prev, [cardId]: true }))
    
    try {
      console.log('Calling submitVote...')
      
      // Add timeout to prevent endless loading
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Vote timeout after 10 seconds')), 10000)
      );
      
      const result = await Promise.race([
        submitVote(cardId, voteType),
        timeoutPromise
      ]) as { success: boolean; error?: string; action?: 'new' | 'switched' }
      
      console.log('Submit vote result:', result)
      
      if (!result.success) {
        console.log('Vote failed:', result.error)
        showNotification(result.error || 'Chyba pri hlasovaní', 'error')
      } else {
        console.log('Vote successful, updating UI...')
        // Update user vote state immediately for UI feedback
        setUserVotes(prev => ({ ...prev, [cardId]: voteType }))
        
        // Manually refresh vote counts after successful vote
        console.log('Fetching updated vote counts...')
        const updatedCounts = await getVoteCounts()
        console.log('Updated vote counts after vote:', updatedCounts)
        setVoteCounts(updatedCounts)
        
        // Show success notification with animation
        if (result.action === 'switched') {
          showNotification('Hlas bol úspešne zmenený!', 'success')
        } else {
          showNotification('Hlas bol úspešne zaznamenaný!', 'success')
        }
        
        // Trigger button animation
        triggerVoteAnimation(cardId, voteType)
      }
    } catch (error) {
      console.error('Vote error:', error)
      showNotification('Chyba prihlasovania. Skúste to znova.', 'error')
    } finally {
      console.log('Setting loading state to false')
      setLoading(prev => ({ ...prev, [cardId]: false }))
      console.log('=== VOTE DEBUG END ===')
    }
  }

  // Trigger vote animation with confetti
  const triggerVoteAnimation = (cardId: string, voteType: 'up' | 'down') => {
    const button = document.querySelector(`[data-card-id="${cardId}"][data-vote-type="${voteType}"]`) as HTMLElement
    if (button) {
      button.classList.add('sgpt-vote-animate')
      
      // Create confetti effect
      if (voteType === 'up') {
        createConfettiEffect(button)
      } else {
        createDislikeEffect(button)
      }
      
      setTimeout(() => {
        button.classList.remove('sgpt-vote-animate')
      }, 1000)
    }
  }

  // Create confetti effect for upvote
  const createConfettiEffect = (button: HTMLElement) => {
    const confettiContainer = document.createElement('div')
    confettiContainer.className = 'sgpt-confetti-container'
    
    // Create multiple confetti pieces
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'sgpt-confetti-piece'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.animationDelay = Math.random() * 0.5 + 's'
      confettiContainer.appendChild(confetti)
    }
    
    button.appendChild(confettiContainer)
    
    // Remove confetti after animation
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer)
      }
    }, 2000)
  }


  // Create crack effect for downvote
  const createDislikeEffect = (button: HTMLElement) => {
    const cracksContainer = document.createElement('div')
    cracksContainer.className = 'sgpt-dislike-cracks'
    
    // Create crack lines
    for (let i = 0; i < 4; i++) {
      const crack = document.createElement('div')
      crack.className = 'sgpt-crack-line'
      crack.style.setProperty('--rotation', `${Math.random() * 60 - 30}deg`)
      cracksContainer.appendChild(crack)
    }
    
    button.appendChild(cracksContainer)
    
    // Remove cracks after animation
    setTimeout(() => {
      if (cracksContainer.parentNode) {
        cracksContainer.parentNode.removeChild(cracksContainer)
      }
    }, 1200)
  }

  // Notification system
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Show loading state during hydration to prevent mismatch
  // Temporarily disabled to debug the issue
  // if (!isClient) {
  //   return (
  //     <div className="pricing-page">
  //       <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
  //         <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
  //           Loading pricing options...
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }


  return (
    <div className="pricing-page">
      <div className={`pricing-content ${showContent ? 'content-visible' : 'content-hidden'}`}>
      {/* Notification */}
      {notification && (
        <div className={`sgpt-notification sgpt-notification-${notification.type}`}>
          <div className="sgpt-notification-content">
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Hero Section - Clean Homepage Style */}
      <section className="modern-hero pricing-hero-clean">
        <div className="hero-inner">
        <div className="container">
            <div className="hero-headline">
              <h1 className="modern-hero-title desktop-title">
                <span style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
                  Chceš písať slohy ako
                </span>
                <span style={{ display: 'block' }}>
                  <span className="text-gradient-primary">profesionál</span>?
                </span>
              </h1>
              <h1 className="modern-hero-title mobile-title">
                <span style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: '0.9em', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Slohy ako profesionál
                </span>
                <span className="text-gradient-primary" style={{ display: 'block', fontSize: '1.2em' }}>
                  SlohGPT
                </span>
              </h1>
              <p className="modern-hero-subtitle">
                Jeden nástroj, ktorý ti ukáže presne ako napísať sloh na jednotku.
              </p>
            </div>
          </div>
                  </div>
      </section>

      {/* Trust Elements Below Cards */}
      <div className="trust-mosaic-wrapper">
        <div className="guarantee-card">
          <div className="guarantee-icon">
            <i className="fas fa-shield-alt"></i>
                  </div>
          <div className="guarantee-text">
            <h3>7-dňová záruka spokojnosti</h3>
            <p>Ak nie si spokojný s výsledkom, vrátime ti peniaze bez otázok</p>
                    </div>
                </div>

        <div className="nucem-card">
          <div className="nucem-icon">
            <i className="fas fa-star"></i>
                  </div>
          <div className="nucem-text">
            <h3>NÚCEM kritériá</h3>
            <p>Všetky slohy sú vytvorené podľa oficiálnych NÚCEM kritérií</p>
                  </div>
                </div>
              </div>

      {/* Pricing Section */}
      <section className="sgpt-pricing-section">
        <div className="sgpt-pricing-bg" aria-hidden="true">
          <span className="sgpt-pricing-glow sgpt-pricing-glow--left floating" />
          <span className="sgpt-pricing-glow sgpt-pricing-glow--right floating" />
                </div>

        <div className="container">
          <div className="sgpt-pricing-mosaic">
            {/* Demo Card - Left Position */}
            <div className="sgpt-pricing-card sgpt-demo-card is-cut">
              <div className="sgpt-demo-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="sgpt-card-header">
                <h3 className="sgpt-plan-name">Vyskúšaj zadarmo</h3>
                <p className="sgpt-plan-description">Pozri si, ako funguje AI písanie</p>
                <p className="sgpt-demo-subtitle">Bezplatná ukážka bez registrácie</p>
              </div>
              <ul className="sgpt-features-list">
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Vyber žáner z 8 maturitných typov</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Zadaj tému a uvidíš prvých 5-7 viet</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Ukážky jazykových prostriedkov</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Metafory, prirovnania a vysvetlenia</span>
                </li>
              </ul>
              <button 
                className="sgpt-cta-button sgpt-demo-button"
                onClick={scrollToDemo}
                aria-label="Pozrieť demo"
              >
                <i className="fas fa-play"></i>
                Pozrieť demo
              </button>
            </div>

            {/* Quick Essay Plan - Now Popular/Middle - Slovak Content */}
            <div className="sgpt-pricing-card sgpt-quick-card is-cut sgpt-popular">
              <span className="sgpt-popular-badge">
                <i className="fas fa-star"></i> JEDINÁ DOSTUPNÁ MOŽNOSŤ
              </span>
              <div className="sgpt-card-header">
                <h3 className="sgpt-plan-name">Nauč sa písať lepšie</h3>
                <p className="sgpt-plan-description">Dostaneš sloh + návod ako na to</p>
                
                {/* Essay Quantity Dropdown */}
                <div className="sgpt-quantity-selector">
                  <label className="sgpt-quantity-label">Počet slohov:</label>
                  <div className="sgpt-dropdown-container">
                    <button 
                      className="sgpt-dropdown-button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      aria-label="Vybrať počet slohov"
                    >
                      <span>{essayQuantity} {essayQuantity === 1 ? 'sloh' : essayQuantity < 5 ? 'slohy' : 'slohov'}</span>
                      <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotated' : ''}`}></i>
                    </button>
                    {isDropdownOpen && (
                      <div className="sgpt-dropdown-menu">
                        {[1, 2, 3, 4, 5].map((quantity) => {
                          const pricing = calculatePrice(quantity)
                          return (
                            <button
                              key={quantity}
                              className={`sgpt-dropdown-item ${quantity === essayQuantity ? 'selected' : ''}`}
                              onClick={() => {
                                setEssayQuantity(quantity)
                                setIsDropdownOpen(false)
                              }}
                            >
                              <span className="quantity-text">
                                {quantity} {quantity === 1 ? 'sloh' : quantity < 5 ? 'slohy' : 'slohov'}
                              </span>
                              <span className="price-text">
                                €{pricing.totalPrice.toFixed(2)}
                                {pricing.discount > 0 && (
                                  <span className="discount-badge">-{pricing.discount}%</span>
                                )}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="sgpt-price-wrapper">
                  <span className="sgpt-currency">€</span>
                  <span className="sgpt-price">{currentPricing.totalPrice.toFixed(2)}</span>
                  <span className="sgpt-period">celkom</span>
                  {currentPricing.discount > 0 && (
                    <div className="sgpt-discount-info">
                      <span className="sgpt-original-price">€{currentPricing.originalPrice.toFixed(2)}</span>
                      <span className="sgpt-discount-badge">-{currentPricing.discount}%</span>
                </div>
                  )}
                </div>
                <p className="sgpt-price-anchor">{getPriceAnchor(essayQuantity)}</p>
              </div>
              <ul className="sgpt-features-list">
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Dodáme všetko, čo sľubuje demo</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Hotový sloh + vysvetlenie prečo funguje</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Naučíš sa štruktúru pre ďalšie slohy</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Zlepšíš si známku o 1-2 stupne</span>
                </li>
              </ul>
              <button 
                className="sgpt-cta-button sgpt-primary"
                onClick={async () => {
                  try {
                    // Redirect directly to Stripe checkout with custom pricing
                    const { redirectToCheckout } = await import('@/lib/stripe')
                    await redirectToCheckout(
                      process.env.NEXT_PUBLIC_STRIPE_COMPLETE_ESSAY_PRICE_ID!,
                      undefined, // email
                      currentPricing.totalPrice, // custom price
                      essayQuantity // quantity
                    )
                  } catch (error) {
                    console.error('Checkout error:', error)
                    // Fallback to pricing page if Stripe fails
                    window.location.href = '/pricing'
                  }
                }}
                aria-label={`Získať ${essayQuantity} ${essayQuantity === 1 ? 'sloh' : essayQuantity < 5 ? 'slohy' : 'slohov'} za €${currentPricing.totalPrice.toFixed(2)}`}
              >
                Získať {essayQuantity} {essayQuantity === 1 ? 'sloh' : essayQuantity < 5 ? 'slohy' : 'slohov'} za €{currentPricing.totalPrice.toFixed(2)}
              </button>
            </div>

            {/* Premium Plan */}
            <div className="sgpt-pricing-card sgpt-coming-soon is-cut">
              <div className="sgpt-card-header">
                <h3 className="sgpt-plan-name">AI Tréner písania</h3>
                <p className="sgpt-plan-description">Neobmedzené cvičenia s hodnotením</p>
                <div className="sgpt-coming-soon-price">
                  <span className="sgpt-coming-soon-badge-inline">
                    <i className="fas fa-clock"></i> PRIPRAVUJEME
                  </span>
                </div>
              </div>
              <ul className="sgpt-features-list">
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Individuálny tréning písania – AI vysvetlí „prečo"</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Neobmedzené cvičenia + hodnotenie podľa NÚCEM</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>„Uč sa na chybách": označí slabé miesta</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Interaktívne cvičenia pre všetky 8 žánrov</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Osobné tipy a stratégie písania</span>
                </li>
                <li className="sgpt-feature-item">
                  <span className="sgpt-feature-icon sgpt-check">
                    <i className="fas fa-check"></i>
                  </span>
                  <span>Pokročilé hodnotenie podľa kritérií NÚCEM</span>
                </li>
              </ul>
              <div className="sgpt-vote-section">
                <p className="sgpt-vote-description">Chceš, aby sme AI Coach spustili ako prvý?</p>
                <div className="sgpt-vote-buttons">
                  <button 
                    className={`sgpt-vote-button sgpt-vote-up ${userVotes['ai-coach'] === 'up' ? 'active' : ''}`}
                    data-card-id="ai-coach"
                    data-vote-type="up"
                    onClick={() => handleVote('ai-coach', 'up')}
                    disabled={loading['ai-coach']}
                  >
                    <i className="fas fa-thumbs-up"></i> Áno
                    {getUpvoteCount('ai-coach') > 0 && (
                      <span className="sgpt-vote-count">({getUpvoteCount('ai-coach')})</span>
                    )}
                  </button>
                  <button 
                    className={`sgpt-vote-button sgpt-vote-down ${userVotes['ai-coach'] === 'down' ? 'active' : ''}`}
                    data-card-id="ai-coach"
                    data-vote-type="down"
                    onClick={() => handleVote('ai-coach', 'down')}
                    disabled={loading['ai-coach']}
                  >
                    <i className="fas fa-thumbs-down"></i> Nie
                    {getDownvoteCount('ai-coach') > 0 && (
                      <span className="sgpt-vote-count">({getDownvoteCount('ai-coach')})</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Elements */}
          <div className="sgpt-trust-section">
            <div className="sgpt-trust-badges">
              <div className="sgpt-trust-item">
              <i className="fas fa-shield-alt"></i>
                <span>Zabezpečené platby cez Stripe</span>
            </div>
              <div className="sgpt-trust-item">
                <i className="fas fa-lock"></i>
                <span>SSL šifrovanie</span>
              </div>
              <div className="sgpt-trust-item">
                <i className="fas fa-user-shield"></i>
                <span>GDPR compliant</span>
              </div>
            </div>
          </div>
            </div>
      </section>

      {/* Modern Comparison Table */}
      <div className="sgpt-comparison-modern">
        <div className="sgpt-comparison-header">
          <h2>SlohGPT vs Bežné AI</h2>
          <p>Pozri si rozdiel medzi špecializovaným nástrojom a všeobecným AI</p>
        </div>
        
        <div className="sgpt-comparison-container">
          <div className="sgpt-comparison-table-modern">
            <div className="sgpt-table-header">
              <div className="sgpt-table-feature-column">
              </div>
              <div className="sgpt-table-slohgpt-column">
                <div className="sgpt-brand-logo">
                  <div className="sgpt-logo-wrapper">
                    <img src="/white-outline.png" alt="SlohGPT" className="sgpt-logo-full" />
                    <img src="/slohgpt-pencil.png" alt="SlohGPT Pencil Logo" className="sgpt-logo-icon" />
                  </div>
                  </div>
                </div>
              <div className="sgpt-table-generic-column">
                <div className="sgpt-brand-logo">
                  <div className="generic-logo-wrapper">
                    <img src="/logo-ai.png" alt="Generic AI" className="generic-logo-full" />
                    <img src="/generic-ai-logo.png" alt="Generic AI Compact Logo" className="generic-logo-icon" />
                  </div>
                </div>
                
              </div>
            </div>
            
            <div className="sgpt-table-body">
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-school"></i>
                  <span>Špecializácia pre slovenské školy</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-list-alt"></i>
                  <span>Vstavané typy slohov</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-language"></i>
                  <span>Slovenský jazyk a kultúra</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-mouse-pointer"></i>
                  <span>Jednoduché ovládanie</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-star"></i>
                  <span>NÚCEM hodnotiace kritériá</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
              
              <div className="sgpt-table-row">
                <div className="sgpt-feature-name">
                  <i className="fas fa-clock"></i>
                  <span>Okamžité výsledky</span>
                </div>
                <div className="sgpt-feature-slohgpt">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="sgpt-feature-generic">
                  <i className="fas fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="how-it-works-header">
            <h2>Ako to funguje?</h2>
            <p>Jednoduchý proces v 4 krokoch</p>
            </div>
            
          <div className="timeline-container">
            <div className="timeline-line" id="timeline-line"></div>
            
            <div className="timeline-step" data-step="1">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3>Vyber si typ slohu</h3>
                <p>Rozhodni sa medzi úvahou, charakteristikou, rozprávaním alebo iným typom slohu, ktorý potrebuješ napísať.</p>
                <div className="timeline-icon">
                  <i className="fas fa-list"></i>
                </div>
                </div>
              </div>

            <div className="timeline-step" data-step="2">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3>Napíš svoju tému</h3>
                <p>Zadaj konkrétnu tému alebo otázku, na ktorú máš písať sloh. Môžeš pridať aj ďalšie detaily.</p>
                <div className="timeline-icon">
                  <i className="fas fa-keyboard"></i>
                </div>
                  </div>
                </div>
                
            <div className="timeline-step" data-step="3">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3>Dostaneš hotový sloh</h3>
                <p>AI vygeneruje kompletný sloh podľa tvojich požiadaviek s profesionálnou štruktúrou a jazykovými prostriedkami.</p>
                <div className="timeline-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
              </div>
            </div>

            <div className="timeline-step" data-step="4">
              <div className="timeline-number">4</div>
              <div className="timeline-content">
                <h3>Naučíš sa z toho</h3>
                <p>Dostaneš aj vysvetlenie, prečo sloh funguje, aby si mohol aplikovať tieto techniky v budúcich prácach.</p>
                <div className="timeline-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="how-it-works-cta">
            <div className="cta-buttons-row">
              <button 
                className="cta-button-demo"
                onClick={() => {
                  console.log('Demo CTA clicked!')
                  scrollToDemo()
                }}
                aria-label="Vyskúšať demo zdarma"
              >
                <i className="fas fa-rocket"></i>
                Demo zdarma
            </button>
              
              <button 
                className="cta-button-pricing"
                onClick={() => {
                  console.log('Pricing CTA clicked!')
                  scrollToPricing()
                }}
                aria-label="Pozrieť ceny"
              >
                <i className="fas fa-tags"></i>
                Ceny
              </button>
            </div>
            <p className="cta-note">Začni už dnes - bez registrácie</p>
          </div>
        </div>
      </section>

      {/* Simple Trust Section */}
      <section className="simple-trust-section">
        <div className="container">
          <div className="trust-content">
            <div className="trust-badge">
              <i className="fas fa-seedling"></i>
              <span>Sme tu noví</span>
            </div>
            <h2>Úprimne hovoríme</h2>
            <p>SlohGPT je nový projekt. Ešte nie sme dokonalí, ale každý deň sa zlepšujeme. Chceme ťa naučiť písať lepšie slohy, nie len ti dať hotový text na kopírovanie.</p>
            
            <div className="trust-points">
              <div className="trust-point">
                  <i className="fas fa-graduation-cap"></i>
                <div>
                  <h4>Učíme ťa myslieť</h4>
                  <p>Každý sloh obsahuje vysvetlenie prečo funguje</p>
                </div>
              </div>
              
              <div className="trust-point">
                <i className="fas fa-tools"></i>
                <div>
                  <h4>Neustále sa zlepšujeme</h4>
                  <p>Každý týždeň pridávame nové funkcie a vylepšujeme kvalitu</p>
            </div>
          </div>

              <div className="trust-point">
                <i className="fas fa-rocket"></i>
                <div>
                  <h4>AI Coach prichádza</h4>
                  <p>Pracujeme na AI Trénerovi, ktorý ťa naučí písať slohy krok za krokom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <PricingFAQ />

      {/* Final CTA Section */}
      <section id="final-cta" className="final-cta-section">
        <div className="container">
          <div className="final-cta-card">
            <div className="final-cta-content">
              <h2 className="final-cta-title">
                <span className="title-line">Tvoj sloh môže byť hotový</span>
                <span className="title-line accent">za 2 minúty</span>
              </h2>
              <p className="final-cta-sub">
                Prestaň sa trápiť s prázdnym papierom. Začni písať lepšie slohy už dnes.
              </p>

              <div className="final-cta-actions">
              <button 
                className="cta-primary"
                onClick={async () => {
                  try {
                    // Redirect directly to Stripe checkout
                    const { redirectToCheckout } = await import('@/lib/stripe')
                    await redirectToCheckout(process.env.NEXT_PUBLIC_STRIPE_COMPLETE_ESSAY_PRICE_ID!)
                  } catch (error) {
                    console.error('Checkout error:', error)
                    // Fallback to pricing page if Stripe fails
                    window.location.href = '/pricing'
                  }
                }}
                aria-label="Začať teraz za €7.99"
              >
                ✨ Začať teraz - €7.99
            </button>

                <button 
                  className="cta-secondary"
                  onClick={scrollToDemo}
                  aria-label="Vyskúšať demo zdarma"
                >
                  Vyskúšať demo zdarma
                </button>
              </div>

              <ul className="final-cta-bullets">
                <li>30 sekúnd na demo</li>
                <li>Žiadna registrácia</li>
                <li>Okamžitý výsledok</li>
              </ul>
              
              <p className="final-cta-reassurance">
                Pripoj sa k stovkám študentov, ktorí už píšu lepšie slohy
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
