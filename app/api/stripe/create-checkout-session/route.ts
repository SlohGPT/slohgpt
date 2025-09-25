import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-08-27.basil',
    })

    const { priceId, email, customPrice, quantity } = await request.json()

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: customPrice ? [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `SlohGPT - ${quantity || 1} ${quantity === 1 ? 'sloh' : quantity && quantity < 5 ? 'slohy' : 'slohov'}`,
              description: `Kompletný sloh s vysvetlením pre ${quantity || 1} ${quantity === 1 ? 'sloh' : quantity && quantity < 5 ? 'slohy' : 'slohov'}`,
            },
            unit_amount: Math.round(customPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ] : [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slohgpt.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://slohgpt.vercel.app'}/pricing`,
      customer_email: email, // Optional: pre-fill email if provided
      metadata: {
        source: customPrice ? 'pricing_page_custom' : 'homepage_cta',
        quantity: quantity?.toString() || '1',
        customPrice: customPrice?.toString() || '',
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
