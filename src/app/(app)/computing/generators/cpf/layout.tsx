import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'CPF Generator',
  description: 'Generate a valid CPF number instantly.',
}

export default function CPFGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
