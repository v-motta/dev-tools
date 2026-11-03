import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { initPage, toolMetadata } from '@/i18n/page'
import { CARD_BRANDS } from '@/utils/generate-credit-card'

export const generateMetadata = toolMetadata('creditCard')

/** Each field of the generated card, with the message of its label */
const CARD_FIELDS = [
  { key: 'number', label: 'cardNumber' },
  { key: 'brand', label: 'brand' },
  { key: 'holder', label: 'holder' },
  { key: 'expiry', label: 'expiry' },
  { key: 'cvv', label: 'cvv' },
] as const

const BRAND_CHOICES = Object.entries(CARD_BRANDS).map(([value, brand]) => ({
  value,
  label: brand.name,
}))

export default async function CreditCardGeneratorPage({
  params,
}: PageProps<'/[locale]/development/generators/credit-card'>) {
  await initPage(params)
  const t = await getTranslations('pages.creditCard')
  const tFields = await getTranslations('fields')

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <RecordGenerator
        buttonLabel={t('button')}
        endpoint="/api/generators/credit-card"
        field="creditCard"
        fields={CARD_FIELDS.map(({ key, label }) => ({
          key,
          label: tFields(label),
        }))}
        options={[
          {
            type: 'select',
            name: 'brand',
            label: t('brand'),
            defaultValue: 'visa',
            choices: BRAND_CHOICES,
          },
          {
            type: 'boolean',
            name: 'formatted',
            label: t('formatted'),
            defaultValue: true,
          },
        ]}
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/credit-card"
        query={{ brand: 'amex' }}
        parameters={[
          {
            name: 'brand',
            description: t('apiBrand', {
              brands: Object.keys(CARD_BRANDS)
                .map((brand) => `"${brand}"`)
                .join(', '),
            }),
          },
          { name: 'formatted', description: t('apiFormatted') },
        ]}
        response={{
          creditCard: {
            holder: 'NUBIA MARTINS',
            number: '3424 828234 09757',
            brand: 'American Express',
            expiry: '10/29',
            cvv: '3094',
          },
        }}
      />
    </div>
  )
}
