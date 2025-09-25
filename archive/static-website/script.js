// Modern SlohGPT JavaScript - Adaptive Logo & Glassmorphism

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- Disable navigating to the current page (but keep hover/active styles)
(function disableCurrentPageNav() {
  const links = document.querySelectorAll('.nav-link');
  if (!links.length) return;

  // Normalize a URL (strip hash and trailing slash)
  const normalize = (u) => {
    try {
      const url = new URL(u, window.location.origin);
      url.hash = ''; // ignore hashes
      let s = url.pathname;
      if (s.endsWith('/')) s = s.slice(0, -1);
      return url.origin + s;
    } catch {
      return u;
    }
  };

  const here = normalize(window.location.href);

  links.forEach(a => {
    const to = normalize(a.href);
    // Only block if it's a full page URL, not anchor links
    if (to === here && !a.href.includes('#')) {
      a.classList.add('is-current');
      a.setAttribute('aria-current', 'page');
      a.setAttribute('aria-disabled', 'true');
      a.addEventListener('click', e => {
        // prevent reload of the same page, but still allow hover styling
        e.preventDefault();
        e.stopPropagation();
      }, { capture: true });
    }
  });
})();

// Footer Logo - make white on load
function makeFooterLogoWhite() {
    const footerLogo = document.querySelector('.footer-logo .logo-original');
    if (footerLogo) {
        footerLogo.style.filter = 'brightness(0) invert(1)';
    }
}

// Make footer logo white on load
document.addEventListener('DOMContentLoaded', makeFooterLogoWhite);

// FAQ Accordion
function toggleFAQ(btn) {
  const item   = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = answer.classList.contains('active');

  // Close any currently open item (accordion behavior)
  document.querySelectorAll('.faq-answer.active').forEach(a => {
    if (a !== answer) {
      a.classList.remove('active');
      a.style.maxHeight = '0px';
      const q = a.previousElementSibling;
      if (q && q.classList) q.classList.remove('active');
    }
  });

  // Toggle the clicked one with smooth height animation
  if (isOpen) {
    answer.classList.remove('active');
    answer.style.maxHeight = '0px';
    btn.classList.remove('active');
  } else {
            answer.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
    btn.classList.add('active');
  }
}

// Initialize: all closed at load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-answer').forEach(a => {
    a.classList.remove('active');
    a.style.maxHeight = '0px';
  });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Essay Generator Form Logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('SlohGPT website loaded successfully! 🚀');
    
    
    
    // Make footer logo white
    makeFooterLogoWhite();
    
    // Initialize essay generator
    initEssayGenerator();
});

function initEssayGenerator() {
    const essayForm = document.getElementById('essayGeneratorForm');
    const previewSection = document.getElementById('essayPreview');
    const essayTypeSelect = document.getElementById('essayType');
    
    if (essayForm) {
        essayForm.addEventListener('submit', handleEssayGeneration);
    }
    
    // Add dynamic placeholder functionality for main page
    if (essayTypeSelect) {
        essayTypeSelect.addEventListener('change', function() {
            const selectedType = this.value;
            if (selectedType) {
                updateTopicPlaceholder(selectedType);
            }
        });
    }
}

function handleEssayGeneration(e) {
    e.preventDefault();
    
    const essayType = document.getElementById('essayType').value;
    const essayTopic = document.getElementById('essayTopic').value;
    
    if (!essayType || !essayTopic) {
        alert('Prosím, vyplň všetky polia!');
        return;
    }
    
    console.log('Generating essay preview for:', { essayType, essayTopic });
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generujem...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showEssayPreview(essayType, essayTopic);
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Scroll to preview with smooth animation
        setTimeout(() => {
            document.getElementById('essayPreview').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
    }, 2000);
}

function showEssayPreview(essayType, essayTopic) {
    const previewSection = document.getElementById('essayPreview');
    const previewContent = document.getElementById('previewContent');
    
    // Update preview content based on essay type and topic
    updatePreviewContent(essayType, essayTopic);
    
    // Show the preview section with animation
    previewSection.style.display = 'block';
    setTimeout(() => {
        previewSection.classList.add('show');
        
        // Show upsells and attach coaching handlers
        if (typeof window.attachCoachingHandlers === 'function') window.attachCoachingHandlers();
        const upsells = document.querySelector('#upsells, .upsell-grid');
        if (upsells) upsells.style.display = '';
    }, 50);
}

// Dynamic placeholder topics for each essay type
const essayTopicExamples = {
    'rozpravanie': ['Môj najkrajší deň', 'Nezabudnuteľný zážitok'],
    'uvaha': ['Moja budúcnosť', 'Význam priateľstva'],
    'vyklad': ['Čo je šťastie', 'Význam vzdelania'],
    'charakteristika': ['Moja mama', 'Môj najlepší priateľ'],
    'opis': ['Moja izba', 'Jesenný park'],
    'prejav': ['Deň matiek', 'Rozlúčka so školou'],
    'zivotopis': ['Ľudovít Štúr', 'Milan Rastislav Štefánik'],
    'diskusia': ['Sociálne siete', 'Ekológia vs. ekonomika']
};

function updateTopicPlaceholder(essayType, inputId = 'essayTopic') {
    // Try both possible input IDs - for main page and slohy page
    const topicInput = document.getElementById(inputId) || 
                      document.getElementById('essayTopic') || 
                      document.getElementById('topicInput');
    
    if (topicInput && essayTopicExamples[essayType]) {
        const examples = essayTopicExamples[essayType];
        topicInput.placeholder = `Napríklad: "${examples[0]}", "${examples[1]}" atď.`;
    }
}

function updatePreviewContent(essayType, essayTopic) {
    const previewContent = document.getElementById('previewContent');
    
    // Generate dynamic content based on essay type
    const essayTypeMap = {
        'rozpravanie': {
            title: 'Rozprávanie',
            structure: [
                'Úvod - zaujímavý začiatok a uvedenie do deja',
                'Rozvinutie - chronologický priebeh udalostí s detailmi',
                'Vrchol - najdôležitejší moment príbehu',
                'Záver - poučenie alebo zamyslenie nad udalosťami'
            ],
            language: [
                'Priame reči pre oživenie príbehu',
                'Opisné adjektíva pre atmosféru',
                'Časové spojky pre plynulý prechod'
            ]
        },
        'uvaha': {
            title: 'Úvaha',
            structure: [
                'Úvod - predstavenie témy a vlastného postoja',
                'Rozvinutie - argumenty a protiargumenty',
                'Príklady z vlastnej skúsenosti',
                'Záver - zhrnutie a finálne stanovisko'
            ],
            language: [
                'Filozofické otázky pre zamyslenie',
                'Osobné zážitky ako príklady',
                'Rečnícke otázky pre zapojenie čitateľa'
            ]
        },
        'vyklad': {
            title: 'Výklad',
            structure: [
                'Úvod - vymedzenie pojmu alebo témy',
                'Rozvinutie - systematické vysvetlenie',
                'Príklady a konkrétne situácie',
                'Záver - zhrnutie najdôležitejších bodov'
            ],
            language: [
                'Odborné termíny vysvetlené jednoducho',
                'Príklady z každodenného života',
                'Logické spojky pre súvislý text'
            ]
        },
        'charakteristika': {
            title: 'Charakteristika',
            structure: [
                'Úvod - predstavenie osoby a prvý dojem',
                'Rozvinutie - vonkajšie a vnútorné vlastnosti',
                'Príklady konkrétneho správania',
                'Záver - celkové zhodnotenie osoby'
            ],
            language: [
                'Opisné adjektíva pre vzhľad',
                'Charakterové vlastnosti',
                'Konkrétne príklady správania'
            ]
        },
        'opis': {
            title: 'Opis',
            structure: [
                'Úvod - celkový dojem a atmosféra',
                'Rozvinutie - systematický opis detailov',
                'Najvýraznejšie prvky',
                'Záver - subjektívny dojem'
            ],
            language: [
                'Zmyslové vnemy (zrak, sluch, čuch)',
                'Priestorové určenia',
                'Poetické prirovnania'
            ]
        },
        'prejav': {
            title: 'Prejav',
            structure: [
                'Úvod - oslovenie a predstavenie témy',
                'Rozvinutie - hlavné myšlienky',
                'Argumenty a príklady',
                'Záver - výzva alebo poďakovanie'
            ],
            language: [
                'Rečnícke otázky',
                'Emotívne výrazy',
                'Oslovenia publika'
            ]
        },
        'zivotopis': {
            title: 'Životopis',
            structure: [
                'Úvod - predstavenie osoby a jej významu',
                'Rozvinutie - chronologický prehľad života',
                'Najdôležitejšie úspechy a diela',
                'Záver - odkaz pre budúce generácie'
            ],
            language: [
                'Časové určenia',
                'Hodnotenie prínosu',
                'Historický kontext'
            ]
        },
        'diskusia': {
            title: 'Diskusia',
            structure: [
                'Úvod - predstavenie problému',
                'Rozvinutie - rôzne názory a argumenty',
                'Vlastné stanovisko s odôvodnením',
                'Záver - možné riešenia'
            ],
            language: [
                'Argumentačné spojky',
                'Vyjadrenia názoru',
                'Protikladné výrazy'
            ]
        }
    };
    
    const essayData = essayTypeMap[essayType] || essayTypeMap['rozpravanie'];
    
    previewContent.innerHTML = `
        <div class="preview-item">
            <h3>📝 Štruktúra pre ${essayData.title.toLowerCase()}: "${essayTopic}"</h3>
            <ul>
                ${essayData.structure.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="preview-item">
            <h3>🎯 Jazykové prostriedky na mieru</h3>
            <ul>
                ${essayData.language.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="preview-item">
            <h3>💡 Personalizované tipy</h3>
            <p>Pre tému "${essayTopic}" odporúčame zamerať sa na osobné zážitky a konkrétne príklady. Používaj živý jazyk a vyhni sa všeobecným frázam.</p>
        </div>
    `;
}

// Payment simulation functions
function unlockPreview() {
    console.log('Unlock preview for 1€ clicked');
    
    // Simulate Stripe integration
    if (confirm('Presmerujeme ťa na platobný systém Stripe. Pokračovať?')) {
        // In real implementation, this would redirect to Stripe
        alert('Demo: Platba 1€ prebehla úspešne! ✅\n\nV skutočnej verzii by sa preview odomkol.');
        
        // For demo, remove blur effect
        const blurredContent = document.querySelector('.blurred-preview');
        if (blurredContent) {
            blurredContent.style.filter = 'none';
            blurredContent.style.pointerEvents = 'auto';
            blurredContent.style.userSelect = 'auto';
        }
    }
}

function buyFullEssay() {
    console.log('Buy full essay for 10€ clicked');
    
    // Simulate Stripe integration
    if (confirm('Presmerujeme ťa na platobný systém Stripe pre nákup celého slohu za 10€. Pokračovať?')) {
        // In real implementation, this would redirect to Stripe
        alert('Demo: Platba 10€ prebehla úspešne! ✅\n\nV skutočnej verzii by sa vygeneroval celý sloh.');
        
        // For demo, show success message
        showFullEssaySuccess();
    }
}

function showFullEssaySuccess() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    overlay.innerHTML = `
        <div style="
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            margin: 1rem;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #6B4EFF; margin-bottom: 1rem;">Ďakujeme!</h2>
            <p style="margin-bottom: 2rem; color: #666;">Tvoj personalizovaný sloh bude pripravený do 5 minút. Pošleme ti ho na email.</p>
            <button onclick="this.closest('div').parentElement.remove()" style="
                background: #6B4EFF;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
            ">Zavrieť</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Simple scroll effect for header (optional)
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    
    // Footer logo is already white on load
});


/* ===== SLOHY PAGE: use same mechanism as index.html ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Detect this page even if the wrapper class is missing
  const slohyRoot =
    document.querySelector('.quick-essay-main') ||
    document.getElementById('essayTypesGrid') ||
    document.querySelector('.essay-generator-card');

  if (!slohyRoot) return; // not on slohy.html

  const typeButtons = Array.from(document.querySelectorAll('.essay-type-btn'));
  const topicInput  = document.getElementById('topicInput');
  const cta         = document.getElementById('generateBtn');
  const previewSection = document.getElementById('essayPreview');

  let selectedType = '';

  // Clickable/selectable genre icons
  typeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      typeButtons.forEach(b => {
        b.classList.remove('selected');
        b.removeAttribute('aria-selected');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-selected', 'true');

      selectedType = (btn.dataset.type || btn.textContent || '').trim().toLowerCase();

      // Update placeholder examples for this type (works for both pages)
      updateTopicPlaceholder(selectedType, 'topicInput');

      // Enable CTA if topic already typed
      if (selectedType && topicInput && topicInput.value.trim()) {
        cta.disabled = false;
      }
    });
  });

  // Enable/disable CTA as the user types topic
  if (topicInput && cta) {
    const toggle = () => {
      cta.disabled = !(selectedType && topicInput.value.trim().length > 0);
    };
    topicInput.addEventListener('input', toggle);
    toggle();
  }

  // CTA → show blurred preview (same UX as index)
  if (cta) {
    cta.addEventListener('click', (e) => {
      e.preventDefault();

      const topic = (topicInput?.value || '').trim();
      if (!selectedType || !topic) {
        alert('Prosím, vyber typ slohu a zadaj tému.');
        return;
      }

      const original = cta.innerHTML;
      cta.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generujem.';
      cta.disabled = true;

      // Match index timing feel
      setTimeout(() => {
        showEssayPreview(selectedType, topic);
        cta.innerHTML = original;
        cta.disabled = false;
        previewSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1200);
    });
  }
  
  // Initialize scroll animations for info sections
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.info-section').forEach(section => {
      observer.observe(section);
    });
  }, 500);
});

// Coaching Upsell Handlers
(() => {
  const byId = (id) => document.getElementById(id);

  function attachCoachingHandlers() {
    const btn = byId('btnCoaching');
    const bump = byId('chkCoachingBump');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';

    btn.addEventListener('click', () => {
      // Persist user intent for checkout layer (Stripe later)
      window.__checkout = window.__checkout || {};
      window.__checkout.addons = window.__checkout.addons || {};
      window.__checkout.addons.coaching = true;
      window.__checkout.productType = window.__checkout.productType || 'preview'; // default if none chosen yet
      window.__checkout.bumpWithFull = !!(bump && bump.checked);

      // TODO(Stripe): if using Checkout, pass in metadata: { coaching: true, bumpWithFull: true/false }
      // For now, just show a toast / visual confirmation:
      if (typeof window.showToast === 'function') {
        window.showToast('Coaching pridaný ✅');
      } else {
        alert('Coaching pridaný ✅');
      }

      // Optional analytics hook
      try {
        window.gtag && gtag('event', 'add_coaching', { value: 5, currency: 'EUR' });
      } catch(e){}
    });

    bump && bump.addEventListener('change', () => {
      window.__checkout = window.__checkout || {};
      window.__checkout.bumpWithFull = !!bump.checked;
    });
  }

  // Call after preview render AND on DOMContentLoaded as a fallback
  document.addEventListener('DOMContentLoaded', attachCoachingHandlers);
  window.attachCoachingHandlers = attachCoachingHandlers;
})();






