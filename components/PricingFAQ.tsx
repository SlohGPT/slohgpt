'use client'

import { useState, useEffect, useRef } from 'react'


const pricingFaqData = [
  {
    question: "Koľko stojí jeden sloh?",
    answer: "Jeden sloh stojí €7.99. To je menej ako doučovanie za €25/hod. Za túto cenu dostanete kompletný sloh s vysvetlením, ako ho napísať.",
    category: "pricing"
  },
  {
    question: "Môžem dostať peniaze späť?",
    answer: "Áno! Máte 7-dňovú záruku spokojnosti. Ak nie ste spokojní s výsledkom, vrátime vám peniaze bez otázok.",
    category: "guarantee"
  },
  {
    question: "Aké platobné metódy akceptujete?",
    answer: "Akceptujeme všetky hlavné platobné karty (Visa, Mastercard), PayPal a bankový prevod. Platba je 100% bezpečná a šifrovaná.",
    category: "payment"
  },
  {
    question: "Je cena za sloh alebo za mesiac?",
    answer: "Cena €7.99 je za jeden sloh. Nie je to mesačný poplatok. Platíte len za to, čo skutočne použijete.",
    category: "pricing"
  },
  {
    question: "Môžem zmeniť alebo zrušiť objednávku?",
    answer: "Áno, môžete zmeniť tému slohu alebo zrušiť objednávku do 24 hodín od objednania. Po tom máte 7 dní na vrátenie peňazí.",
    category: "payment"
  },
  {
    question: "Dostanem faktúru?",
    answer: "Áno, automaticky dostanete elektronickú faktúru na váš email. Faktúra je vhodná pre školy a rodičov.",
    category: "payment"
  },
  {
    question: "Je to bezpečné? Nezdieľate moje dáta?",
    answer: "Áno, 100% bezpečné. Vaše témy a slohy sú súkromné. Nepoužívame vaše dáta na tréning AI. Všetko je šifrované a chránené.",
    category: "guarantee"
  },
  {
    question: "Aké typy slohov podporuje?",
    answer: "Všetky hlavné typy: úvaha, rozprávanie, charakteristika, popis, výklad, argumentácia. AI rozumie slovenským slohovým žánrom a štýlovým prostriedkom.",
    category: "feature"
  }
]

export default function PricingFAQ() {
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
    { id: 'pricing', label: 'Ceny', icon: 'fas fa-euro-sign' },
    { id: 'guarantee', label: 'Záruka', icon: 'fas fa-shield-alt' },
    { id: 'payment', label: 'Platba', icon: 'fas fa-credit-card' },
    { id: 'feature', label: 'Funkcie', icon: 'fas fa-cog' }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? pricingFaqData 
    : pricingFaqData.filter(faq => faq.category === activeCategory)

  return (
    <section id="faq" className="modern-faq-section">
      <div className="faq-container-wide">
        {/* Section Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <i className="fas fa-question-circle"></i>
            FAQ
          </div>
          <h2 className="section-title">Často kladené otázky o cenách</h2>
          <p className="section-subtitle">
            Všetko, čo potrebujete vedieť o cenách a platbách
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

                <div className="support-option">
                  <div className="option-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="option-content">
                    <h4>Telefón</h4>
                    <p>+421 123 456 789</p>
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
