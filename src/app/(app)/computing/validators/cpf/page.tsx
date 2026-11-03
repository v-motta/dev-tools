import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'

export const metadata: Metadata = {
  title: 'Validador de CPF',
  description: 'Confira na hora se um CPF é válido.',
  keywords: [
    'validador de cpf',
    'validador de cpf online',
    'validador de cpf válido',
    'validador de cpf com números',
    'validador de cpf com pontuação',
    'validador de cpf com máscara',
  ],
}

export default function CPFValidatorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Validador de CPF</h1>

        <p className="text-muted-foreground text-balance">
          Digite um CPF e clique em "Validar CPF" para saber se ele é válido.
        </p>
      </div>

      <DocumentValidator document="cpf" />

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>A validação é feita no servidor e nada fica armazenado.</li>
          <li>
            O validador confere se o CPF segue as regras da Receita Federal.
          </li>
          <li>São verificados o formato e os dígitos verificadores.</li>
          <li>
            O CPF pode ser digitado com ou sem pontuação (123.456.789-10 ou
            12345678910).
          </li>
          <li>O resultado aparece logo abaixo do campo.</li>
        </ul>
      </div>

      <ApiUsage
        name="validador de CPF"
        endpoint="POST /api/validators/cpf"
        request={{ cpf: '123.456.789-10' }}
        response={{ isValid: false }}
      />
    </div>
  )
}
