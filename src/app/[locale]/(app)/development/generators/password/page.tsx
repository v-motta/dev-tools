import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { initPage, toolMetadata } from '@/i18n/page'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/utils/generate-password'

export const generateMetadata = toolMetadata('password')

const CUSTOM_STYLE = { name: 'style', value: 'custom' }

export default async function PasswordGeneratorPage({
  params,
}: PageProps<'/[locale]/development/generators/password'>) {
  await initPage(params)
  const t = await getTranslations('pages.password')
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
        endpoint="/api/generators/password"
        field="password"
        options={[
          {
            type: 'toggle',
            name: 'style',
            label: t('style'),
            defaultValue: 'apple',
            choices: [
              { value: 'apple', label: 'Apple' },
              { value: 'custom', label: t('custom') },
            ],
          },
          {
            type: 'range',
            name: 'length',
            label: t('length'),
            defaultValue: 16,
            min: PASSWORD_MIN_LENGTH,
            max: PASSWORD_MAX_LENGTH,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'uppercase',
            label: t('uppercase'),
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'numbers',
            label: t('numbers'),
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'symbols',
            label: t('symbols'),
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
        ]}
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/password"
        query={{ style: 'custom', length: '20', symbols: 'false' }}
        parameters={[
          { name: 'style', description: t('apiStyle') },
          {
            name: 'length',
            description: t('apiLength', {
              min: PASSWORD_MIN_LENGTH,
              max: PASSWORD_MAX_LENGTH,
            }),
          },
          { name: 'uppercase', description: t('apiUppercase') },
          { name: 'numbers', description: t('apiNumbers') },
          { name: 'symbols', description: t('apiSymbols') },
          {
            name: 'quantity',
            description: tApi('quantity', {
              list: 'passwords',
              single: 'password',
            }),
          },
        ]}
        response={{ password: 'q7RmvKw2tLxa9bNpEcz4' }}
      />
    </div>
  )
}
