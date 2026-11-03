import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { initPage, toolMetadata } from '@/i18n/page'

export const generateMetadata = toolMetadata('licensePlate')

export default async function LicensePlateGeneratorPage({
  params,
}: PageProps<'/[locale]/brazil/fake-data/license-plate'>) {
  await initPage(params)
  const t = await getTranslations('pages.licensePlate')
  const tApi = await getTranslations('apiUsage')

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <Generator
        name={t('name')}
        label={t('label')}
        pluralLabel={t('pluralLabel')}
        endpoint="/api/generators/license-plate"
        field="plate"
        options={[
          {
            type: 'toggle',
            name: 'format',
            label: t('format'),
            defaultValue: 'mercosul',
            choices: [
              { value: 'mercosul', label: 'Mercosul' },
              { value: 'old', label: t('old') },
            ],
          },
        ]}
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/license-plate"
        query={{ format: 'old', quantity: '2' }}
        parameters={[
          { name: 'format', description: t('apiFormat') },
          {
            name: 'quantity',
            description: tApi('quantity', { list: 'plates', single: 'plate' }),
          },
        ]}
        response={{ plates: ['RGR-4064', 'KQT-1182'] }}
      />
    </div>
  )
}
