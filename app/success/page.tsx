'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Payment was successful, redirect to auth system after a short delay
    const timer = setTimeout(() => {
      // Redirect to the auth system register page
      // We'll pass the session_id as a parameter for account linking
      const authUrl = `${process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3100'}/register?payment_success=true&session_id=${sessionId}`
      window.location.href = authUrl
    }, 3000)

    setIsLoading(false)

    return () => clearTimeout(timer)
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="success-page">
        <div className="success-container">
          <div className="success-spinner">
            <div className="spinner"></div>
          </div>
          <h2>Spracovávame vašu platbu...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="success-page">
      <div className="success-container">
        <div className="success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h1>Platba úspešná! 🎉</h1>
        <p className="success-message">
          Ďakujeme za vašu objednávku. Teraz si môžete vytvoriť účet a začať používať SlohGPT.
        </p>
        <div className="success-actions">
          <p className="redirect-notice">
            Presmerovávame vás na registráciu...
          </p>
          <Link href={`${process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3100'}/register?payment_success=true&session_id=${sessionId}`} className="success-button">
            Pokračovať na registráciu
          </Link>
        </div>
      </div>
    </div>
  )
}
