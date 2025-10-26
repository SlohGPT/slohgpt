'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function AnnouncementController() {
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if the user has already seen the announcement
    const announcementShown = localStorage.getItem('announcement_shown')

    // Only redirect if:
    // 1. User hasn't seen the announcement
    // 2. We're not already on the announcement page
    // 3. We're on the client side
    if (!announcementShown && pathname !== '/announcement' && isClient) {
      router.push('/announcement')
    }
  }, [router, pathname, isClient])

  // Don't render anything
  return null
}
