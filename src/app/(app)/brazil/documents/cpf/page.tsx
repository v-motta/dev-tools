import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentModes } from '@/components/document-modes'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador e validador de CPF',
  description:
    'Gere CPFs válidos para testes, com ou sem pontuação, ou confira na hora se um CPF é válido.',
  keywords: [
    'gerador de cpf',
    'gerador de cpf online',
    'gerador de cpf válido',
    'validador de cpf',
    'validador de cpf online',
    'validador de cpf com pontuação',
  ],
}

export default function CPFPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de CPF
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere CPFs válidos para usar em testes ou confira se um CPF é válido.
        </p>
      </div>

      <DocumentModes
        generate={
          <>
            <p className="text-muted-foreground text-balance">
              Um CPF válido é gerado ao abrir a página. Escolha a quantidade e o
              formato, ou clique em "Gerar CPF" para criar outro.
            </p>

            <Generator
              name="CPF"
              label="CPF gerado"
              pluralLabel="CPFs gerados"
              endpoint="/api/generators/cpf"
              field="cpf"
              options={[
                {
                  type: 'boolean',
                  name: 'formatted',
                  label: 'Com pontuação',
                  defaultValue: true,
                },
              ]}
            />

            <div>
              <h2 className="text-lg font-medium mb-2">Como funciona</h2>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  O CPF é gerado no servidor e não fica armazenado em lugar
                  nenhum.
                </li>
                <li>O número segue as regras da Receita Federal.</li>
                <li>Os dígitos verificadores são calculados corretamente.</li>
                <li>
                  O número serve apenas para testes e não pertence a nenhuma
                  pessoa real.
                </li>
                <li>
                  Os últimos valores gerados ficam listados abaixo do botão até
                  você sair da página.
                </li>
              </ul>
            </div>

            <ApiUsage
              name="gerador de CPF"
              method="GET"
              path="/api/generators/cpf"
              query={{ quantity: '2', formatted: 'false' }}
              parameters={[
                {
                  name: 'quantity',
                  description:
                    'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "cpfs" em vez de "cpf".',
                },
                {
                  name: 'formatted',
                  description:
                    'Opcional. "false" gera só os números. Padrão: "true".',
                },
              ]}
              response={{ cpfs: ['52998224725', '11144477735'] }}
            />
          </>
        }
        validate={
          <>
            <p className="text-muted-foreground text-balance">
              Digite um CPF e clique em "Validar CPF" para saber se ele é
              válido.
            </p>

            <DocumentValidator document="cpf" />

            <div>
              <h2 className="text-lg font-medium mb-2">Como funciona</h2>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>A validação é feita no servidor e nada fica armazenado.</li>
                <li>
                  O validador confere se o CPF segue as regras da Receita
                  Federal.
                </li>
                <li>São verificados o formato e os dígitos verificadores.</li>
                <li>
                  O CPF pode ser digitado com ou sem pontuação (123.456.789-10
                  ou 12345678910).
                </li>
                <li>O resultado aparece logo abaixo do campo.</li>
              </ul>
            </div>

            <ApiUsage
              name="validador de CPF"
              method="POST"
              path="/api/validators/cpf"
              body={{ cpf: '123.456.789-10' }}
              parameters={[
                {
                  name: 'cpf',
                  description: 'Obrigatório. O número com ou sem pontuação.',
                },
              ]}
              response={{ isValid: false }}
            />
          </>
        }
      />
    </div>
  )
}
