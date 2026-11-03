import { getTranslations } from 'next-intl/server'
import { ApiUsage } from '@/components/api-usage'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { initPage, toolMetadata } from '@/i18n/page'
import { STATE_CHOICES } from '@/utils/states'

export const generateMetadata = toolMetadata('person')

/** Each field of the generated person, with the message of its label */
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
  'cep',
  'street',
  'number',
  'neighborhood',
  'city',
  'state',
  'height',
  'weight',
  'bloodType',
] as const

export default async function PersonGeneratorPage({
  params,
}: PageProps<'/[locale]/brazil/fake-data/person'>) {
  await initPage(params)
  const t = await getTranslations('pages.person')
  const tCommon = await getTranslations('common')
  const tApi = await getTranslations('apiUsage')
  const tFields = await getTranslations('fields')

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
        fields={PERSON_FIELDS.map((key) => ({ key, label: tFields(key) }))}
        options={[
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
          },
        ]}
      />

      <HowItWorks items={t.raw('howItWorks')} />

      <ApiUsage
        name={t('apiName')}
        method="GET"
        path="/api/generators/person"
        query={{ sex: 'female', state: 'BA' }}
        parameters={[
          { name: 'sex', description: t('apiSex') },
          { name: 'state', description: tApi('stateOptional') },
        ]}
        response={{
          person: {
            name: 'Valentina Melo Costa',
            sex: 'Feminino',
            cpf: '161.429.616-26',
            rg: '39.541.250-X',
            birthdate: '15/02/1992',
            age: 34,
            motherName: 'Yasmin Saraiva Melo',
            fatherName: 'Frederico Souza Costa',
            email: 'valentina.costa73@example.net',
            password: 'zmwbsy-abdmnZ-3femhv',
            mobilePhone: '(71) 96600-2238',
            landlinePhone: '(71) 3985-1876',
            cep: '40070-260',
            street: 'Avenida Doze',
            number: '1223',
            neighborhood: 'Barris',
            city: 'Salvador',
            state: 'BA',
            height: '1,68 m',
            weight: '72 kg',
            bloodType: 'A+',
          },
        }}
      />
    </div>
  )
}
