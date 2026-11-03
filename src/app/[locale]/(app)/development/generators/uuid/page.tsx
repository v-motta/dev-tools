import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { initPage, toolMetadata } from '@/i18n/page'

export const generateMetadata = toolMetadata('uuid')

export default async function UUIDGeneratorPage({
  params,
}: PageProps<'/[locale]/development/generators/uuid'>) {
  await initPage(params)
  const t = await getTranslations('pages.uuid')
  const tApi = await getTranslations('apiUsage')

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <Generator
        name="UUID"
        label={t('label')}
        pluralLabel={t('pluralLabel')}
        endpoint="/api/generators/uuid"
        field="uuid"
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/uuid"
        parameters={[
          {
            name: 'quantity',
            description: tApi('quantity', { list: 'uuids', single: 'uuid' }),
          },
        ]}
        response={{ uuid: '3b241101-e2bb-4255-8caf-4136c566a962' }}
      />
    </div>
  )
}
