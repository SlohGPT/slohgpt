'use client'

import FloatingBackground from './FloatingBackground'

export default function FinalCTA() {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="final-cta" className="final-cta-section">
      <div className="container">
        <div className="final-cta-card">
          {/* Floating background icons inside the card */}
          <div className="final-cta-bg">
            <FloatingBackground mode="viewport" />
          </div>
          
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
                onClick={() => scrollTo('#idemo-card')}
                aria-label="Vyskúšať ukážku zdarma"
              >
                ✨ Vyskúšaj demo teraz
              </button>

              <button
                className="cta-secondary"
                onClick={async () => {
                  try {
                    // Redirect directly to Stripe checkout
                    const { redirectToCheckout } = await import('@/lib/stripe')
                    await redirectToCheckout(process.env.NEXT_PUBLIC_STRIPE_COMPLETE_ESSAY_PRICE_ID!)
                  } catch (error) {
                    console.error('Checkout error:', error)
                    // Fallback to pricing section if Stripe fails
                    scrollTo('#pricing')
                  }
                }}
                aria-label="Objednaj teraz"
              >
                Objednaj teraz
              </button>
            </div>

            <ul className="final-cta-bullets">
              <li>30 sekúnd na demo</li>
              <li>Žiadna registrácia</li>
              <li>Okamžitý výsledok</li>
            </ul>
            
            {/* Reassuring text */}
            <p className="final-cta-reassurance">
              Pripoj sa k stovkám študentov, ktorí už píšu lepšie slohy
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
