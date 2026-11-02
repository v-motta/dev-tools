import type { Metadata } from 'next'
import { DiscountCalculator } from './discount-calculator'

export const metadata: Metadata = {
  title: 'Discount Calculator',
  description:
    'Calculate the discount amount and the final price after applying the discount.',
  keywords: [
    'calculador de desconto',
    'calculador de desconto online',
    'calculador de desconto grátis',
    'calculador de desconto com porcentagem',
    'calculador de desconto com porcentagem online',
    'calculador de desconto com porcentagem grátis',
  ],
}

export default function DiscountCalculatorPage() {
  return <DiscountCalculator />
}
