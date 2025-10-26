'use client'

import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Hide all global layout components
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const floatingBackground = document.querySelector('[data-floating-background]')
    const stickyCTA = document.querySelector('[data-sticky-cta]')
    const announcementController = document.querySelector('[data-announcement-controller]')
    
    // Also hide any FloatingBackground components
    const floatingBackgroundComponents = document.querySelectorAll('[class*="floating"], [class*="twinkle"]')
    
    if (header) (header as HTMLElement).style.display = 'none'
    if (footer) (footer as HTMLElement).style.display = 'none'
    if (floatingBackground) (floatingBackground as HTMLElement).style.display = 'none'
    if (stickyCTA) (stickyCTA as HTMLElement).style.display = 'none'
    if (announcementController) (announcementController as HTMLElement).style.display = 'none'
    
    // Hide all floating background elements
    floatingBackgroundComponents.forEach(el => {
      (el as HTMLElement).style.display = 'none'
    })
    
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
          background: #0b0e1a;
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }
      `}</style>
      {children}
    </>
  )
}
