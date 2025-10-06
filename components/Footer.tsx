'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 0px 0px'
      }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className={`footer ${isVisible ? 'footer-visible' : ''}`}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-logo">
              <img 
                src="/logo-outlined-v2.png" 
                alt="SlohGPT" 
                className="logo-original"
              />
              <h3>SlohGPT</h3>
              <p>Pomocou AI napíš sloh za pár minút. Ušetrí čas, zníži stres a zlepší známky.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Produkt</h4>
                <Link href="/#idemo-card">Vygeneruj sloh</Link>
                <Link href="/pricing#how-it-works">Ako to funguje</Link>
                <Link href="/#benefits">Prečo SlohGPT</Link>
              </div>
              
              <div className="footer-column">
                <h4>Podpora</h4>
                <Link href="/#faq">FAQ</Link>
                <Link href="mailto:slohgpt@gmail.com">Kontakt</Link>
                <Link href="/pricing#faq">Pomoc</Link>
              </div>
              
              <div className="footer-column">
                <h4>Právne</h4>
                <Link href="/obchodne-podmienky">Obchodné podmienky</Link>
                <Link href="/ochrana-sukromia">Ochrana súkromia</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/podmienky-pouzivania">Podmienky používania</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 SlohGPT. Všetky práva vyhradené.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
