import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import StickyCTA from '@/components/StickyCTA'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap', 
  adjustFontFallback: true, 
  variable: '--font-inter' 
})

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  display: 'swap', 
  adjustFontFallback: true, 
  variable: '--font-montserrat' 
})

export const metadata: Metadata = {
  title: 'SlohGPT - Napíš sloh za 5 minút pomocou AI',
  description: 'SlohGPT pomáha stredoškolským študentom napísať sloh za 5 minút pomocou AI. Ušetrí čas, zníži stres a zlepší známky.',
  keywords: 'sloh, AI, študenti, stredná škola, písanie, domáce úlohy, slovenský jazyk',
  authors: [{ name: 'SlohGPT' }],
  robots: 'index, follow',
  openGraph: {
    title: 'SlohGPT - Napíš sloh za 5 minút pomocou AI',
    description: 'Pomocou AI napíš sloh za 5 minút. Ušetrí čas, zníži stres a zlepší známky.',
    type: 'website',
    url: 'https://slohgpt.sk',
    locale: 'sk_SK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SlohGPT - Napíš sloh za 5 minút pomocou AI',
    description: 'Pomocou AI napíš sloh za 5 minút. Ušetrí čas, zníži stres a zlepší známky.',
  },
  icons: {
    icon: '/favicon.png?v=20250912',
    apple: '/favicon.png?v=20250912',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Favicon - Multiple formats for maximum compatibility with cache busting */}
        <link rel="icon" type="image/png" href="/favicon.png?v=20250912" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png?v=20250912" />
        <link rel="apple-touch-icon" href="/favicon.png?v=20250912" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=20250912" />
        
        {/* iOS Status Bar Color - matches white navigation bar */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        
        {/* Preload Font Awesome CSS */}
        <link 
          rel="preload" 
          as="style" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-inter">
        {/* Global floating background: fixed, masked to avoid header/footer */}
        <div
          aria-hidden
          id="global-floating-bg"
          style={{
            position: 'fixed',
            top: 'var(--header-h)',
            bottom: '0',
            left: 0,
            right: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(180deg, #0B0E1A 0%, #0F172A 100%)',
          }}
        >
          <FloatingBackground mode="viewport" />
        </div>

        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  )
}
