import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gerador de Senha',
  description:
    'Gere senhas seguras e aleatórias com diferentes combinações de caracteres, incluindo letras maiúsculas, números e símbolos especiais.',
  keywords: [
    'gerador de senha',
    'gerador de senha online',
    'gerador de senha segura',
    'gerador de senha aleatória',
    'gerador de senha forte',
    'gerador de senha com letras e números',
    'gerador de senha com letras maiúsculas',
    'gerador de senha com letras minúsculas',
    'gerador de senha com números',
    'gerador de senha com símbolos',
    'gerador de senha com caracteres especiais',
  ],
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
