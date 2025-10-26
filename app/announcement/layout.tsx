import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SlohGPT - Ešte pracujeme na tom',
  description: 'Pripravujeme SlohGPT pre študentov všetkých ročníkov stredných škôl.',
  robots: 'noindex, nofollow',
}

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
