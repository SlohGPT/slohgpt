'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)

  // Handle scroll effect - only toggle class, no inline styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1130)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle click outside to close menu and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.style.overflow = 'unset'
      document.body.classList.remove('mobile-menu-open')
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = 'unset'
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])

  // Additional body class toggle for global blur
  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [isMobileMenuOpen]);

  // Handle ESC key and focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        // Return focus to hamburger button
        setTimeout(() => {
          hamburgerButtonRef.current?.focus();
        }, 100);
      }

      // Focus trap
      if (event.key === 'Tab' && mobileMenuRef.current) {
        const focusableElements = mobileMenuRef.current.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the first focusable element in the menu
    setTimeout(() => {
      const firstFocusable = mobileMenuRef.current?.querySelector(
        'button, a[href]'
      ) as HTMLElement;
      firstFocusable?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Prevent navigation on current page
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === href) {
      e.preventDefault()
    }
  }

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/pricing', label: 'Cenník' },
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <img
              src="/original-logo-without-background.png"
              alt="SlohGPT"
              className="logo-image"
            />
          </Link>
        </div>

        <nav className="nav">
          {/* Desktop Navigation */}
          <div className="nav-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'is-current' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Desktop Auth CTA */}
            <div className="nav-auth">
              <a 
                href="/login.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="auth-link auth-primary"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)'
                }}
              >
                Prihlásiť sa
              </a>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={hamburgerButtonRef}
            className={`hamburger ${isMobileMenuOpen ? 'menu-open' : ''}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="hamburger-icon">
              <i className="fas fa-bars"></i>
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      {isMobile && (
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="mobile-menu-header">
            <div className="mobile-menu-logo">
              <img
                src="/original-logo-without-background.png"
                alt="SlohGPT"
                className="mobile-logo-image"
              />
              <span id="mobile-menu-title" className="sr-only">Navigačné menu</span>
            </div>
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Zavrieť menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        
        {/* Mobile Menu Auth CTA */}
        <div className="mobile-menu-auth">
          <a
            href="/login.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mobile-auth-primary"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'block',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              textAlign: 'center',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              margin: '0 2rem 1rem 2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}
          >
            Prihlásiť sa
          </a>
        </div>

        {/* Mobile Menu CTA */}
        <div className="mobile-menu-cta">
          <Link 
            href="/#idemo-card" 
            className="menu-cta cta-primary" 
            role="button"
            onClick={(e) => {
              setIsMobileMenuOpen(false)
              // Small delay to ensure menu closes before scroll
              setTimeout(() => {
                const element = document.getElementById('idemo-card')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }, 100)
            }}
          >
            Demo zdarma
          </Link>
        </div>

        {/* Mobile Menu Navigation */}
        <nav className="mobile-nav" aria-label="Hlavná navigácia">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-item">
                <Link 
                  href={link.href}
                  className={`mobile-nav-link ${pathname === link.href ? 'is-current' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            
            {/* Additional mobile-only links */}
            <li className="mobile-nav-item">
              <Link 
                href="/kontakt" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      )}
    </header>
  )
}

// Add screen reader only utility if not already defined
if (typeof document !== 'undefined' && !document.querySelector('style[data-sr-only]')) {
  const style = document.createElement('style')
  style.setAttribute('data-sr-only', 'true')
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `
  document.head.appendChild(style)
}
