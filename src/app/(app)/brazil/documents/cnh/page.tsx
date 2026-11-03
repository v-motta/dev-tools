import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'

export const metadata: Metadata = {
  title: 'Gerador e validador de CNH',
  description:
    'Gere números de CNH válidos para testes ou confira na hora se uma CNH é válida.',
  keywords: [
    'gerador de cnh',
    'gerador de cnh online',
    'gerador de cnh válida',
    'validador de cnh',
    'validador de cnh online',
  ],
}

export default function CNHPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de CNH
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere números de CNH válidos para usar em testes ou confira se uma CNH
          é válida.
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
                  Uma CNH válida é gerada ao abrir a página. Escolha a
                  quantidade ou clique em "Gerar CNH" para criar outra.
                </p>

                <Generator
                  name="CNH"
                  label="CNH gerada"
                  pluralLabel="CNHs geradas"
                  endpoint="/api/generators/cnh"
                  field="cnh"
                />

                <HowItWorks
                  items={[
                    'A CNH é gerada no servidor e não fica armazenada em lugar nenhum.',
                    'O número gerado é o número de registro, com 11 dígitos, o mesmo que os sistemas pedem.',
                    'Os dois dígitos verificadores seguem a regra do Denatran.',
                    'O número serve apenas para testes e não pertence a nenhuma pessoa real.',
                    'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
                  ]}
                />

                <ApiUsage
                  name="gerador de CNH"
                  method="GET"
                  path="/api/generators/cnh"
                  query={{ quantity: '2' }}
                  parameters={[
                    {
                      name: 'quantity',
                      description:
                        'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "cnhs" em vez de "cnh".',
                    },
                  ]}
                  response={{ cnhs: ['25755879684', '61360956403'] }}
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
                  Digite o número de registro da CNH e clique em "Validar CNH"
                  para saber se ele é válido.
                </p>

                <DocumentValidator document="cnh" />

                <HowItWorks
                  items={[
                    'A validação é feita no servidor e nada fica armazenado.',
                    'São verificados os 11 dígitos e os dois dígitos verificadores.',
                    'O número de registro fica no campo "Nº Registro" da CNH.',
                    'O resultado aparece logo abaixo do campo.',
                  ]}
                />

                <ApiUsage
                  name="validador de CNH"
                  method="POST"
                  path="/api/validators/cnh"
                  body={{ cnh: '61173562148' }}
                  parameters={[
                    {
                      name: 'cnh',
                      description:
                        'Obrigatório. Os 11 dígitos do número de registro.',
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
