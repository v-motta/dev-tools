import { initPage, toolMetadata } from '@/i18n/page'
import { AgeCalculator } from './age-calculator'

export const generateMetadata = toolMetadata('age')

export default async function AgeCalculatorPage({
  params,
}: PageProps<'/[locale]/utilities/calculators/age'>) {
  await initPage(params)

  return <AgeCalculator />
}
