import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { HowItWorks } from '@/components/how-it-works'
import { initPage, toolMetadata } from '@/i18n/page'
import { RandomPicker } from './random-picker'

export const generateMetadata = toolMetadata('numbers')

export default async function RandomPickerPage({
  params,
}: PageProps<'/[locale]/utilities/draws/numbers'>) {
  await initPage(params)
  const t = await getTranslations('pages.numbers')

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <RandomPicker />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="POST"
        path="/api/random-picker"
        body={{ random_count: 3, random_min: 1, random_max: 60 }}
        parameters={[
          { name: 'random_count', description: t('apiCount') },
          { name: 'random_min', description: t('apiMin') },
          { name: 'random_max', description: t('apiMax') },
        ]}
        response={{ randomNumber: [7, 42, 18] }}
      />
    </div>
  )
}
