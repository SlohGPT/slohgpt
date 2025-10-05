'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
// Head component not needed in app directory - metadata is handled in layout.tsx

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    const userEmail = localStorage.getItem('userEmail')
    if (token && userEmail) {
      // In a real app, you'd verify the token with the server
      setUser({ email: userEmail, name: userEmail.split('@')[0] })
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Načítavam...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Nie ste prihlásený</h1>
          <p className="text-gray-600 mb-6">Pre prístup k dashboardu sa musíte prihlásiť.</p>
          <Link 
            href="/login.html" 
            target="_blank"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Prihlásiť sa
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO metadata is handled in layout.tsx for app directory */}
      
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Vitajte, {user.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Odhlásiť sa
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Moje eseje</h3>
              <p className="text-purple-700">0 vytvorených esejí</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Aktívny plán</h3>
              <p className="text-blue-700">Bezplatný plán</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Posledná aktivita</h3>
              <p className="text-green-700">Dnes</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rýchle akcie</h2>
            <div className="flex gap-4">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                Vytvoriť nový esej
              </button>
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Zobraziť históriu
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
