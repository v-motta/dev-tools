import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Validador de CPF',
  description: 'Valide um número de CPF instantaneamente.',
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
