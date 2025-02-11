import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'BMR Calculator',
  description:
    'Calculate your Basal Metabolic Rate (BMR) with this free online tool.',
  keywords: [
    'calculador de tmb',
    'calculador de tmb online',
    'calculador de tmb grátis',
  ],
}

export default function BMRCalculatorLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
