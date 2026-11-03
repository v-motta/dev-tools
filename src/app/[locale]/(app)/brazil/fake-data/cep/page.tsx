import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { CepLookup } from '@/components/cep-lookup'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { ToolModes } from '@/components/tool-modes'
import { initPage, toolMetadata } from '@/i18n/page'
import { STATE_CHOICES } from '@/utils/states'

export const generateMetadata = toolMetadata('cep')

/** Each field of the generated address, with the message of its label */
const ADDRESS_FIELDS = [
  'cep',
  'street',
  'neighborhood',
  'city',
  'state',
] as const

export default async function CEPPage({
  params,
}: PageProps<'/[locale]/brazil/fake-data/cep'>) {
  await initPage(params)
  const t = await getTranslations('pages.cep')
  const tCommon = await getTranslations('common')
  const tApi = await getTranslations('apiUsage')
  const tFields = await getTranslations('fields')

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

                <RecordGenerator
                  buttonLabel={t('generate.button')}
                  endpoint="/api/generators/address"
                  field="address"
                  fields={ADDRESS_FIELDS.map((key) => ({
                    key,
                    label: tFields(key),
                  }))}
                  options={[
                    {
                      type: 'select',
                      name: 'state',
                      label: tCommon('state'),
                      defaultValue: ANY,
                      choices: [
                        { value: ANY, label: tCommon('anyState') },
                        ...STATE_CHOICES,
                      ],
                    },
                  ]}
                />

                <HowItWorks items={t.raw('generate.howItWorks')} />

                <ApiUsage
                  name={t('generate.apiName')}
                  method="GET"
                  path="/api/generators/address"
                  query={{ state: 'PE' }}
                  parameters={[
                    { name: 'state', description: tApi('stateOptional') },
                    {
                      name: 'formatted',
                      description: t('generate.apiFormatted'),
                    },
                  ]}
                  response={{
                    address: {
                      cep: '55016-460',
                      street: 'Avenida Terezina',
                      neighborhood: 'Universitário',
                      city: 'Caruaru',
                      state: 'PE',
                    },
                  }}
                />
              </>
            ),
          },
          {
            value: 'lookup',
            label: t('lookup.mode'),
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  {t('lookup.intro')}
                </p>

                <CepLookup />

                <HowItWorks items={t.raw('lookup.howItWorks')} />

                <ApiUsage
                  name={t('lookup.apiName')}
                  method="GET"
                  path="/api/cep/01304000"
                  response={{
                    address: {
                      cep: '01304-000',
                      street: 'Rua Augusta',
                      complement: 'até 698 - lado par',
                      neighborhood: 'Consolação',
                      city: 'São Paulo',
                      state: 'SP',
                      ddd: '11',
                    },
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
