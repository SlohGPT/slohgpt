'use client'

import { useState, useEffect, useRef } from 'react'

const faqData = [
  {
    question: "Detekuje učiteľ AI? Je to podvod?",
    answer: "Nie, SlohGPT nie je podvod. AI generuje originálny obsah na mieru pre vašu tému. Učitelia vidia zlepšenie vo vašom písaní, nie podozrenie z AI. 85% študentov má lepšie známky bez problémov.",
    category: "objection"
  },
  {
    question: "Ako viem, že to nebude detekované?",
    answer: "SlohGPT vytvára originálny obsah s prirodzeným jazykom. Každý sloh je unikátny pre vašu tému. Učitelia vidia vaše skutočné zlepšenie v štruktúre a jazykových prostriedkoch.",
    category: "objection"
  },
  {
    question: "Stojí to za to? Nevyhodím peniaze?",
    answer: "14,99€ za sloh, ktorý vám ušetrí 2 hodiny práce a zlepší známku? To je menej ako káva. Plus máte 100% garanciu vrátenia peňazí ak nie ste spokojní.",
    category: "objection"
  },
  {
    question: "Ako dlho to trvá? Potrebujem to na zajtra!",
    answer: "Perfektne! SlohGPT vytvorí sloh za 5 minút. Stačí vybrať typ, zadať tému a máte hotový sloh s vysvetleniami. Ideálne pre last-minute situácie.",
    category: "urgency"
  },
  {
    question: "Aké typy slohov podporuje?",
    answer: "Všetky hlavné typy: úvaha, rozprávanie, charakteristika, popis, výklad, argumentácia. AI rozumie slovenským slohovým žánrom a štýlovým prostriedkom.",
    category: "feature"
  },
  {
    question: "Je to bezpečné? Nezdieľate moje dáta?",
    answer: "Áno, 100% bezpečné. Vaše témy a slohy sú súkromné. Nepoužívame vaše dáta na tréning AI. Všetko je šifrované a chránené.",
    category: "objection"
  },
  {
    question: "Čo ak nie som spokojný so slohom?",
    answer: "Máte 100% garanciu vrátenia peňazí do 7 dní. Ak nie ste spokojní, vrátime vám peniaze bez otázok. Chceme, aby ste boli spokojní.",
    category: "objection"
  },
  {
    question: "Môžem použiť sloh priamo na odovzdanie?",
    answer: "SlohGPT je pomôcka na učenie. Odporúčame použiť ho ako inšpiráciu a vzor pre váš vlastný sloh. Tak sa najlepšie naučíte písať.",
    category: "feature"
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [isClient, setIsClient] = useState(false)
  const faqRef = useRef<HTMLDivElement>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Ensure this only runs on client to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // FAQ cards animation with individual intersection observers
  useEffect(() => {
    if (!isClient || !faqRef.current) return

    // Reset visibility on category change for fresh stagger
    setVisibleCards([])

    const faqCards = faqRef.current.querySelectorAll('.faq-card')
    
    const observers = Array.from(faqCards).map((card, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards(prev => {
                  if (!prev.includes(index)) {
                    return [...prev, index]
                  }
                  return prev
                })
              }, index * 200) // Stagger animation by 200ms for smoother effect
            }
          })
        },
        {
          threshold: 0.2, // Trigger when 20% visible
          rootMargin: '-50px 0px -50px 0px' // Start animation earlier
        }
      )
      
      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [isClient, activeCategory])

  const categories = [
    { id: 'all', label: 'Všetky', icon: 'fas fa-list' },
    { id: 'objection', label: 'Obavy', icon: 'fas fa-shield-alt' },
    { id: 'urgency', label: 'Naliehavosť', icon: 'fas fa-clock' },
    { id: 'feature', label: 'Funkcie', icon: 'fas fa-cog' }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory)

  return (
    <section id="faq" className="modern-faq-section">
      <div className="faq-container-wide">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <i className="fas fa-question-circle"></i>
            FAQ
          </div>
          <h2 className="section-title">Často kladené otázky</h2>
          <p className="section-subtitle">
            Všetko, čo potrebujete vedieť o SlohGPT
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="faq-layout-wide">
          {/* Left Sidebar - Contact & Support */}
          <div className="faq-sidebar">
            <div className="faq-support-card">
              <div className="support-header">
                <div className="support-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Potrebujete pomoc?</h3>
                <p>Sme tu pre vás 24/7</p>
              </div>

              <div className="support-options">
                <div className="support-option">
                  <div className="option-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="option-content">
                    <h4>Email podpora</h4>
                    <p>Odpovieme do 2 hodín</p>
                    <button className="option-btn">
                      Napísať email
                    </button>
                  </div>
                </div>

                <div className="support-option">
                  <div className="option-icon">
                    <i className="fas fa-comments"></i>
                  </div>
                  <div className="option-content">
                    <h4>Live chat</h4>
                    <p>Okamžitá odpoveď</p>
                    <button className="option-btn">
                      Spustiť chat
                    </button>
                  </div>
                </div>

                <div className="support-option">
                  <div className="option-icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="option-content">
                    <h4>Návody</h4>
                    <p>Krok za krokom</p>
                    <button className="option-btn">
                      Pozrieť návody
                    </button>
                  </div>
                </div>

                {/* Mobile-only telephone support option */}
                <div className="support-option mobile-only-telephone">
                  <div className="option-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="option-content">
                    <h4>Telefónna podpora</h4>
                    <p>Rýchle riešenie</p>
                    <button className="option-btn">
                      Zavolať
                    </button>
                  </div>
                </div>
              </div>

              <div className="support-stats">
                <div className="stat">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Spokojnosť</div>
                </div>
                <div className="stat">
                  <div className="stat-number">&lt; 2h</div>
                  <div className="stat-label">Odpoveď</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Dostupnosť</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Content */}
          <div className="faq-content">
            {/* Category Filters */}
            <div className="faq-filters-container">
              <div className="faq-filters">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`filter-pill ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    <i className={category.icon}></i>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* FAQ Items */}
            <div className="faq-grid" ref={faqRef}>
              {filteredFAQs.map((faq, index) => (
                <div key={index} className={`faq-card ${visibleCards.includes(index) ? 'faq-card-visible' : ''}`}>
                  <button
                    className="faq-card-header"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <div className="faq-icon">
                      <i className={`fas fa-chevron-down ${openIndex === index ? 'rotated' : ''}`}></i>
                    </div>
                  </button>
                  
                  <div className={`faq-card-body ${openIndex === index ? 'expanded' : ''}`}>
                    <div className="faq-answer-text">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
