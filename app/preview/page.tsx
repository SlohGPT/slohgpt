'use client'

import { useState, useEffect } from 'react'

export default function PreviewPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Animation states for typewriter effect (same as announcement page)
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [startTopic, setStartTopic] = useState(false)
  const [startContent, setStartContent] = useState(false)
  const [showCaret, setShowCaret] = useState(false)
  const [genreText, setGenreText] = useState('')
  const [topicText, setTopicText] = useState('')
  const [contentText, setContentText] = useState('')
  
  // Demo data sets (same as announcement page)
  const demoSets = [
    {
      genre: "Úvaha",
      topic: "Technológie v živote mladých ľudí",
      text: `     Niekedy mám pocit, že bez telefónu by som už ani nevedel fungovať. Keď ráno otvorím oči, prvé, čo urobím, je, že pozriem, koľko je hodín a hneď potom otvorím Instagram. Je to normálne? Alebo sme si len zvykli, že obrazovka je dôležitejšia než rozhovor s človekom vedľa nás?
     Pravdupovediac, technológie mi dali aj veľa dobrého. Naučil som sa cez internet hrať na gitaru, spoznal ľudí, ktorých by som inak nikdy nestretol a v ťažkých chvíľach som sa necítil tak sám. Ale čím viac času trávim online, tým viac si uvedomujem, že hranica medzi tým dobrým a tým zlým je ako ľad. Internet sám o sebe nie je zlý, ide len o to, ako ho používame...`
    },
    {
      genre: "Rozprávanie",
      topic: "Môj najobľúbenejší výlet",
      text: `     „Vstávaj, ideme do hôr!" Otcov hlas ma zobudil zo sna skôr, než som sa stihol pozrieť, koľko je hodín. Bolo nedeľné ráno, vonku ešte tma a mne sa nechcelo ani pohnúť. Najradšej by som sa otočil na druhý bok a spal ďalej, ale batohy už stáli pri dverách a otec sa usmieval tým svojím výrazom, ktorý nezniesol žiadne nie.
     O chvíľu sme už sedeli v aute smerom do Tatier. Mama ticho driemala na prednom sedadle, brat mal v ušiach slúchadlá a ja som sledoval krajinu za oknom. Pomaly sa prebúdzala. V domoch sa rozsvecovali svetlá, na poliach sa preháňala ranná hmla a spoza kopcov sa plazili prvé lúče slnka. Vtedy som ešte netušil, že práve tento deň si budem pamätať celý svoj život...`
    },
    {
      genre: "Charakteristika",
      topic: "Môj obľúbený literárny hrdina",
      text: `     Keď som prvýkrát čítal Harryho Pottera, bol som ešte dieťa a úprimne, čakal som len napínavý príbeh o kúzlach. Ale čím som starší, tým viac si uvedomujem, že práve Harry ma naučil veľa o tom, čo znamená nevzdať sa, aj keď má človek pocit, že je úplne sám. Možno preto ho považujem za svojho obľúbeného literárneho hrdinu. Nie preto, že je „vyvolený", ale preto, že je obyčajný chalan, ktorý sa snaží robiť správne veci.
     Na začiatku je to len chlapec, ktorý býva v komore pod schodami a cíti sa zbytočný. Nemá rodičov, nikto ho nemá rád a zrazu zistí, že je čarodejník. Väčšina ľudí by asi zbláznila od radosti, ale on skôr ticho prijíma, čo prichádza. Na Rokforte síce robí chyby, ale vždy sa snaží stáť na strane dobra, aj keď ho to vždy niečo stojí. Práve to sa mi na ňom páči. Odvaha pre neho neznamená nemať strach, ale ísť ďalej aj s ním...`
    }
  ]

  // Hide all layout components
  useEffect(() => {
    // Hide header
    const header = document.querySelector('header')
    if (header) header.style.display = 'none'
    
    // Hide footer
    const footer = document.querySelector('footer')
    if (footer) footer.style.display = 'none'
    
    // Hide floating background
    const floatingBg = document.getElementById('global-floating-bg')
    if (floatingBg) floatingBg.style.display = 'none'
    
    // Hide sticky CTA
    const stickyCTA = document.querySelector('[data-sticky-cta]') as HTMLElement
    if (stickyCTA) stickyCTA.style.display = 'none'
    
    // Hide announcement controller
    const announcementController = document.querySelector('[data-announcement-controller]') as HTMLElement
    if (announcementController) announcementController.style.display = 'none'
    
    // Set body styles
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.background = '#1a1a1a'
    document.body.style.color = 'white'
    document.body.style.overflowX = 'hidden'
    
    // Check if mobile and add loading delay
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      // Add a small delay to ensure smooth loading
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } else {
      setIsLoading(false)
    }
    
    return () => {
      // Restore elements when leaving
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
      if (floatingBg) floatingBg.style.display = ''
      if (stickyCTA) stickyCTA.style.display = ''
      if (announcementController) announcementController.style.display = ''
    }
  }, [])

  // Typewriter animation (same as announcement page)
  useEffect(() => {
    let genreTimeout: NodeJS.Timeout
    let topicTimeout: NodeJS.Timeout
    let contentTimeout: NodeJS.Timeout
    
    const animatePreview = () => {
      const currentSet = demoSets[currentSetIndex]
      const genreFull = `Žáner: ${currentSet.genre}`
      
      // Reset all flags
      setStartTopic(false)
      setStartContent(false)
      setShowCaret(false)
      setGenreText('')
      setTopicText('')
      setContentText('')
      
      // Start genre animation
      let genreIdx = 0
      const typeGenre = () => {
        if (genreIdx < genreFull.length) {
          setGenreText(genreFull.substring(0, genreIdx + 1))
          genreIdx++
          genreTimeout = setTimeout(typeGenre, 60)
        } else {
          // Start topic animation
          topicTimeout = setTimeout(() => {
            setStartTopic(true)
            let topicIdx = 0
            const topicFull = 'Téma: „' + currentSet.topic + '"'
            const typeTopic = () => {
              if (topicIdx < topicFull.length) {
                setTopicText(topicFull.substring(0, topicIdx + 1))
                topicIdx++
                topicTimeout = setTimeout(typeTopic, 60)
              } else {
                // Start content animation
                setTimeout(() => {
                  setStartContent(true)
                  let contentIdx = 0
                  // On mobile, show only first paragraph with ellipsis
                  const isMobile = window.innerWidth <= 768
                  let contentFull = currentSet.text
                  
                  if (isMobile) {
                    // Limit to maximum 5 rows on mobile
                    const words = contentFull.split(' ')
                    let limitedText = ''
                    let lineCount = 0
                    const maxLines = 5
                    const charsPerLine = 50 // Approximate characters per line
                    
                    for (let i = 0; i < words.length; i++) {
                      const testText = limitedText + (limitedText ? ' ' : '') + words[i]
                      const currentLineCount = Math.ceil(testText.length / charsPerLine)
                      
                      if (currentLineCount > maxLines) {
                        limitedText += '...'
                        break
                      }
                      limitedText = testText
                    }
                    contentFull = limitedText
                  }
                  
                  const typeContent = () => {
                    if (contentIdx < contentFull.length) {
                      setContentText(contentFull.substring(0, contentIdx + 1))
                      contentIdx++
                      contentTimeout = setTimeout(typeContent, 30)
                    } else {
                      // Show caret
                      setShowCaret(true)
                      // Cycle to next set after delay
                      setTimeout(() => {
                        setCurrentSetIndex((prev) => (prev + 1) % demoSets.length)
                      }, 3000)
                    }
                  }
                  typeContent()
                }, 500)
              }
            }
            typeTopic()
          }, 500)
        }
      }
      typeGenre()
    }
    
    // Start animation
    animatePreview()
    
    return () => {
      clearTimeout(genreTimeout)
      clearTimeout(topicTimeout)
      clearTimeout(contentTimeout)
    }
  }, [currentSetIndex])

  const createConfetti = () => {
    const confettiContainer = document.createElement('div')
    confettiContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      overflow: hidden;
    `
    document.body.appendChild(confettiContainer)
    
    // Get screen center
    const screenCenterX = window.innerWidth / 2
    const screenCenterY = window.innerHeight / 2
    
    // Optimized confetti count for instant rendering
    const confettiCount = 80
    const shapes = ['square', 'circle', 'triangle']
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
    
    // Create ALL confetti immediately - no batching delays
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      
      // Random shape and color
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      // Base styles
      confetti.style.position = 'absolute'
      confetti.style.pointerEvents = 'none'
      confetti.style.opacity = '1'
      
      // Shape-specific styles
      if (shape === 'triangle') {
        confetti.style.borderLeft = '4px solid transparent'
        confetti.style.borderRight = '4px solid transparent'
        confetti.style.borderBottom = `8px solid ${color}`
        confetti.style.width = '0'
        confetti.style.height = '0'
        confetti.style.background = 'transparent'
      } else {
        confetti.style.background = color
        confetti.style.width = '8px'
        confetti.style.height = '8px'
      }
      
      if (shape === 'circle') {
        confetti.style.borderRadius = '50%'
      } else if (shape === 'square') {
        confetti.style.borderRadius = '0'
      }
      
      // Starting position (screen center)
      confetti.style.left = screenCenterX + 'px'
      confetti.style.top = screenCenterY + 'px'
      
      confettiContainer.appendChild(confetti)
      
      // Animation with physics - start immediately
      animateConfetti(confetti, screenCenterX, screenCenterY)
    }
  }

  const animateConfetti = (confetti: HTMLElement, startX: number, startY: number) => {
    // Explosive initial velocity for instant visual impact
    const initialVelocityX = (Math.random() - 0.5) * 40 // Maximum horizontal spread
    const initialVelocityY = -(Math.random() * 20 + 20) // Maximum upward velocity
    const gravity = 0.8 // Strong gravity for fast fall
    const drag = 0.97 // More drag for realistic physics
    const rotationSpeed = (Math.random() - 0.5) * 25 // Maximum rotation
    
    let velocityX = initialVelocityX
    let velocityY = initialVelocityY
    let positionX = startX
    let positionY = startY
    let rotation = 0
    let opacity = 1
    
    const animate = () => {
      // Apply gravity to Y velocity
      velocityY += gravity
      
      // Apply drag to both velocities
      velocityX *= drag
      velocityY *= drag
      
      // Update positions
      positionX += velocityX
      positionY += velocityY
      rotation += rotationSpeed
      
      // Fade out very quickly for snappy feel
      if (positionY > startY + 250) {
        opacity -= 0.04
      }
      
      // Apply transforms
      confetti.style.left = positionX + 'px'
      confetti.style.top = positionY + 'px'
      confetti.style.transform = `rotate(${rotation}deg)`
      confetti.style.opacity = opacity.toString()
      
      // Continue animation with expanded bounds for full screen coverage
      if (opacity > 0 && positionY < window.innerHeight + 200 && 
          positionX > -200 && positionX < window.innerWidth + 200) {
        requestAnimationFrame(animate)
      } else {
        // Remove confetti when done
        confetti.remove()
      }
    }
    
    // Start animation immediately - no delays
    requestAnimationFrame(animate)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'polacek') {
      // Create confetti effect FIRST - before any other changes
      setTimeout(() => {
        createConfetti()
      }, 100)
      
      // Set authenticated session in localStorage and cookie
      localStorage.setItem('preview_authenticated', 'true')
      localStorage.setItem('announcement_shown', 'true')
      
      // Set cookie for server-side middleware access
      document.cookie = 'preview_authenticated=true; path=/; max-age=86400' // 24 hours
      document.cookie = 'announcement_shown=true; path=/; max-age=86400'
      
      setIsAuthenticated(true)
      setError('')
      
      // Redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    } else {
      setError('Nesprávne heslo')
    }
  }

  if (isAuthenticated) {
    return (
      <>
        <style jsx global>{`
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #1a1a1a !important;
            color: white !important;
            overflow-x: hidden !important;
          }
          header {
            display: none !important;
          }
          footer {
            display: none !important;
          }
          #global-floating-bg {
            display: none !important;
          }
          [data-sticky-cta] {
            display: none !important;
          }
          [data-announcement-controller] {
            display: none !important;
          }
          
          /* Hide right section on mobile in success page */
          @media (max-width: 768px) {
            .hide-right-on-mobile-success {
              display: none !important;
            }
            
            /* Make left section full width on mobile */
            .left-section-success {
              width: 100% !important;
              flex: 1 1 100% !important;
            }
          }
        `}</style>
        
      {/* Split screen layout like login.html and announcement page */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        background: '#1a1a1a',
        overflow: 'hidden'
      }}>
        {/* Left Section - Success Message */}
        <div 
          className="left-section-success"
          style={{
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '3rem 2rem',
            width: '50%',
            flex: '0 0 50%',
          }}
        >
          <div style={{ width: '100%', maxWidth: '450px', color: 'white' }}>
            {/* Logo */}
            <div style={{ marginBottom: '1rem' }}>
              <img src="/original-logo-without-background.png" alt="SlohGPT" style={{ height: '50px', width: 'auto', filter: 'brightness(0) saturate(100%) invert(100%)', marginLeft: '-21px' }} />
            </div>

            <div style={{ textAlign: 'left' }}>
              {/* Success Title */}
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '1rem', textAlign: 'left' }}>
                Správne heslo!
              </h1>
              
              {/* Checkmark */}
              <div style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '1.5rem', textAlign: 'left' }}>✓</div>
              
              {/* Main confirmation */}
              <p style={{ color: '#9ca3af', marginBottom: '1rem', lineHeight: 1.5, textAlign: 'left', fontSize: '0.9rem' }}>
                Presmerovávame na hlavnú stránku...
              </p>
              
              {/* Loading indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(94, 60, 246, 0.3)',
                  borderTop: '2px solid #5E3CF6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                  Presmerovávame...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Floating Background */}
        <div style={{
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          width: '50%',
          flex: '0 0 50%',
        }}
        className="hide-right-on-mobile-success"
        >
          <div style={{ 
            width: '100%', 
            background: '#0b0e1a', 
            borderRadius: 'calc(0.5rem * 1.5)', 
            position: 'relative', 
            overflow: 'hidden',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '100%'
          }}>
            {/* Floating Background Elements */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
              {/* Floating Icons */}
              {[
                { left: '10%', top: '20%', delay: 0, color: '#00E0FF' },
                { left: '20%', top: '60%', delay: 1.5, color: '#A855F7' },
                { left: '70%', top: '30%', delay: 0.8, color: '#5E3CF6' },
                { left: '80%', top: '70%', delay: 2.2, color: '#00E0FF' },
                { left: '50%', top: '15%', delay: 1.2, color: '#A855F7' },
                { left: '30%', top: '80%', delay: 0.6, color: '#5E3CF6' },
              ].map((icon, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: icon.left,
                    top: icon.top,
                    animation: `float 4s ease-in-out infinite`,
                    animationDelay: `${icon.delay}s`,
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: icon.color, opacity: 0.2 }}>
                    <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
              ))}
              
              {/* Twinkling dots */}
              {[
                { left: '15%', top: '40%', delay: 0.5, color: '#5E3CF6' },
                { left: '60%', top: '25%', delay: 1.5, color: '#00E0FF' },
                { left: '25%', top: '75%', delay: 2.5, color: '#A855F7' },
                { left: '75%', top: '50%', delay: 3.5, color: '#5E3CF6' },
              ].map((dot, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: dot.left,
                    top: dot.top,
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: dot.color,
                    boxShadow: `0 0 8px ${dot.color}80`,
                    animation: `twinkle 3s ease-in-out infinite`,
                    animationDelay: `${dot.delay}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Success message in center */}
            <div style={{
              textAlign: 'center',
              color: 'white',
              zIndex: 1,
              position: 'relative'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                animation: 'float 3s ease-in-out infinite'
              }}>
                🎉
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                Prístup povolený
              </h3>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.9rem'
              }}>
                Všetky funkcie sú teraz dostupné
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: #1a1a1a !important;
          color: white !important;
          overflow-x: hidden !important;
        }
        @media (max-width: 768px) {
          body {
            overflow-y: auto !important;
            height: auto !important;
          }
        }
        header {
          display: none !important;
        }
        footer {
          display: none !important;
        }
        #global-floating-bg {
          display: none !important;
        }
        [data-sticky-cta] {
          display: none !important;
        }
        [data-announcement-controller] {
          display: none !important;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes errorFadeIn {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Mobile-first approach - default to stacked layout */
        .modal-container {
          display: flex !important;
          flex-direction: column !important;
        }
        
        @media (min-width: 769px) {
          .modal-container {
            display: flex !important;
            flex-direction: row !important;
          }
          .left-section {
            display: flex !important;
            width: 50% !important;
            flex: 0 0 50% !important;
          }
          .right-section {
            display: flex !important;
            width: 50% !important;
            flex: 0 0 50% !important;
          }
        }
        @media (max-width: 768px) {
          .modal-container {
            position: relative !important;
            display: flex !important;
            flex-direction: column !important;
            min-height: 100vh !important;
            height: auto !important;
            overflow-y: visible !important;
            overflow-x: hidden !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            background: transparent !important;
          }
          .left-section {
            display: flex !important;
            width: 100% !important;
            min-height: auto !important;
            padding: 3rem 1.5rem 2rem 1.5rem !important;
            flex-shrink: 0 !important;
            background: transparent !important;
          }
          .right-section {
            display: flex !important;
            width: 100% !important;
            min-height: auto !important;
            padding: 1rem !important;
            flex-shrink: 0 !important;
            position: relative !important;
            background: transparent !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .right-section > div {
            background: transparent !important;
            padding: 0 !important;
            paddingTop: 0 !important;
            minHeight: auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .right-section > div > div:first-child {
            display: none !important;
          }
          .right-section > div > div:last-child {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 1rem !important;
            border-radius: 12px !important;
            background: rgba(11, 14, 26, 0.95) !important;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.3) !important;
            border: 1px solid rgba(94, 60, 246, 0.25) !important;
            backdrop-filter: blur(14px) !important;
            position: relative !important;
            z-index: 1 !important;
            margin-bottom: 3rem !important;
            align-self: flex-start !important;
          }
          /* Hide floating background elements on mobile */
          .floating-icons,
          .floating-icons > div,
          .floating,
          .twinkle-animation,
          [class*="floating"],
          [class*="twinkle"],
          .right-section > div > div:first-child {
            display: none !important;
          }
          
          /* Hide right section on mobile during loading state */
          .hide-on-mobile-loading {
            display: none !important;
          }
          
          /* Hide right section on mobile when authenticated */
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
      
      {/* Loading spinner for mobile */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#0b0e1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999999
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(94, 60, 246, 0.3)',
            borderTop: '3px solid #5E3CF6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
      
      {/* Split screen layout like announcement page */}
      <div className="modal-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        background: '#0b0e1a',
        overflow: 'hidden'
      }}>
        {/* Left Section - Password Form */}
        <div 
          className="left-section"
          style={{
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            width: '50%',
            flex: '0 0 50%',
          }}
        >
          <div style={{ width: '100%', maxWidth: '450px', color: 'white' }}>
            {/* Logo */}
            <div style={{ marginBottom: '1rem' }}>
              <img src="/original-logo-without-background.png" alt="SlohGPT" style={{ height: '50px', width: 'auto', filter: 'brightness(0) saturate(100%) invert(100%)', marginLeft: '-21px' }} />
            </div>

            <div style={{ textAlign: 'left', paddingTop: '1rem' }}>
              {/* Title */}
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem', textAlign: 'left' }}>
                Zadajte heslo
              </h1>

              {/* Description */}
              <p style={{ color: '#9ca3af', marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '0.9rem', textAlign: 'left' }}>
                Ahoj Samino, na tomto ešte robím, takže to je iba ukážka
              </p>

              {/* Password form */}
              <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      // Clear error when user starts typing
                      if (error) {
                        setError('')
                      }
                    }}
                    placeholder="Heslo"
                    required
                    style={{
                      padding: '0.75rem 1rem',
                      border: error ? '1px solid #dc2626' : '1px solid #374151',
                      borderRadius: '8px',
                      background: '#1a1a1a',
                      color: 'white',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = error ? '#dc2626' : '#5E3CF6'
                      e.target.style.boxShadow = error ? '0 0 0 3px rgba(220, 38, 38, 0.1)' : '0 0 0 3px rgba(94, 60, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = error ? '#dc2626' : '#374151'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  
                  {error && (
                    <p style={{
                      color: '#dc2626',
                      fontSize: '0.8rem',
                      margin: '0.5rem 0 0 0',
                      textAlign: 'left',
                      animation: 'errorFadeIn 0.3s ease-out'
                    }}>
                      {error}
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 1rem',
                    background: 'linear-gradient(135deg, #5E3CF6, #7C3AED)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(94,60,246,0.3)',
                    transition: 'all 0.2s ease',
                    marginTop: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(94,60,246,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(94,60,246,0.3)'
                  }}
                >
                  Vstúpiť
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Section - Live Preview */}
        <div
          className={`right-section ${isAuthenticated ? 'hide-on-mobile' : ''}`}
          style={{
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            width: '50%',
            flex: '0 0 50%',
          }}
        >
          <div style={{ 
            width: '100%', 
            background: '#0b0e1a', 
            borderRadius: 'calc(0.5rem * 1.5)', 
            position: 'relative', 
            overflow: 'hidden',
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'center',
            paddingTop: '12rem',
            minHeight: '100%'
          }}>
            {/* Floating Background Elements */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
              {/* Floating Icons - stars, pens, books, etc */}
              {[
                { left: '2vw', top: '20%', delay: 0, svg: '<path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '4vw', top: '60%', delay: 1.5, svg: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" fill="currentColor"/><path d="M20 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M22 5h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M4 17v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M5 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>', color: '#A855F7' },
                { left: '15vw', top: '40%', delay: 0.8, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#5E3CF6' },
                { left: '20vw', top: '75%', delay: 2.2, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '35vw', top: '30%', delay: 1.2, svg: '<path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '50vw', top: '25%', delay: 0.6, svg: '<path d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.77L7.82 21L9 14L4 9L10.91 8.26L12 2Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '65vw', top: '45%', delay: 1.8, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '80vw', top: '35%', delay: 1.0, svg: '<path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '92vw', top: '25%', delay: 1.4, svg: '<path d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.77L7.82 21L9 14L4 9L10.91 8.26L12 2Z" fill="currentColor"/>', color: '#5E3CF6' },
                { left: '10vw', top: '85%', delay: 1.9, svg: '<path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '22vw', top: '12%', delay: 2.4, svg: '<path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM15 16H7V14H15V16ZM17 8H7V6H17V8Z" fill="currentColor"/>', color: '#5E3CF6' },
                { left: '35vw', top: '80%', delay: 2.8, svg: '<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="currentColor"/><path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="currentColor"/>', color: '#5E3CF6' },
              ].map((icon, i) => (
                <div
                  key={i}
                style={{
                  position: 'absolute',
                    left: icon.left,
                    top: icon.top,
                    animation: `float 4s ease-in-out infinite`,
                    animationDelay: `${icon.delay}s`,
                  }}
                  dangerouslySetInnerHTML={{ __html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="color: ${icon.color}; opacity: 0.2;">${icon.svg}</svg>` }}
                />
              ))}
              
              {/* Twinkling dots */}
              {[
                { left: '8vw', top: '15%', delay: 0.5, color: '#5E3CF6' },
                { left: '25vw', top: '45%', delay: 1.5, color: '#00E0FF' },
                { left: '60vw', top: '80%', delay: 2.5, color: '#A855F7' },
                { left: '75vw', top: '35%', delay: 3.5, color: '#5E3CF6' },
                { left: '90vw', top: '70%', delay: 1.0, color: '#00E0FF' },
                { left: '12vw', top: '25%', delay: 2.0, color: '#A855F7' },
                { left: '45vw', top: '60%', delay: 3.0, color: '#5E3CF6' },
                { left: '55vw', top: '10%', delay: 0.8, color: '#00E0FF' },
                { left: '30vw', top: '75%', delay: 1.8, color: '#A855F7' },
                { left: '85vw', top: '50%', delay: 1.2, color: '#5E3CF6' },
              ].map((dot, i) => (
                <div
                  key={i}
                style={{
                  position: 'absolute',
                    left: dot.left,
                    top: dot.top,
                    width: '3px',
                    height: '3px',
                  borderRadius: '50%',
                    background: dot.color,
                    boxShadow: `0 0 6px ${dot.color}80`,
                    animation: `twinkle 3s ease-in-out infinite`,
                    animationDelay: `${dot.delay}s`,
                }}
              />
            ))}
          </div>
            {/* Live Preview Card - Exact same as modal */}
            <div style={{
              maxWidth: 'min(680px, calc(100vw - 2rem))',
              width: '100%',
              margin: '0 auto',
              padding: '1rem',
              borderRadius: '12px',
              background: 'rgba(11,14,26,0.95)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 24px rgba(0,0,0,0.3)',
              border: '1px solid rgba(94,60,246,0.25)',
              backdropFilter: 'blur(14px)',
              position: 'relative',
              zIndex: 1,
              marginLeft: '1rem',
              marginRight: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: '#5E3CF6' }}>
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                  Ukážka nástroja
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#EF4444' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#F59E0B' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#22C55E' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', minHeight: '100px' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', fontWeight: 600, textAlign: 'center', minHeight: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {genreText}
                </div>
                <div style={{ 
                  width: '100%',
                  background: startTopic ? 'rgba(94,60,246,0.2)' : 'rgba(94,60,246,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  minHeight: '44px',
                  transition: 'background-color 0.2s ease',
                  wordBreak: 'break-word',
                }}>
                  {topicText}
                </div>
                <div style={{ position: 'relative', width: '100%', minHeight: '44px', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: '8px 0' }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '8px',
                    bottom: '8px',
                    width: '2px',
                    background: startContent ? 'rgba(94,60,246,0.3)' : 'rgba(94,60,246,0.1)',
                    transition: 'background-color 0.2s ease',
                  }} />
              <div style={{ 
                    marginLeft: '16px',
                    textAlign: 'left',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.75)',
                    width: 'calc(100% - 16px)',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {contentText}
                    {showCaret && <span style={{ animation: 'blink 1s infinite', color: '#5e3cf6', fontWeight: '900', fontSize: '14px', letterSpacing: '-2px' }}>|</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
