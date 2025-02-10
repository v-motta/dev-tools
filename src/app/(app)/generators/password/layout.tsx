import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Gerador de Senha',
  description:
    'Gere senhas seguras e aleatórias com diferentes combinações de caracteres, incluindo letras maiúsculas, números e símbolos especiais.',
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
