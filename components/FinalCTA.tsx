'use client'

import FloatingBackground from './FloatingBackground'
import { scrollToSelector } from '@/lib/scroll-utils'

export default function FinalCTA() {
  const scrollTo = (selector: string) => {
    scrollToSelector(selector, 80)
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
                onClick={async () => {
                  try {
                    // Redirect directly to Stripe checkout
                    const { redirectToCheckout } = await import('@/lib/stripe')
                    await redirectToCheckout(process.env.NEXT_PUBLIC_STRIPE_COMPLETE_ESSAY_PRICE_ID!)
                  } catch (error) {
                    console.error('Checkout error:', error)
                    // Fallback to demo section if Stripe fails
                    scrollTo('#idemo-card')
                  }
                }}
                aria-label="Začať teraz za €7.99"
              >
                ✨ Začať teraz - €7.99
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
