import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'CPF Validator',
  description: 'Validate a CPF number instantly.',
  keywords: [
    'validador de cpf',
    'validador de cpf online',
    'validador de cpf válido',
    'validador de cpf com números',
    'validador de cpf com pontuação',
    'validador de cpf com máscara',
  ],
}

export default function CPFValidatorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
