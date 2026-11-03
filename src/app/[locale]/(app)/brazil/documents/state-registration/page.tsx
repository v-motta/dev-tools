import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'
import { ToolModes } from '@/components/tool-modes'
import { STATE_CHOICES } from '@/utils/states'

export const metadata: Metadata = {
  title: 'Gerador e validador de inscrição estadual',
  description:
    'Gere inscrições estaduais válidas para testes em qualquer estado ou confira se uma inscrição estadual é válida.',
  keywords: [
    'gerador de inscrição estadual',
    'gerador de inscrição estadual online',
    'gerador de ie',
    'validador de inscrição estadual',
    'validador de ie',
  ],
}

export default function StateRegistrationPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de inscrição estadual
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere inscrições estaduais válidas para usar em testes ou confira se
          uma inscrição é válida, em qualquer estado.
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
                  Uma inscrição estadual de São Paulo é gerada ao abrir a
                  página. Escolha o estado, a quantidade e o formato, ou clique
                  em "Gerar inscrição estadual" para criar outra.
                </p>

                <Generator
                  name="inscrição estadual"
                  label="Inscrição estadual gerada"
                  pluralLabel="Inscrições estaduais geradas"
                  endpoint="/api/generators/state-registration"
                  field="stateRegistration"
                  options={[
                    {
                      type: 'select',
                      name: 'state',
                      label: 'Estado',
                      defaultValue: 'SP',
                      choices: STATE_CHOICES,
                    },
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
                    'A inscrição é gerada no servidor e não fica armazenada em lugar nenhum.',
                    'Cada estado tem o próprio tamanho, prefixo e cálculo dos dígitos verificadores, e o gerador segue a especificação do SINTEGRA de cada um.',
                    'Em São Paulo, o gerador cria a inscrição de indústria e comércio, de 12 dígitos.',
                    'O número serve apenas para testes e não pertence a nenhuma empresa real.',
                    'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
                  ]}
                />

                <ApiUsage
                  name="gerador de inscrição estadual"
                  method="GET"
                  path="/api/generators/state-registration"
                  query={{ state: 'MG', quantity: '2' }}
                  parameters={[
                    {
                      name: 'state',
                      description: 'Obrigatório. A sigla do estado, como "SP".',
                    },
                    {
                      name: 'quantity',
                      description:
                        'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "stateRegistrations" em vez de "stateRegistration".',
                    },
                    {
                      name: 'formatted',
                      description:
                        'Opcional. "false" gera só os números. Padrão: "true".',
                    },
                  ]}
                  response={{
                    stateRegistrations: [
                      '062.307.904/0081',
                      '195.445.174/3240',
                    ],
                  }}
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
                  Escolha o estado, digite a inscrição e clique em "Validar
                  inscrição estadual" para saber se ela é válida.
                </p>

                <DocumentValidator document="state-registration" />

                <HowItWorks
                  items={[
                    'A validação é feita no servidor e nada fica armazenado.',
                    'São verificados o tamanho, o prefixo e os dígitos verificadores que o estado escolhido exige.',
                    'A inscrição pode ser digitada com ou sem pontuação.',
                    'Em São Paulo, só a inscrição de indústria e comércio é aceita; a de produtor rural, que começa com P, não.',
                    'O resultado aparece logo abaixo do campo.',
                  ]}
                />

                <ApiUsage
                  name="validador de inscrição estadual"
                  method="POST"
                  path="/api/validators/state-registration"
                  body={{ stateRegistration: '110.042.490.114', state: 'SP' }}
                  parameters={[
                    {
                      name: 'stateRegistration',
                      description:
                        'Obrigatório. O número com ou sem pontuação.',
                    },
                    {
                      name: 'state',
                      description: 'Obrigatório. A sigla do estado, como "SP".',
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
