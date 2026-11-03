import type { Metadata } from 'next'
import { BMRCalculator } from './bmr-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de TMB',
  description:
    'Calcule sua Taxa Metabólica Basal (TMB) e seu gasto calórico diário.',
  keywords: [
    'calculador de tmb',
    'calculador de tmb online',
    'calculador de tmb grátis',
  ],
}

export default function BMRCalculatorPage() {
  return <BMRCalculator />
}
