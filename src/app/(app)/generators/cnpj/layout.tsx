import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'CNPJ Generator',
  description: 'Generate a valid CNPJ number instantly.',
  keywords: [
    'gerador de cnpj',
    'gerador de cnpj online',
    'gerador de cnpj válido',
    'gerador de cnpj com números',
    'gerador de cnpj com pontuação',
    'gerador de cnpj com máscara',
  ],
}

export default function CNPJGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
