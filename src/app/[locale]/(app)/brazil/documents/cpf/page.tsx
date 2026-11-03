import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'

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

      <ToolModes
        modes={[
          {
            value: 'generate',
            label: 'Gerar',
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  Um CPF válido é gerado ao abrir a página. Escolha a quantidade
                  e o formato, ou clique em "Gerar CPF" para criar outro.
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

                <HowItWorks
                  items={[
                    'O CPF é gerado no servidor e não fica armazenado em lugar nenhum.',
                    'O número segue as regras da Receita Federal.',
                    'Os dígitos verificadores são calculados corretamente.',
                    'O número serve apenas para testes e não pertence a nenhuma pessoa real.',
                    'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
                  ]}
                />

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
            ),
          },
          {
            value: 'validate',
            label: 'Validar',
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  Digite um CPF e clique em "Validar CPF" para saber se ele é
                  válido.
                </p>

                <DocumentValidator document="cpf" />

                <HowItWorks
                  items={[
                    'A validação é feita no servidor e nada fica armazenado.',
                    'O validador confere se o CPF segue as regras da Receita Federal.',
                    'São verificados o formato e os dígitos verificadores.',
                    'O CPF pode ser digitado com ou sem pontuação (123.456.789-10 ou 12345678910).',
                    'O resultado aparece logo abaixo do campo.',
                  ]}
                />

                <ApiUsage
                  name="validador de CPF"
                  method="POST"
                  path="/api/validators/cpf"
                  body={{ cpf: '123.456.789-10' }}
                  parameters={[
                    {
                      name: 'cpf',
                      description:
                        'Obrigatório. O número com ou sem pontuação.',
                    },
                  ]}
                  response={{ isValid: false }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
