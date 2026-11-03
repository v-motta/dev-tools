import type { Metadata } from 'next'
import { BMICalculator } from './bmi-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de IMC',
  description:
    'Calcule seu Índice de Massa Corporal (IMC) e veja em que faixa ele está.',
  keywords: [
    'calculador de imc',
    'calculador de imc online',
    'calculador de imc grátis',
    'calculador de imc com peso',
    'calculador de imc com altura',
    'calculador de imc com peso e altura',
  ],
}

export default function BMICalculatorPage() {
  return <BMICalculator />
}
