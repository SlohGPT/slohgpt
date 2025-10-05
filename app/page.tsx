'use client'

import Link from 'next/link'
import FAQ from '@/components/FAQ'
import ModernHero from '@/components/modern/ModernHero'
import InteractiveDemo from '@/components/InteractiveDemo'
import FinalCTA from '@/components/FinalCTA'
// Head component not needed in app directory - metadata is handled in layout.tsx

export default function HomePage() {
  return (
    <>
      {/* SEO metadata is handled in layout.tsx for app directory */}
      
      {/* No local background here anymore */}
      <section id="home-page-content">
        <ModernHero />

        {/* Student Pain Point Section */}
        <section className="student-pain-section">
          <div className="container">
            <div className="pain-content">
              <div className="pain-header">
                <h3 className="pain-title">
                  Poznáš ten pocit?
                </h3>
                <p className="pain-subtitle">
                  Každý študent to zažil...
                </p>
              </div>
              
              <div className="pain-cards">
                <div className="pain-card">
                  <div className="pain-card-icon">
                    <div className="icon-bg clock">⏰</div>
                  </div>
                  <div className="pain-card-content">
                    <h4>2 hodiny, nula slov</h4>
                    <p>Sedíš pred prázdnym papierom a nevieš ako začať</p>
                  </div>
                </div>
                
                <div className="pain-card">
                  <div className="pain-card-icon">
                    <div className="icon-bg brain">🧠</div>
                  </div>
                  <div className="pain-card-content">
                    <h4>Myšlienky vs. slová</h4>
                    <p>Máš skvelé nápady, ale nevieš ich správne napísať</p>
                  </div>
                </div>
                
                <div className="pain-card">
                  <div className="pain-card-icon">
                    <div className="icon-bg stress">😰</div>
                  </div>
                  <div className="pain-card-content">
                    <h4>Stres z hodnotenia</h4>
                    <p>Bojíš sa, že sloh nebude dosť dobrý na jednotku</p>
                  </div>
                </div>
              </div>
              
              <div className="pain-solution">
                <div className="solution-arrow">↓</div>
                <div className="solution-text">
                  <span className="solution-highlight">Presne preto</span> existuje SlohGPT
                </div>
                <div className="solution-cta">
                  Pozri si, ako to funguje
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section - placed below pain point */}
        <InteractiveDemo />

        {/* Elegant Our Story Section */}
        <section id="our-story" className="our-story-section section">
          <div className="our-story-container">
            
            {/* Hero Section */}
            <div className="our-story-hero">
              <div className="our-story-badge">
                <i className="fas fa-heart"></i>
                Náš príbeh
              </div>
              <h2 className="our-story-title">
                Poznáme tvoju bolesť
              </h2>
              <p className="our-story-subtitle">
                Sme študenti ako ty. Zažili sme každý jeden z týchto problémov na vlastnej koži.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="our-story-content">
              
              {/* Left Side - Story Text */}
              <div className="our-story-text">
                <div className="story-paragraph">
                  Poznáme ten pocit, keď <span className="story-highlight">civíš na prázdnu stránku</span> prvých 5-10 minút 
                  bez jediného nápadu. Vieš, že čas uteká, stres narastá a ty stále nevieš, ako začať.
                </div>
                
                {/* Mobile couple after paragraph 1 */}
                <div className="mobile-story-couple mobile-couple-1">
                  <div className="mobile-story-icon blank-page">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div className="mobile-story-content">
                    <h4 className="mobile-story-title">Prázdna stránka</h4>
                    <p className="mobile-story-description">Prvých 5-10 minút bez nápadu</p>
                  </div>
                </div>
                
                <div className="story-paragraph">
                  Poznáme frustráciu, keď napíšeš vetu, potom ju <span className="story-highlight">preškrtneš</span> - 
                  ale každé škrtnutie sa počíta ako chyba. Sloh musí byť čistý, ale ty si nie si istý svojím textom.
                </div>
                
                {/* Mobile couple after paragraph 2 */}
                <div className="mobile-story-couple mobile-couple-2">
                  <div className="mobile-story-icon mistakes">
                    <i className="fas fa-eraser"></i>
                  </div>
                  <div className="mobile-story-content">
                    <h4 className="mobile-story-title">Škrtanie = chyby</h4>
                    <p className="mobile-story-description">Sloh musí byť čistý a bez chýb</p>
                  </div>
                </div>
                
                <div className="story-paragraph">
                  Poznáme bezradnosť pri <span className="story-highlight">jazykových prostriedkoch a frazeologizmoch</span>. 
                  Nevieš, ktoré použiť, ako vytvoriť metaforu, ani ako postaviť správnu osnovu.
                </div>
                
                {/* Mobile couple after paragraph 3 */}
                <div className="mobile-story-couple mobile-couple-3">
                  <div className="mobile-story-icon structure">
                    <i className="fas fa-puzzle-piece"></i>
                  </div>
                  <div className="mobile-story-content">
                    <h4 className="mobile-story-title">Jazykové prostriedky</h4>
                    <p className="mobile-story-description">Frazeologizmy, metafory, osnova</p>
                  </div>
                </div>
                
                <div className="story-paragraph solution">
                  <span className="story-highlight">Preto sme vytvorili SlohGPT</span> - nástroj, ktorý ti ušetrí prvých 10 minút, 
                  naučí ťa používať jazykové prostriedky, ukáže vhodné frazeologizmy a pomôže vytvoriť silnú osnovu. 
                  Už nikdy nebudeš sedieť nad prázdnou stránkou so stresom a spotenými rukami.
                </div>
              </div>

              {/* Right Side - Pain Points Visual */}
              <div className="our-story-visual">
                <div className="pain-points-visual">
                  
                  <div className="pain-point-item">
                    <div className="pain-icon blank-page">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="pain-content">
                      <h4 className="pain-title">Prázdna stránka</h4>
                      <p className="pain-description">Prvých 5-10 minút bez nápadu</p>
                    </div>
                  </div>

                  <div className="pain-point-item">
                    <div className="pain-icon stress">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="pain-content">
                      <h4 className="pain-title">Časový stres</h4>
                      <p className="pain-description">Nevieš ako začať ani pokračovať</p>
                    </div>
                  </div>

                  <div className="pain-point-item">
                    <div className="pain-icon mistakes">
                      <i className="fas fa-eraser"></i>
                    </div>
                    <div className="pain-content">
                      <h4 className="pain-title">Škrtanie = chyby</h4>
                      <p className="pain-description">Sloh musí byť čistý a bez chýb</p>
                    </div>
                  </div>

                  <div className="pain-point-item">
                    <div className="pain-icon structure">
                      <i className="fas fa-puzzle-piece"></i>
                    </div>
                    <div className="pain-content">
                      <h4 className="pain-title">Jazykové prostriedky</h4>
                      <p className="pain-description">Frazeologizmy, metafory, osnova</p>
                    </div>
                  </div>

                </div>

              </div>


            </div>

          </div>
        </section>

        {/* JAW-DROPPING BENEFITS */}
        <section id="benefits" className="jaw-dropping-benefits section">
          <div className="container">
            
            {/* Hero-style header */}
            <div className="benefits-hero">
              <div className="benefits-badge">
                <i className="fas fa-rocket"></i>
                <span>Tvoja tajná zbraň</span>
              </div>
              <h2 className="benefits-title">
                Zatiaľ čo ostatní <span className="stress-text">stresujú</span>,<br/>
                ty máš hotovo za <span className="highlight-text">10 minút</span>
              </h2>
              <p className="benefits-subtitle">
                Nie je to podvádzanie. Je to inteligentné riešenie pre modernú generáciu.
              </p>
            </div>

            {/* Power Benefits Grid */}
            <div className="power-benefits-grid">
              
              {/* Time Saver */}
              <div className="power-benefit-card">
                <div className="benefit-icon time-icon">
                  <i className="fas fa-clock"></i>
                  <div className="icon-pulse"></div>
                </div>
                <div className="benefit-content">
                  <h3>Ušetríš 1+ hodinu</h3>
                  <p>Zatiaľ čo tvoji spolužiaci ešte hľadajú inšpiráciu, ty už máš hotový sloh s perfektnou štruktúrou.</p>
                  <div className="benefit-stat">
                    <span className="stat-number">60+</span>
                    <span className="stat-label">minút späť do života</span>
                  </div>
                </div>
              </div>

              {/* Grade Booster */}
              <div className="power-benefit-card">
                <div className="benefit-icon grade-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="benefit-content">
                  <h3>Lepšie známky zaručene</h3>
                  <p>AI vie presne, na čo sa učitelia pozerajú. Frazeologizmy, metafory, správna osnova.</p>
                  <div className="benefit-proof">
                    <div className="proof-item">
                      <span className="proof-grade">4 → 1</span>
                      <span className="proof-text">priemerné zlepšenie</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stress Killer */}
              <div className="power-benefit-card">
                <div className="benefit-icon stress-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="benefit-content">
                  <h3>Koniec stresu</h3>
                  <p>Žiadne prázdne stránky. Žiadne škrtanie. Žiadne panické noci pred termínom.</p>
                  <div className="benefit-tags">
                    <span className="benefit-tag">✓ Bez paniky</span>
                    <span className="benefit-tag">✓ Bez stresu</span>
                  </div>
                </div>
              </div>

              {/* Smart Learning */}
              <div className="power-benefit-card">
                <div className="benefit-icon learn-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="benefit-content">
                  <h3>Učíš sa pritom</h3>
                  <p>Nie je to len kopírovanie. Každý sloh obsahuje vysvetlenia, prečo je napísaný práve tak.</p>
                  <div className="benefit-highlight">
                    <i className="fas fa-lightbulb"></i>
                    <span>Rozumieš, nezubríš</span>
                  </div>
                </div>
              </div>

              {/* Real Talk */}
              <div className="power-benefit-card">
                <div className="benefit-icon social-icon">
                  <i className="fas fa-comment-dots"></i>
                </div>
                <div className="benefit-content">
                  <h3>Bez bullshitu</h3>
                  <p>Nie sme tu na to, aby sme ti klamali. Nástroj funguje, ušetrí ti čas a pomôže so slohom. Bodka.</p>
                  <div className="benefit-truth">
                    <span>Žiadne marketingové reči</span>
                  </div>
                </div>
              </div>

              {/* Money Smart */}
              <div className="power-benefit-card">
                <div className="benefit-icon money-icon">
                  <i className="fas fa-piggy-bank"></i>
                </div>
                <div className="benefit-content">
                  <h3>Ušetríš aj peniaze</h3>
                  <p>Žiadne predplatné, žiadne skryté poplatky. Zaplatíš len keď potrebuješ.</p>
                  <div className="money-comparison">
                    <div className="comparison-option expensive">
                      <span className="comparison-label">Doučovanie</span>
                      <span className="comparison-price">20€</span>
                      <span className="comparison-note">za hodinu</span>
                    </div>
                    <div className="comparison-vs">vs</div>
                    <div className="comparison-option affordable">
                      <span className="comparison-label">SlohGPT</span>
                      <span className="comparison-price">7.99€</span>
                      <span className="comparison-note">za celý sloh</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom motivation */}
            <div className="benefits-bottom-motivation">
              <div className="motivation-badge">
                <i className="fas fa-lightbulb"></i>
                <span>Pravda je jednoduchá</span>
              </div>
              <p className="motivation-text">
                Buď si napíšeš sloh sám za 2+ hodiny, alebo použiješ nástroj a budeš hotový za 10 minút. <br/>
                <strong>Tvoja voľba.</strong>
              </p>
            </div>

          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-showcase" id="pricing">
        <div className="container">
          <div className="pricing-header">
            <h2 className="pricing-title">Začni už dnes</h2>
            <p className="pricing-subtitle">
              <i className="fas fa-pencil-alt pricing-icon"></i>
              Jeden sloh ťa môže posunúť z trojky na jednotku
            </p>
          </div>
          
          <div className="pricing-cards">
            <div className="pricing-card featured">
              <div className="pricing-badge popular">Dostupné teraz</div>
              <h3 className="pricing-card-title">Complete Essay</h3>
              <div className="pricing-price">
                <span className="price-amount">7,99 €</span>
                <span className="price-period">jednorazovo</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature pricing-feature-left">
                  <i className="fas fa-star"></i>
                  Kompletný sloh (800+ slov)
                </li>
                <li className="pricing-feature pricing-feature-left">
                  <i className="fas fa-star"></i>
                  Analýza a vysvetlenia
                </li>
                <li className="pricing-feature pricing-feature-left">
                  <i className="fas fa-star"></i>
                  Okamžité stiahnutie
                </li>
              </ul>
              <button 
                className="pricing-cta active"
                onClick={async () => {
                  try {
                    // Redirect directly to Stripe checkout
                    const { redirectToCheckout } = await import('@/lib/stripe')
                    await redirectToCheckout(process.env.NEXT_PUBLIC_STRIPE_COMPLETE_ESSAY_PRICE_ID!)
                  } catch (error) {
                    console.error('Checkout error:', error)
                    // Fallback to pricing page if Stripe fails
                    window.location.href = '/pricing?from=homepage&scroll=pricing'
                  }
                }}
                aria-label="Objednaj teraz"
              >
                Objednaj teraz
              </button>
            </div>
            
            <div className="pricing-card dimmed">
              <div className="pricing-badge coming-soon">Čoskoro</div>
              <h3 className="pricing-card-title">Rýchly Boost</h3>
              <div className="pricing-price">
                <span className="price-amount">?</span>
                <span className="price-period">€</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  ⚡
                  Last-minute tipy
                </li>
                <li className="pricing-feature">
                  💡
                  Metafory a prirovnania
                </li>
                <li className="pricing-feature">
                  🚀
                  Express dodanie
                </li>
              </ul>
              <button className="pricing-cta inactive">Pripravujeme</button>
            </div>
            
            <div className="pricing-card dimmed">
              <div className="pricing-badge coming-soon">Čoskoro</div>
              <h3 className="pricing-card-title">Tvoj AI Coach</h3>
              <div className="pricing-price">
                <span className="price-amount">?</span>
                <span className="price-period">€/mesiac</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  🎓
                  Personalizovaný učiteľ
                </li>
                <li className="pricing-feature">
                  📚
                  Neobmedzené slohy
                </li>
                <li className="pricing-feature">
                  🎯
                  Pokročilá analýza
                </li>
              </ul>
              <button className="pricing-cta inactive">Pripravujeme</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA (Lovable-style) */}
      <FinalCTA />
      </section>

    </>
  )
}
