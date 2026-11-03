import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentModes } from '@/components/document-modes'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador e validador de CNPJ',
  description:
    'Gere CNPJs válidos para testes, com ou sem pontuação, ou confira na hora se um CNPJ é válido.',
  keywords: [
    'gerador de cnpj',
    'gerador de cnpj online',
    'gerador de cnpj válido',
    'gerador de cnpj com máscara',
    'validador de cnpj',
    'validador de cnpj online',
    'validador de cnpj com pontuação',
  ],
}

export default function CNPJPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de CNPJ
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere CNPJs válidos para usar em testes ou confira se um CNPJ é válido.
        </p>
      </div>

      <DocumentModes
        generate={
          <>
            <p className="text-muted-foreground text-balance">
              Um CNPJ válido é gerado ao abrir a página. Escolha a quantidade e
              o formato, ou clique em "Gerar CNPJ" para criar outro.
            </p>

            <Generator
              name="CNPJ"
              label="CNPJ gerado"
              pluralLabel="CNPJs gerados"
              endpoint="/api/generators/cnpj"
              field="cnpj"
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
                  O CNPJ é gerado no servidor e não fica armazenado em lugar
                  nenhum.
                </li>
                <li>O número segue as regras da Receita Federal.</li>
                <li>Os dígitos verificadores são calculados corretamente.</li>
                <li>
                  O número serve apenas para testes e não pertence a nenhuma
                  empresa real.
                </li>
                <li>
                  Os últimos valores gerados ficam listados abaixo do botão até
                  você sair da página.
                </li>
              </ul>
            </div>

            <ApiUsage
              name="gerador de CNPJ"
              method="GET"
              path="/api/generators/cnpj"
              query={{ quantity: '2', formatted: 'false' }}
              parameters={[
                {
                  name: 'quantity',
                  description:
                    'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "cnpjs" em vez de "cnpj".',
                },
                {
                  name: 'formatted',
                  description:
                    'Opcional. "false" gera só os números. Padrão: "true".',
                },
              ]}
              response={{ cnpjs: ['11222333000181', '45723174000110'] }}
            />
          </>
        }
        validate={
          <>
            <p className="text-muted-foreground text-balance">
              Digite um CNPJ e clique em "Validar CNPJ" para saber se ele é
              válido.
            </p>

            <DocumentValidator document="cnpj" />

            <div>
              <h2 className="text-lg font-medium mb-2">Como funciona</h2>

              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>A validação é feita no servidor e nada fica armazenado.</li>
                <li>
                  O validador confere se o CNPJ segue as regras da Receita
                  Federal.
                </li>
                <li>São verificados o formato e os dígitos verificadores.</li>
                <li>
                  O CNPJ pode ser digitado com ou sem pontuação
                  (00.000.000/0001-00 ou 00000000000100).
                </li>
                <li>O resultado aparece logo abaixo do campo.</li>
              </ul>
            </div>

            <ApiUsage
              name="validador de CNPJ"
              method="POST"
              path="/api/validators/cnpj"
              body={{ cnpj: '00.111.222/0000-00' }}
              parameters={[
                {
                  name: 'cnpj',
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
