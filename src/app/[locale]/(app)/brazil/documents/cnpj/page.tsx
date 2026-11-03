import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { ToolModes } from '@/components/tool-modes'
import { initPage, toolMetadata } from '@/i18n/page'
import { STATE_CHOICES } from '@/utils/states'

export const generateMetadata = toolMetadata('cnpj')

/** Each field of the generated company, with the message of its label */
const COMPANY_FIELDS = [
  { key: 'name', label: 'companyName' },
  { key: 'tradeName', label: 'tradeName' },
  { key: 'cnpj', label: 'cnpj' },
  { key: 'stateRegistration', label: 'stateRegistration' },
  { key: 'foundedAt', label: 'foundedAt' },
  { key: 'email', label: 'email' },
  { key: 'website', label: 'website' },
  { key: 'phone', label: 'phone' },
  { key: 'cep', label: 'cep' },
  { key: 'street', label: 'street' },
  { key: 'number', label: 'number' },
  { key: 'neighborhood', label: 'neighborhood' },
  { key: 'city', label: 'city' },
  { key: 'state', label: 'state' },
] as const

export default async function CNPJPage({
  params,
}: PageProps<'/[locale]/brazil/documents/cnpj'>) {
  await initPage(params)
  const t = await getTranslations('pages.cnpj')
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
            value: 'cnpj',
            label: t('generate.mode'),
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  {t('generate.intro')}
                </p>

                <Generator
                  name="CNPJ"
                  label={t('generate.label')}
                  pluralLabel={t('generate.pluralLabel')}
                  endpoint="/api/generators/cnpj"
                  field="cnpj"
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
                  path="/api/generators/cnpj"
                  query={{ quantity: '2', formatted: 'false' }}
                  parameters={[
                    {
                      name: 'quantity',
                      description: tApi('quantity', {
                        list: 'cnpjs',
                        single: 'cnpj',
                      }),
                    },
                    { name: 'formatted', description: tApi('formatted') },
                  ]}
                  response={{ cnpjs: ['11222333000181', '45723174000110'] }}
                />
              </>
            ),
          },
          {
            value: 'company',
            label: t('company.mode'),
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  {t('company.intro')}
                </p>

                <RecordGenerator
                  buttonLabel={t('company.button')}
                  endpoint="/api/generators/company"
                  field="company"
                  fields={COMPANY_FIELDS.map(({ key, label }) => ({
                    key,
                    label: tFields(label),
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

                <HowItWorks items={t.raw('company.howItWorks')} />

                <ApiUsage
                  name={t('company.apiName')}
                  method="GET"
                  path="/api/generators/company"
                  query={{ state: 'RS' }}
                  parameters={[
                    { name: 'state', description: tApi('stateOptional') },
                  ]}
                  response={{
                    company: {
                      name: 'Santos Logística Ltda',
                      tradeName: 'Santos Logística',
                      cnpj: '47.870.299/7915-54',
                      stateRegistration: '416/9121979',
                      foundedAt: '10/01/2016',
                      email: 'contato.santoslogistica@example.com',
                      website: 'www.santoslogistica.com.br',
                      phone: '(51) 2984-4088',
                      cep: '91510-090',
                      street: 'Avenida Rocio',
                      number: '2583',
                      neighborhood: 'Vila João Pessoa',
                      city: 'Porto Alegre',
                      state: 'RS',
                    },
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

                <DocumentValidator document="cnpj" />

                <HowItWorks items={t.raw('validate.howItWorks')} />

                <ApiUsage
                  name={t('validate.apiName')}
                  method="POST"
                  path="/api/validators/cnpj"
                  body={{ cnpj: '00.111.222/0000-00' }}
                  parameters={[
                    { name: 'cnpj', description: tApi('documentRequired') },
                  ]}
                  response={{ isValid: false }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
