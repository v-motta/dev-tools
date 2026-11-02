import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'

export const metadata: Metadata = {
  title: 'CNPJ Validator',
  description: 'Validate a CNPJ number instantly.',
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
        <h1 className="text-2xl font-bold font-mono">CNPJ Validator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CNPJ validator! Just enter a CNPJ number and click on
          'Validate CNPJ' to check if it is valid.
        </p>
      </div>

      <DocumentValidator document="cnpj" />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The validation is done on the server and does not store any
            information.
          </li>
          <li>
            The validator checks if the CNPJ follows the rules of the Federal
            Revenue Service.
          </li>
          <li>The format of the CNPJ and its check digits are verified.</li>
          <li>
            The system accepts CNPJs with or without punctuation
            (00.000.000/0001-00 or 00000000000100).
          </li>
          <li>
            The validation result is displayed through a green icon (valid) or a
            red icon (invalid).
          </li>
        </ul>
      </div>

      <ApiUsage
        name="CNPJ validator"
        endpoint="POST /api/validators/cnpj"
        request={{ cnpj: '00.111.222/0000-00' }}
        response={{ isValid: false }}
      />
    </div>
  )
}
