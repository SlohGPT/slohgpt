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
              <p>Pomocou AI napíš sloh za 5 minút. Ušetrí čas, zníži stres a zlepší známky.</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Produkt</h4>
                <Link href="/#generator">Vygeneruj sloh</Link>
                <Link href="/#how-it-works">Ako to funguje</Link>
                <Link href="/#why-slohgpt">Prečo SlohGPT</Link>
              </div>
              
              <div className="footer-column">
                <h4>Podpora</h4>
                <Link href="/#faq">FAQ</Link>
                <Link href="mailto:podpora@slohgpt.sk">Kontakt</Link>
                <Link href="#help">Pomoc</Link>
                <Link href="#tutorials">Návody</Link>
              </div>
              
              <div className="footer-column">
                <h4>Právne</h4>
                <Link href="#terms">Obchodné podmienky</Link>
                <Link href="#privacy">Ochrana súkromia</Link>
                <Link href="#cookies">Cookies</Link>
                <Link href="#refund">Reklamácie</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 SlohGPT. Všetky práva vyhradené.</p>
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
