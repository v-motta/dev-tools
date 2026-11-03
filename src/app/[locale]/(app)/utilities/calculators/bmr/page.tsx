import { initPage, toolMetadata } from '@/i18n/page'
import { BMRCalculator } from './bmr-calculator'

export const generateMetadata = toolMetadata('bmr')

export default async function BMRCalculatorPage({
  params,
}: PageProps<'/[locale]/utilities/calculators/bmr'>) {
  await initPage(params)

  return <BMRCalculator />
}
