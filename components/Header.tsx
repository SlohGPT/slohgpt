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
    { href: '/', label: 'Domov', key: 'domov' },
    { href: '/pricing', label: 'Cenník', key: 'cennik' },
    { href: '/#benefits', label: 'Prečo SlohGPT?', key: 'benefits' },
    { href: '/#examples', label: 'Príklady', key: 'examples' },
  ]

  // Legal page specific navigation
  const legalNavLinks = [
    { href: '/podmienky-pouzivania', label: 'Podmienky používania', key: 'podmienky' },
    { href: '/ochrana-sukromia', label: 'Ochrana súkromia', key: 'sukromie' },
    { href: '/obchodne-podmienky', label: 'Obchodné podmienky', key: 'obchodne' },
    { href: '/cookies', label: 'Cookies', key: 'cookies' },
  ]

  const isLegalPage = ['/podmienky-pouzivania', '/ochrana-sukromia', '/obchodne-podmienky', '/cookies'].includes(pathname)

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

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobileMenu">
          <div className="menuOverlay" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
            className="menuContent"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
        {/* Mobile Menu Content */}
          {/* Header with Logo and Close Button */}
          <div className="menuHeader">
            {/* Logo in Menu */}
            <div className="menuLogo">
              <img
                src="/original-logo-without-background.png"
                alt="SlohGPT"
                className="logoImage"
              />
            </div>

            {/* Close Button */}
            <button className="closeButton" onClick={() => setIsMobileMenuOpen(false)}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        
          {/* Navigation Items */}
          <nav className="menuNav">
            <Link
              href="/" 
              className={`menuItem ${pathname === '/' ? 'menuItemActive' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Domov
            </Link>

            <Link 
              href="/pricing" 
              className={`menuItem ${pathname === '/pricing' ? 'menuItemActive' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Cenník
            </Link>

            <Link 
              href="/#benefits" 
              className="menuItem"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
              Prečo SlohGPT?
            </Link>

            <Link 
              href="/#examples" 
              className="menuItem"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              Príklady
            </Link>

            {/* Action Buttons */}
            <div className="historySection">
              <div className="historyTitle">Akcie</div>
              <div className="historyItems">
              <a
                href="/login.html" 
                target="_blank" 
                rel="noopener noreferrer"
                  className="historyItem"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H15"/>
                    <path d="M10 17L15 12L10 7"/>
                    <path d="M15 12H3"/>
                  </svg>
                  <span>Prihlásiť sa</span>
                </a>
              <Link 
                href="/#idemo-card" 
                  className="historyItem"
                onClick={(e) => {
                  setIsMobileMenuOpen(false)
                  setTimeout(() => {
                    const element = document.getElementById('idemo-card')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                  </svg>
                  <span>Demo zdarma</span>
              </Link>
              </div>
            </div>
        </nav>
        </div>
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
