/* Modern Our Story Section V1 - BACKUP */
/* Created: 2025-01-15 */
/* Description: Ultra-modern design with timeline, stats, and gradient effects */
/* Note: Too text-heavy, not scannable enough for production use */

{/* Modern Our Story Section */}
<section id="our-story" className="our-story-section section">
  <div className="our-story-container">
    
    {/* Hero Section */}
    <div className="our-story-hero">
      <div className="our-story-badge">
        <i className="fas fa-heart"></i>
        Náš príbeh
      </div>
      <h2 className="our-story-title">
        Študenti pre študentov
      </h2>
      <p className="our-story-subtitle">
        Poznáme stres zo slohov, prázdnu stránku a tlak na známky. Preto sme vytvorili nástroj, ktorý skutočne pomáha.
      </p>
    </div>

    {/* Main Content Grid */}
    <div className="our-story-content">
      
      {/* Left Side - Story Text */}
      <div className="our-story-text">
        <div className="story-paragraph">
          Začalo to jednoducho – <span className="story-highlight">frustrácií zo slohov</span> bolo príliš veľa. 
          Prázdna stránka, nejasné zadania, stres z hodnotenia. Vedeli sme, že musí existovať lepší spôsob.
        </div>
        
        <div className="story-paragraph">
          Namiesto komplikovaných nástrojov sme sa rozhodli vytvoriť <span className="story-highlight">jednoduchý, efektívny systém</span>. 
          Jeden, ktorý chápe slovenské reálie a skutočne pomáha študentom písať lepšie slohy.
        </div>
        
        <div className="story-paragraph">
          Dnes SlohGPT používajú stovky študentov. Nie je to len nástroj – je to <span className="story-highlight">partner pri písaní</span>, 
          ktorý ti pomôže od prvého slova až po finálnu bodku.
        </div>

        {/* Stats */}
        <div className="story-stats">
          <div className="story-stat">
            <div className="story-stat-number">500+</div>
            <div className="story-stat-label">Študentov</div>
          </div>
          <div className="story-stat">
            <div className="story-stat-number">2,000+</div>
            <div className="story-stat-label">Slohov</div>
          </div>
        </div>
      </div>

      {/* Right Side - Timeline */}
      <div className="our-story-visual">
        <div className="story-timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">2024 Q1</div>
              <div className="timeline-text">
                Prvé experimenty s AI pre slovenské slohy. Testovanie s malou skupinou študentov.
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">2024 Q2</div>
              <div className="timeline-text">
                Spustenie prvej verzie SlohGPT. Zameranie na kvalitu a jednoduchosť používania.
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">2024 Q3</div>
              <div className="timeline-text">
                Pridanie interaktívnej ukážky a rozšírenie na viac typov slohov.
              </div>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-year">Teraz</div>
              <div className="timeline-text">
                Neustále vylepšovanie na základe spätnej väzby od študentov a učiteľov.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
