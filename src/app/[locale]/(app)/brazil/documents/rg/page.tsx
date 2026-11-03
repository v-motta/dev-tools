import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'
import { initPage, toolMetadata } from '@/i18n/page'

export const generateMetadata = toolMetadata('rg')

export default async function RGPage({
  params,
}: PageProps<'/[locale]/brazil/documents/rg'>) {
  await initPage(params)
  const t = await getTranslations('pages.rg')
  const tCommon = await getTranslations('common')
  const tApi = await getTranslations('apiUsage')

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <ToolModes
        modes={[
          {
            value: 'generate',
            label: tCommon('generate'),
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  {t('generate.intro')}
                </p>

                <Generator
                  name="RG"
                  label={t('generate.label')}
                  pluralLabel={t('generate.pluralLabel')}
                  endpoint="/api/generators/rg"
                  field="rg"
                  options={[
                    {
                      type: 'boolean',
                      name: 'formatted',
                      label: tCommon('formatted'),
                      defaultValue: true,
                    },
                  ]}
                />

                <HowItWorks items={t.raw('generate.howItWorks')} />

                <ApiUsage
                  name={t('generate.apiName')}
                  method="GET"
                  path="/api/generators/rg"
                  query={{ quantity: '2', formatted: 'false' }}
                  parameters={[
                    {
                      name: 'quantity',
                      description: tApi('quantity', {
                        list: 'rgs',
                        single: 'rg',
                      }),
                    },
                    {
                      name: 'formatted',
                      description: t('generate.apiFormatted'),
                    },
                  ]}
                  response={{ rgs: ['905566610', '39541250X'] }}
                />
              </>
            ),
          },
          {
            value: 'validate',
            label: tCommon('validate'),
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  {t('validate.intro')}
                </p>

                <DocumentValidator document="rg" />

                <HowItWorks items={t.raw('validate.howItWorks')} />

                <ApiUsage
                  name={t('validate.apiName')}
                  method="POST"
                  path="/api/validators/rg"
                  body={{ rg: '39.541.250-X' }}
                  parameters={[
                    { name: 'rg', description: tApi('documentRequired') },
                  ]}
                  response={{ isValid: true }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
