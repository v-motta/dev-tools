import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'BMI Calculator',
  description:
    'Calculate your body mass index (BMI) with this free online tool.',
  keywords: [
    'calculador de imc',
    'calculador de imc online',
    'calculador de imc grátis',
    'calculador de imc com peso',
    'calculador de imc com altura',
    'calculador de imc com peso e altura',
  ],
}

export default function BMICalculatorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
