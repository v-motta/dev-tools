import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'CPF Generator',
  description: 'Generate a valid CPF number instantly.',
  keywords: [
    'gerador de cpf',
    'gerador de cpf online',
    'gerador de cpf válido',
    'gerador de cpf com números',
    'gerador de cpf com pontuação',
    'gerador de cpf com máscara',
  ],
}

export default function CPFGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
