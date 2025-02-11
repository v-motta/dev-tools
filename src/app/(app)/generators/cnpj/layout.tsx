import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gerador de CNPJ',
  description: 'Gere um número de CNPJ válido instantaneamente.',
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
