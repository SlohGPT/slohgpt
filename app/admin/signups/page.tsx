'use client'

import { useState, useEffect } from 'react'

interface Signup {
  id: string
  email: string
  created_at: string
}

export default function AdminSignupsPage() {
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSignups()
    
    // Hide all global layout components (same as announcement page)
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const floatingBackground = document.querySelector('[data-floating-background]')
    const stickyCTA = document.querySelector('[data-sticky-cta]')
    const announcementController = document.querySelector('[data-announcement-controller]')
    
    if (header) (header as HTMLElement).style.display = 'none'
    if (footer) (footer as HTMLElement).style.display = 'none'
    if (floatingBackground) (floatingBackground as HTMLElement).style.display = 'none'
    if (stickyCTA) (stickyCTA as HTMLElement).style.display = 'none'
    if (announcementController) (announcementController as HTMLElement).style.display = 'none'
    
    // Set body background
    document.body.style.backgroundColor = '#0b0e1a'
    
    // Cleanup function to restore components when leaving
    return () => {
      if (header) (header as HTMLElement).style.display = ''
      if (footer) (footer as HTMLElement).style.display = ''
      if (floatingBackground) (floatingBackground as HTMLElement).style.display = ''
      if (stickyCTA) (stickyCTA as HTMLElement).style.display = ''
      if (announcementController) (announcementController as HTMLElement).style.display = ''
      document.body.style.backgroundColor = ''
    }
  }, [])

  const fetchSignups = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      
      const response = await fetch('/api/announcement')
      const data = await response.json()
      
      if (response.ok) {
        setSignups(data.signups || [])
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch signups')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('sk-SK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        background: '#0b0e1a',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{ color: 'white', fontSize: '1.5rem' }}>Loading signups...</h1>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        /* Hide all global layout components */
        header,
        footer,
        [data-floating-background],
        [data-sticky-cta],
        [data-announcement-controller],
        .floating,
        .twinkle-animation,
        [class*="floating"],
        [class*="twinkle"] {
          display: none !important;
        }
        
        /* Set clean background */
        body {
          background-color: #0b0e1a !important;
          margin: 0;
          padding: 0;
        }
        
        /* Clean admin page styling */
        #main-content {
          background: #0b0e1a !important;
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }
      `}</style>
      
      <div style={{ 
        padding: '2rem', 
        maxWidth: '1000px', 
        margin: '0 auto',
        background: '#0b0e1a',
        minHeight: '100vh',
        color: 'white',
        position: 'relative'
      }}>
      {/* Content */}
      <div>
        <h1 style={{ 
          marginBottom: '2rem', 
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          📧 Email Signups ({signups.length})
        </h1>
      
      {error && (
        <div style={{ 
          background: '#dc2626', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          border: '1px solid #ef4444'
        }}>
          ❌ Error: {error}
        </div>
      )}

      {signups.length === 0 ? (
        <div style={{ 
          background: '#1f2937', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          textAlign: 'center',
          border: '1px solid #374151'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem' }}>📭 No signups yet.</p>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Emails will appear here once people start signing up.
          </p>
        </div>
      ) : (
        <div style={{ 
          background: '#1f2937', 
          borderRadius: '0.5rem', 
          overflow: 'hidden', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          border: '1px solid #374151'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#111827' }}>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #374151',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  📧 Email Address
                </th>
                <th style={{ 
                  padding: '1rem', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #374151',
                  color: 'white',
                  fontWeight: '600'
                }}>
                  📅 Signup Date
                </th>
              </tr>
            </thead>
            <tbody>
              {signups.map((signup, index) => (
                <tr key={signup.id} style={{ 
                  borderBottom: index < signups.length - 1 ? '1px solid #374151' : 'none',
                  background: index % 2 === 0 ? '#1f2937' : '#111827'
                }}>
                  <td style={{ 
                    padding: '1rem', 
                    color: '#e5e7eb',
                    fontSize: '0.95rem'
                  }}>
                    {signup.email}
                  </td>
                  <td style={{ 
                    padding: '1rem', 
                    color: '#9ca3af', 
                    fontSize: '0.875rem'
                  }}>
                    {formatDate(signup.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button 
        onClick={() => fetchSignups(true)}
        disabled={refreshing}
        style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          background: refreshing 
            ? 'linear-gradient(135deg, #6b7280, #9ca3af)' 
            : 'linear-gradient(135deg, #5E3CF6, #7C3AED)',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: refreshing ? 'not-allowed' : 'pointer',
          fontSize: '0.95rem',
          fontWeight: '600',
          boxShadow: refreshing 
            ? '0 2px 6px rgba(107,114,128,0.3)' 
            : '0 4px 12px rgba(94,60,246,0.3)',
          transition: 'all 0.3s ease',
          transform: refreshing ? 'scale(0.98)' : 'scale(1)',
          opacity: refreshing ? 0.8 : 1
        }}
        onMouseOver={(e) => {
          if (!refreshing) {
            e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)'
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(94,60,246,0.4)'
          }
        }}
        onMouseOut={(e) => {
          if (!refreshing) {
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(94,60,246,0.3)'
          }
        }}
      >
        <span style={{ 
          display: 'inline-block',
          transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)',
          transition: 'transform 0.5s ease'
        }}>
          🔄
        </span>
        {' '}
        {refreshing ? 'Refreshing...' : 'Refresh Signups'}
      </button>
      </div>
      </div>
    </>
  )
}
