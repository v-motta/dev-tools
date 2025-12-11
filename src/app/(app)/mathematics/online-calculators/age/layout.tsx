import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Age Calculator',
  description: 'Calculate your age with this free online tool.',
  keywords: [
    'calculador de idade',
    'calculador de idade online',
    'calculador de idade grátis',
    'calculador de idade com data de nascimento',
    'calculador de idade com data de nascimento online',
    'calculador de idade com data de nascimento grátis',
  ],
}

export default function BMICalculatorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
