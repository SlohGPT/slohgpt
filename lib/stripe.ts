import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// Create checkout session
export async function createCheckoutSession(priceId: string, email?: string, customPrice?: number, quantity?: number) {
  try {
    const response = await fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, email, customPrice, quantity }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { sessionId } = await response.json()
    return sessionId
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Redirect to Stripe Checkout
export async function redirectToCheckout(priceId: string, email?: string, customPrice?: number, quantity?: number) {
  try {
    const stripe = await stripePromise
    if (!stripe) {
      throw new Error('Stripe failed to load')
    }

    const sessionId = await createCheckoutSession(priceId, email, customPrice, quantity)
    
    const { error } = await stripe.redirectToCheckout({ sessionId })
    
    if (error) {
      console.error('Stripe checkout error:', error)
      throw error
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error)
    throw error
  }
}
