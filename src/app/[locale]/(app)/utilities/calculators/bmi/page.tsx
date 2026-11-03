import { initPage, toolMetadata } from '@/i18n/page'
import { BMICalculator } from './bmi-calculator'

export const generateMetadata = toolMetadata('bmi')

export default async function BMICalculatorPage({
  params,
}: PageProps<'/[locale]/utilities/calculators/bmi'>) {
  await initPage(params)

  return <BMICalculator />
}
