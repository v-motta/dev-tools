import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gerador de CPF',
  description: 'Gere um número de CPF válido instantaneamente.',
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
