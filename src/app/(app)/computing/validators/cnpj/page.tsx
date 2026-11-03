import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'

export const metadata: Metadata = {
  title: 'Validador de CNPJ',
  description: 'Confira na hora se um CNPJ é válido.',
  keywords: [
    'validador de cnpj',
    'validador de cnpj online',
    'validador de cnpj válido',
    'validador de cnpj com números',
    'validador de cnpj com pontuação',
    'validador de cnpj com máscara',
  ],
}

export default function CNPJValidatorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Validador de CNPJ</h1>

        <p className="text-muted-foreground text-balance">
          Digite um CNPJ e clique em "Validar CNPJ" para saber se ele é válido.
        </p>
      </div>

      <DocumentValidator document="cnpj" />

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>A validação é feita no servidor e nada fica armazenado.</li>
          <li>
            O validador confere se o CNPJ segue as regras da Receita Federal.
          </li>
          <li>São verificados o formato e os dígitos verificadores.</li>
          <li>
            O CNPJ pode ser digitado com ou sem pontuação (00.000.000/0001-00 ou
            00000000000100).
          </li>
          <li>O resultado aparece logo abaixo do campo.</li>
        </ul>
      </div>

      <ApiUsage
        name="validador de CNPJ"
        endpoint="POST /api/validators/cnpj"
        request={{ cnpj: '00.111.222/0000-00' }}
        response={{ isValid: false }}
      />
    </div>
  )
}
