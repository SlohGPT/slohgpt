import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Don't redirect if we're already on the announcement page
  if (pathname === '/announcement') {
    return NextResponse.next()
  }
  
  // Don't redirect API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }
  
  // Don't redirect admin routes
  if (pathname.startsWith('/admin/')) {
    console.log('✅ Admin route detected, allowing:', pathname)
    return NextResponse.next()
  }
  
  // Don't redirect static files
  if (pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon') ||
      pathname.includes('.')) {
    return NextResponse.next()
  }
  
  // Check if it's a bot/crawler (for SEO)
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /bot|crawler|spider|crawling|facebook|twitter|linkedin|pinterest|whatsapp|telegram|slack|discord|skype|zoom|teams|googlebot|bingbot|yandexbot|baiduspider|duckduckbot|applebot|facebookexternalhit|twitterbot|linkedinbot|pinterestbot|slackbot|discordbot|telegrambot|whatsappbot|skypebot|zoombot|teamsbot/i.test(userAgent)
  
  // If it's a bot, serve the original content for SEO
  if (isBot) {
    return NextResponse.next()
  }
  
  // For all other requests, redirect to announcement page
  return NextResponse.redirect(new URL('/announcement', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - admin (Admin routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico).*)',
  ],
}
