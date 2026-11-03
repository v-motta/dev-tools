import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { initPage, toolMetadata } from '@/i18n/page'
import { NATIONALITIES } from '@/utils/nationalities'
import { STATE_CHOICES } from '@/utils/states'

export const generateMetadata = toolMetadata('person')

/**
 * Each field a generated person can have, with the message of its label.
 * Brazilians and other nationalities have different fields; the list only
 * shows the ones the person has.
 */
const PERSON_FIELDS = [
  'name',
  'sex',
  'cpf',
  'rg',
  'birthdate',
  'age',
  'motherName',
  'fatherName',
  'email',
  'password',
  'mobilePhone',
  'landlinePhone',
  'phone',
  'cep',
  'street',
  'number',
  'address',
  'neighborhood',
  'city',
  'state',
  'zipCode',
  'country',
  'height',
  'weight',
  'bloodType',
] as const

const BRAZILIAN = { name: 'nationality', value: 'BR' }

export default async function PersonGeneratorPage({
  params,
}: PageProps<'/[locale]/development/generators/person'>) {
  const locale = await initPage(params)
  const t = await getTranslations('pages.person')
  const tCommon = await getTranslations('common')
  const tFields = await getTranslations('fields')

  // Country names in the page's language, in its alphabetical order
  const countryNames = new Intl.DisplayNames(locale, { type: 'region' })
  const nationalityChoices = NATIONALITIES.map((code) => ({
    value: code,
    label: countryNames.of(code) ?? code,
  })).sort((a, b) => a.label.localeCompare(b.label, locale))

  // Brazilians keep the API's original Portuguese values
  const sexValues = {
    female: t('female'),
    male: t('male'),
    Feminino: t('female'),
    Masculino: t('male'),
  }

  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">{t('title')}</h1>

        <p className="text-muted-foreground text-balance">{t('intro')}</p>
      </div>

      <RecordGenerator
        buttonLabel={t('button')}
        endpoint="/api/generators/person"
        field="person"
        fields={PERSON_FIELDS.map((key) => ({
          key,
          label: tFields(key),
          ...(key === 'sex' && { values: sexValues }),
        }))}
        options={[
          {
            type: 'select',
            name: 'nationality',
            label: t('nationality'),
            defaultValue: 'BR',
            choices: nationalityChoices,
          },
          {
            type: 'toggle',
            name: 'sex',
            label: t('sex'),
            defaultValue: ANY,
            choices: [
              { value: ANY, label: t('anySex') },
              { value: 'female', label: t('female') },
              { value: 'male', label: t('male') },
            ],
          },
          {
            type: 'select',
            name: 'state',
            label: tCommon('state'),
            defaultValue: ANY,
            choices: [
              { value: ANY, label: tCommon('anyState') },
              ...STATE_CHOICES,
            ],
            showWhen: BRAZILIAN,
          },
        ]}
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/person"
        query={{ nationality: 'DE', sex: 'female' }}
        parameters={[
          { name: 'nationality', description: t('apiNationality') },
          { name: 'sex', description: t('apiSex') },
          { name: 'state', description: t('apiState') },
        ]}
        response={{
          person: {
            nationality: 'DE',
            name: 'Michaela Löser',
            sex: 'female',
            birthdate: '14.05.1984',
            age: 42,
            motherName: 'Malin Löser',
            fatherName: 'Jordan Löser',
            email: 'michaela.loser83@example.com',
            password: 'zmwbsy-abdmnZ-3femhv',
            phone: '(00792) 9666250',
            address: 'Franz-Hitze-Str. 429',
            city: 'Neu Alishascheid',
            state: 'Bremen',
            zipCode: '58954',
            country: 'Deutschland',
            height: '1,64 m',
            weight: '68 kg',
            bloodType: 'A+',
          },
        }}
      />
    </div>
  )
}
