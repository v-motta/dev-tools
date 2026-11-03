import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'
import { initPage, toolMetadata } from '@/i18n/page'
import { STATE_CHOICES } from '@/utils/states'

export const generateMetadata = toolMetadata('stateRegistration')

export default async function StateRegistrationPage({
  params,
}: PageProps<'/[locale]/brazil/documents/state-registration'>) {
  await initPage(params)
  const t = await getTranslations('pages.stateRegistration')
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
                  name={t('generate.name')}
                  label={t('generate.label')}
                  pluralLabel={t('generate.pluralLabel')}
                  endpoint="/api/generators/state-registration"
                  field="stateRegistration"
                  options={[
                    {
                      type: 'select',
                      name: 'state',
                      label: tCommon('state'),
                      defaultValue: 'SP',
                      choices: STATE_CHOICES,
                    },
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
                  path="/api/generators/state-registration"
                  query={{ state: 'MG', quantity: '2' }}
                  parameters={[
                    { name: 'state', description: tApi('stateRequired') },
                    {
                      name: 'quantity',
                      description: tApi('quantity', {
                        list: 'stateRegistrations',
                        single: 'stateRegistration',
                      }),
                    },
                    { name: 'formatted', description: tApi('formatted') },
                  ]}
                  response={{
                    stateRegistrations: [
                      '062.307.904/0081',
                      '195.445.174/3240',
                    ],
                  }}
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

                <DocumentValidator document="state-registration" />

                <HowItWorks items={t.raw('validate.howItWorks')} />

                <ApiUsage
                  name={t('validate.apiName')}
                  method="POST"
                  path="/api/validators/state-registration"
                  body={{ stateRegistration: '110.042.490.114', state: 'SP' }}
                  parameters={[
                    {
                      name: 'stateRegistration',
                      description: tApi('documentRequired'),
                    },
                    { name: 'state', description: tApi('stateRequired') },
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
