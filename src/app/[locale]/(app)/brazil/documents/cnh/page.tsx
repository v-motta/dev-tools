import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'
import { initPage, toolMetadata } from '@/i18n/page'

export const generateMetadata = toolMetadata('cnh')

export default async function CNHPage({
  params,
}: PageProps<'/[locale]/brazil/documents/cnh'>) {
  await initPage(params)
  const t = await getTranslations('pages.cnh')
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
                  name="CNH"
                  label={t('generate.label')}
                  pluralLabel={t('generate.pluralLabel')}
                  endpoint="/api/generators/cnh"
                  field="cnh"
                />

                <HowItWorks items={t.raw('generate.howItWorks')} />

                <ApiUsage
                  name={t('generate.apiName')}
                  method="GET"
                  path="/api/generators/cnh"
                  query={{ quantity: '2' }}
                  parameters={[
                    {
                      name: 'quantity',
                      description: tApi('quantity', {
                        list: 'cnhs',
                        single: 'cnh',
                      }),
                    },
                  ]}
                  response={{ cnhs: ['25755879684', '61360956403'] }}
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

                <DocumentValidator document="cnh" />

                <HowItWorks items={t.raw('validate.howItWorks')} />

                <ApiUsage
                  name={t('validate.apiName')}
                  method="POST"
                  path="/api/validators/cnh"
                  body={{ cnh: '61173562148' }}
                  parameters={[
                    { name: 'cnh', description: t('validate.apiCnh') },
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
