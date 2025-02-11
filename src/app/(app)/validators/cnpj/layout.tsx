import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'CNPJ Validator',
  description: 'Validate a CNPJ number instantly.',
  keywords: [
    'validador de cnpj',
    'validador de cnpj online',
    'validador de cnpj válido',
    'validador de cnpj com números',
    'validador de cnpj com pontuação',
    'validador de cnpj com máscara',
  ],
}

export default function CNPJValidatorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
