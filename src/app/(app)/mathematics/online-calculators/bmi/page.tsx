import type { Metadata } from 'next'
import { BMICalculator } from './bmi-calculator'

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

export default function BMICalculatorPage() {
  return <BMICalculator />
}
