import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'

export const metadata: Metadata = {
  title: 'CPF Validator',
  description: 'Validate a CPF number instantly.',
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
        <h1 className="text-2xl font-bold font-mono">CPF Validator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CPF validator! Just enter a CPF number and click on 'Validate
          CPF' to check if it is valid.
        </p>
      </div>

      <DocumentValidator document="cpf" />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The validation is done on the server and does not store any
            information.
          </li>
          <li>
            The validator checks if the CPF follows the rules of the Federal
            Revenue Service.
          </li>
          <li>The format of the CPF and its check digits are verified.</li>
          <li>
            The system accepts CPFs with or without punctuation (123.456.789-10
            or 12345678910).
          </li>
          <li>
            The validation result is displayed through a green icon (valid) or a
            red icon (invalid).
          </li>
        </ul>
      </div>

      <ApiUsage
        name="CPF validator"
        endpoint="POST /api/validators/cpf"
        request={{ cpf: '123.456.789-10' }}
        response={{ isValid: false }}
      />
    </div>
  )
}
