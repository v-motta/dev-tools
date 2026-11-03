import type { Metadata } from 'next'
import { AgeCalculator } from './age-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de idade',
  description:
    'Calcule a idade exata em anos, meses e dias a partir da data de nascimento.',
  keywords: [
    'calculador de idade',
    'calculador de idade online',
    'calculador de idade grátis',
    'calculador de idade com data de nascimento',
    'calculador de idade com data de nascimento online',
    'calculador de idade com data de nascimento grátis',
  ],
}

export default function AgeCalculatorPage() {
  return <AgeCalculator />
}
