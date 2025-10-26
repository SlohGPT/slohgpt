'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Mail, CheckCircle } from 'lucide-react'

interface AnnouncementModalProps {
  onClose: () => void
}

export default function AnnouncementModal({ onClose }: AnnouncementModalProps) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const [email, setEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [show, setShow] = useState(true)
  const [topicActive, setTopicActive] = useState(false)
  const [purpleActive, setPurpleActive] = useState(false)

  // Animation states for typewriter effect
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const [startTopic, setStartTopic] = useState(false)
  const [startContent, setStartContent] = useState(false)
  const [showCaret, setShowCaret] = useState(false)
  const [genreText, setGenreText] = useState('')
  const [topicText, setTopicText] = useState('')
  const [contentText, setContentText] = useState('')
  
  // Demo data sets
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
      text: `     „Vstávaj, ideme do hôr!“ Otcov hlas ma zobudil zo sna skôr, než som sa stihol pozrieť, koľko je hodín. Bolo nedeľné ráno, vonku ešte tma a mne sa nechcelo ani pohnúť. Najradšej by som sa otočil na druhý bok a spal ďalej, ale batohy už stáli pri dverách a otec sa usmieval tým svojím výrazom, ktorý nezniesol žiadne nie.
     O chvíľu sme už sedeli v aute smerom do Tatier. Mama ticho driemala na prednom sedadle, brat mal v ušiach slúchadlá a ja som sledoval krajinu za oknom. Pomaly sa prebúdzala. V domoch sa rozsvecovali svetlá, na poliach sa preháňala ranná hmla a spoza kopcov sa plazili prvé lúče slnka. Vtedy som ešte netušil, že práve tento deň si budem pamätať celý svoj život...`
    },
    {
      genre: "Charakteristika",
      topic: "Môj obľúbený literárny hrdina",
      text: `     Keď som prvýkrát čítal Harryho Pottera, bol som ešte dieťa a úprimne, čakal som len napínavý príbeh o kúzlach. Ale čím som starší, tým viac si uvedomujem, že práve Harry ma naučil veľa o tom, čo znamená nevzdať sa, aj keď má človek pocit, že je úplne sám. Možno preto ho považujem za svojho obľúbeného literárneho hrdinu. Nie preto, že je „vyvolený", ale preto, že je obyčajný chalan, ktorý sa snaží robiť správne veci.
     Na začiatku je to len chlapec, ktorý býva v komore pod schodami a cíti sa zbytočný. Nemá rodičov, nikto ho nemá rád a zrazu zistí, že je čarodejník. Väčšina ľudí by asi zbláznila od radosti, ale on skôr ticho prijíma, čo prichádza. Na Rokforte síce robí chyby, ale vždy sa snaží stáť na strane dobra, aj keď ho to vždy niečo stojí. Práve to sa mi na ňom páči. Odvaha pre neho neznamená nemať strach, ale ísť ďalej aj s ním...`
    }
  ]

  // Typewriter animation
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
      setTopicActive(false)
      setPurpleActive(false)
      
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
            setTopicActive(true)
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
                  setPurpleActive(true)
                  let contentIdx = 0
                  const contentFull = currentSet.text
                  const typeContent = () => {
                    if (contentIdx < contentFull.length) {
                      setContentText(contentFull.substring(0, contentIdx + 1))
                      contentIdx++
                      contentTimeout = setTimeout(typeContent, 40)
                    } else {
                      setShowCaret(true)
                      // Wait 3 seconds, then cycle to next demo
                      setTimeout(() => {
                        setCurrentSetIndex((prev) => (prev + 1) % demoSets.length)
                      }, 3000)
                    }
                  }
                  typeContent()
                }, 200)
              }
            }
            typeTopic()
          }, 200)
        }
      }
      typeGenre()
    }
    
    const initialDelay = setTimeout(() => animatePreview(), 100)
    
    return () => {
      clearTimeout(initialDelay)
      clearTimeout(genreTimeout)
      clearTimeout(topicTimeout)
      clearTimeout(contentTimeout)
    }
  }, [currentSetIndex])

  const handleVote = async (voteType: 'up' | 'down') => {
    setVote(voteType)
    setShowEmailInput(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !vote) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/announcement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          vote,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        localStorage.setItem('announcement_shown', 'true')
        setTimeout(() => {
          setShow(false)
          setTimeout(onClose, 300)
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!show) return null

  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
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
            display: flex !important;
            flex-direction: column !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            height: 100vh !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch !important;
          }
          body {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
          }
          .left-section {
            display: flex !important;
            width: 100% !important;
            min-height: auto !important;
            padding: 3rem 1.5rem 2rem 1.5rem !important;
            overflow-y: visible !important;
            flex: 0 0 auto !important;
          }
          .right-section {
            display: flex !important;
            width: 100% !important;
            min-height: 600px !important;
            overflow-y: visible !important;
            flex: 0 0 auto !important;
            height: auto !important;
            align-items: flex-start !important;
            padding: 1rem !important;
          }
          .right-inner {
            display: flex !important;
            padding-top: 2rem !important;
            min-height: 600px !important;
            height: auto !important;
            width: 100% !important;
          }
          .content-text {
            max-height: 120px !important;
            overflow: hidden !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 4 !important;
            -webkit-box-orient: vertical !important;
          }
        }
      `}</style>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 999999,
        pointerEvents: 'auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'white'
      }}>
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 999998,
        }}
      />
      {/* Split screen layout like login page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="modal-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {/* Left Section - Form */}
        <div 
          className="left-section"
          style={{ 
            background: '#1a1a1a', 
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '6rem 2rem 2rem 2rem',
            width: '50%',
            flex: '0 0 50%',
          }}
        >
          <div style={{ width: '100%', maxWidth: '400px', color: 'white' }}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <img src="/original-logo-without-background.png" alt="SlohGPT" style={{ height: '60px', width: 'auto', filter: 'brightness(0) saturate(100%) invert(100%)', marginLeft: '-21px' }} />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}
            >
              Ešte len budujeme
            </motion.h1>

            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', paddingTop: '2rem' }}
              >
                <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                  Super, ďakujeme! ✨
                </h3>
                <p style={{ color: '#9ca3af' }}>
                  Pošleme ti email, keď to opráime.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {/* Description */}
                <p style={{ color: '#9ca3af', marginBottom: '1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  Nejaké AI slohy sú fakt fajn, ale väčšinou to poznáš na prvý pohľad. Chceme vytvoriť nástroj, ktorý bude vytvárať slohy, ktoré budú znieť ako od teba, nie od ChatGPT.
                </p>
                <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6, fontSize: '0.875rem' }}>
                  Nie je to o tom, aby si to skopíroval a poslal to učiteličke. Je to o tom, aby si videl príklady, inšpiroval sa a naučil sa, ako písať lepšie.
                </p>

                {/* Voting section */}
                {!showEmailInput && (
                  <div>
                    <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#d1d5db', fontSize: '1rem' }}>
                      Zaujíma ťa to?
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote('up')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
                        }}
                      >
                        <ThumbsUp size={20} />
                        Áno
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote('down')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                          color: 'white',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <ThumbsDown size={20} />
                        Nie
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Email input form */}
                {showEmailInput && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleSubmit}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ color: '#d1d5db', fontSize: '0.875rem', fontWeight: 500 }}>
                        <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                        Daj nám email, pošleme ti správu keď to bude hotové
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vas@email.com"
                        required
                        style={{
                          padding: '0.625rem 1rem',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          background: '#1a1a1a',
                          color: 'white',
                          fontSize: '0.875rem',
                        }}
                        disabled={isSubmitting}
                      />
                    </div>
                    {submitStatus === 'error' && (
                      <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                        Niečo sa pokazilo. Skúste to prosím znova.
                      </p>
                    )}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || !email}
                      style={{
                        padding: '0.625rem 1rem',
                        background: 'white',
                        color: '#1a1a1a',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: isSubmitting || !email ? 'not-allowed' : 'pointer',
                        marginTop: '0.5rem',
                        opacity: isSubmitting || !email ? 0.6 : 1,
                      }}
                    >
                      {isSubmitting ? 'Odosielam...' : 'Dáme vám vedieť'}
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Section - Floating Background + Live Preview */}
        <div 
          className="right-section"
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
          <div className="right-inner" style={{ 
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
                { left: '4vw', top: '60%', delay: 1.5, svg: '<path d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.77L7.82 21L9 14L4 9L10.91 8.26L12 2Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '15vw', top: '40%', delay: 0.8, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#5E3CF6' },
                { left: '20vw', top: '75%', delay: 2.2, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '35vw', top: '30%', delay: 1.2, svg: '<path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '50vw', top: '25%', delay: 0.6, svg: '<path d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.77L7.82 21L9 14L4 9L10.91 8.26L12 2Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '65vw', top: '45%', delay: 1.8, svg: '<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '80vw', top: '35%', delay: 1.0, svg: '<path d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z" fill="currentColor"/>', color: '#00E0FF' },
                { left: '92vw', top: '25%', delay: 1.4, svg: '<path d="M12 2L13.09 8.26L20 9L15 14L16.18 21L12 17.77L7.82 21L9 14L4 9L10.91 8.26L12 2Z" fill="currentColor"/>', color: '#5E3CF6' },
                { left: '10vw', top: '85%', delay: 1.9, svg: '<path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>', color: '#A855F7' },
                { left: '22vw', top: '12%', delay: 2.4, svg: '<path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM15 16H7V14H15V16ZM17 8H7V6H17V8Z" fill="currentColor"/>', color: '#5E3CF6' },
              ].map((icon, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: icon.delay,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    left: icon.left,
                    top: icon.top,
                  }}
                  dangerouslySetInnerHTML={{ __html: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" style="color: ${icon.color};">${icon.svg}</svg>` }}
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
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: dot.delay,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    left: dot.left,
                    top: dot.top,
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: dot.color,
                    boxShadow: `0 0 6px ${dot.color}80`,
                  }}
                />
              ))}
            </div>
            
            {/* Live Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              style={{
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
              }}
            >
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
                  <div className="content-text" style={{
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  )
}
