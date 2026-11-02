import type { Metadata } from 'next'
import { BMRCalculator } from './bmr-calculator'

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

export default function BMRCalculatorPage() {
  return <BMRCalculator />
}
