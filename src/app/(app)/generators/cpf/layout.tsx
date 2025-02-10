import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gerador de CPF',
  description: 'Gere um número de CPF válido instantaneamente.',
}

export default function CPFGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
