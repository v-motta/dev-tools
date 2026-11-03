import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { CARD_BRANDS } from '@/utils/generate-credit-card'

export const metadata: Metadata = {
  title: 'Gerador de cartão de crédito',
  description:
    'Gere números de cartão de crédito válidos para testes, com bandeira, nome, validade e CVV.',
  keywords: [
    'gerador de cartão de crédito',
    'gerador de cartão de crédito válido',
    'gerador de cartão para teste',
    'gerador de cartão visa',
    'gerador de cartão mastercard',
    'gerador de cartão elo',
  ],
}

const CARD_FIELDS = [
  { key: 'number', label: 'Número' },
  { key: 'brand', label: 'Bandeira' },
  { key: 'holder', label: 'Nome impresso' },
  { key: 'expiry', label: 'Validade' },
  { key: 'cvv', label: 'CVV' },
]

const BRAND_CHOICES = Object.entries(CARD_BRANDS).map(([value, brand]) => ({
  value,
  label: brand.name,
}))

export default function CreditCardGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador de cartão de crédito
        </h1>

        <p className="text-muted-foreground text-balance">
          Um cartão Visa é gerado ao abrir a página. Escolha a bandeira e o
          formato, ou clique em "Gerar cartão" para criar outro.
        </p>
      </div>

      <RecordGenerator
        buttonLabel="Gerar cartão"
        endpoint="/api/generators/credit-card"
        field="creditCard"
        fields={CARD_FIELDS}
        options={[
          {
            type: 'select',
            name: 'brand',
            label: 'Bandeira',
            defaultValue: 'visa',
            choices: BRAND_CHOICES,
          },
          {
            type: 'boolean',
            name: 'formatted',
            label: 'Número com espaços',
            defaultValue: true,
          },
        ]}
      />

      <HowItWorks
        items={[
          'O cartão é gerado no servidor e não fica armazenado em lugar nenhum.',
          'O número começa com o prefixo da bandeira e passa no algoritmo de Luhn, a verificação que formulários e gateways fazem antes de cobrar.',
          'A validade fica entre 1 e 5 anos no futuro. O CVV tem 4 dígitos na American Express e 3 nas outras bandeiras.',
          'O número é sorteado e serve só para testar formulários. Para testar pagamentos, use os cartões de teste do seu gateway.',
        ]}
      />

      <ApiUsage
        name="gerador de cartão de crédito"
        method="GET"
        path="/api/generators/credit-card"
        query={{ brand: 'amex' }}
        parameters={[
          {
            name: 'brand',
            description: `Opcional. ${Object.keys(CARD_BRANDS)
              .map((brand) => `"${brand}"`)
              .join(', ')}. Padrão: "visa".`,
          },
          {
            name: 'formatted',
            description:
              'Opcional. "false" gera o número sem espaços. Padrão: "true".',
          },
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
