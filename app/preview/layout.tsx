import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SlohGPT - Preview',
  description: 'Password protected preview page.',
  robots: 'noindex, nofollow',
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
