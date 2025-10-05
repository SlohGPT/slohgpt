'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'

function VerifyEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Chýba overovací token.')
      return
    }
    
    verifyEmail(token)
  }, [searchParams])
  
  async function verifyEmail(token: string) {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`)
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage('Email úspešne overený! Teraz sa môžete prihlásiť.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Overenie emailu zlyhalo.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Chyba pri overovaní emailu.')
    }
  }
  
  return (
    <>
      <Head>
        <title>Overenie emailu - SlohGPT | AI Pre Slohy</title>
        <meta name="description" content="Overenie emailovej adresy pre SlohGPT účet. Dokončite registráciu a začnite používať AI Pre Slohy." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Overenie Emailu
        </h1>
        
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Overujem váš email...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-center text-green-600">
            <div className="text-4xl mb-4">✅</div>
            <p className="mb-4">{message}</p>
            <a 
              href="/login.html" 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Prejsť na prihlásenie
            </a>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-center text-red-600">
            <div className="text-4xl mb-4">❌</div>
            <p className="mb-4">{message}</p>
            <a 
              href="/register.html" 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              Skúsiť znovu
            </a>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Overenie Emailu
          </h1>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Načítavam...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
