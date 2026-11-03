import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'

export const metadata: Metadata = {
  title: 'Gerador e validador de RG',
  description:
    'Gere RGs válidos para testes, com ou sem pontuação, ou confira na hora se um RG é válido.',
  keywords: [
    'gerador de rg',
    'gerador de rg online',
    'gerador de rg válido',
    'validador de rg',
    'validador de rg online',
  ],
}

export default function RGPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de RG
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere RGs válidos para usar em testes ou confira se um RG é válido.
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
                  Um RG válido é gerado ao abrir a página. Escolha a quantidade
                  e o formato, ou clique em "Gerar RG" para criar outro.
                </p>

                <Generator
                  name="RG"
                  label="RG gerado"
                  pluralLabel="RGs gerados"
                  endpoint="/api/generators/rg"
                  field="rg"
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
                    'O RG é gerado no servidor e não fica armazenado em lugar nenhum.',
                    'Cada estado emite o RG do seu jeito, então o gerador segue a regra de São Paulo, a mais usada pelos sistemas: 8 números e um dígito verificador.',
                    'O dígito verificador pode ser um X, que vale 10.',
                    'O número serve apenas para testes e não pertence a nenhuma pessoa real.',
                    'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
                  ]}
                />

                <ApiUsage
                  name="gerador de RG"
                  method="GET"
                  path="/api/generators/rg"
                  query={{ quantity: '2', formatted: 'false' }}
                  parameters={[
                    {
                      name: 'quantity',
                      description:
                        'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "rgs" em vez de "rg".',
                    },
                    {
                      name: 'formatted',
                      description:
                        'Opcional. "false" gera sem pontuação. Padrão: "true".',
                    },
                  ]}
                  response={{ rgs: ['905566610', '39541250X'] }}
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
                  Digite um RG e clique em "Validar RG" para saber se ele é
                  válido.
                </p>

                <DocumentValidator document="rg" />

                <HowItWorks
                  items={[
                    'A validação é feita no servidor e nada fica armazenado.',
                    'O validador confere o dígito verificador pela regra de São Paulo. RGs de outros estados podem ter outro formato e aparecer como inválidos.',
                    'O RG pode ser digitado com ou sem pontuação (12.345.678-X ou 12345678X).',
                    'O resultado aparece logo abaixo do campo.',
                  ]}
                />

                <ApiUsage
                  name="validador de RG"
                  method="POST"
                  path="/api/validators/rg"
                  body={{ rg: '39.541.250-X' }}
                  parameters={[
                    {
                      name: 'rg',
                      description:
                        'Obrigatório. O número com ou sem pontuação.',
                    },
                  ]}
                  response={{ isValid: true }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
