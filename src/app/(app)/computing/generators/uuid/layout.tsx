import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'UUID Generator',
  description:
    'Generate secure and random passwords with different combinations of characters, including uppercase letters, numbers, and special symbols.',
  keywords: [
    'gerador de UUID',
    'gerador de UUID online',
    'gerador de UUID aleatória',
  ],
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
