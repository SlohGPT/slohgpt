import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import StickyCTA from '@/components/StickyCTA'
import AnnouncementController from '@/components/AnnouncementController'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
  title: 'SlohGPT - AI Pre Slohy | Napíš sloh za 5 minút pomocou AI',
  description: 'SlohGPT je AI nástroj pre slovenské slohy. Pomáha stredoškolským študentom napísať sloh za 5 minút pomocou AI. AI Na Slohy, AI Pre Slohy, AI Slohy - ušetrí čas, zníži stres a zlepší známky.',
  keywords: 'AI slohy, AI pre slohy, AI na slohy, sloh AI, slovenské slohy, AI písanie slohov, stredná škola slohy, maturitné slohy, úvaha AI, charakteristika AI, rozprávanie AI, slovenský jazyk AI, domáce úlohy AI, NÚCEM slohy, AI esej, AI písanie, slovenský AI, AI študenti, AI pomôcka slohy, AI generátor slohov',
  authors: [{ name: 'SlohGPT', url: 'https://slohgpt.sk' }],
  creator: 'SlohGPT',
  publisher: 'SlohGPT',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://slohgpt.sk',
  },
  openGraph: {
    title: 'SlohGPT - AI Pre Slohy | Napíš sloh za 5 minút pomocou AI',
    description: 'AI nástroj pre slovenské slohy. Pomocou AI napíš sloh za 5 minút. Ušetrí čas, zníži stres a zlepší známky. AI Na Slohy, AI Pre Slohy.',
    type: 'website',
    url: 'https://slohgpt.sk',
    siteName: 'SlohGPT',
    locale: 'sk_SK',
    images: [
      {
        url: 'https://slohgpt.sk/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SlohGPT - AI Pre Slohy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SlohGPT - AI Pre Slohy | Napíš sloh za 5 minút pomocou AI',
    description: 'AI nástroj pre slovenské slohy. Pomocou AI napíš sloh za 5 minút. Ušetrí čas, zníži stres a zlepší známky.',
    images: ['https://slohgpt.sk/og-image.png'],
    creator: '@slohgpt',
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=20250912', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png?v=20250912', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png?v=20250912', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.png?v=20250912', color: '#000000' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
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
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SlohGPT",
              "alternateName": ["AI Pre Slohy", "AI Na Slohy", "AI Slohy"],
              "description": "AI nástroj pre slovenské slohy. Pomáha stredoškolským študentom napísať sloh za 5 minút pomocou AI.",
              "url": "https://slohgpt.sk",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "7.99",
                "priceCurrency": "EUR",
                "description": "Kompletný sloh s vysvetlením"
              },
              "author": {
                "@type": "Organization",
                "name": "SlohGPT",
                "url": "https://slohgpt.sk"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "featureList": [
                "AI generovanie slovenských slohov",
                "8 typov slohov (úvaha, charakteristika, rozprávanie)",
                "NÚCEM kritériá",
                "Vysvetlenie štruktúry",
                "Okamžité výsledky",
                "Bez registrácie"
              ],
              "screenshot": "https://slohgpt.sk/screenshot.png",
              "softwareVersion": "1.0",
              "datePublished": "2024-01-01",
              "inLanguage": "sk",
              "audience": {
                "@type": "EducationalAudience",
                "educationalRole": "student",
                "audienceType": "high school students"
              }
            })
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="SK" />
        <meta name="geo.country" content="Slovakia" />
        <meta name="language" content="sk" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        
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
        <AnnouncementController />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
