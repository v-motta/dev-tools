import { initPage, toolMetadata } from '@/i18n/page'
import { DiscountCalculator } from './discount-calculator'

export const generateMetadata = toolMetadata('discount')

export default async function DiscountCalculatorPage({
  params,
}: PageProps<'/[locale]/utilities/calculators/discount'>) {
  await initPage(params)

  return <DiscountCalculator />
}
