import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { CepLookup } from '@/components/cep-lookup'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { ToolModes } from '@/components/tool-modes'
import { STATE_CHOICES } from '@/utils/states'

export const metadata: Metadata = {
  title: 'Gerador e consulta de CEP',
  description:
    'Gere CEPs reais com o endereço completo para testes, de qualquer estado, ou consulte o endereço de um CEP.',
  keywords: [
    'gerador de cep',
    'gerador de cep válido',
    'gerador de endereço',
    'consulta de cep',
    'buscar cep',
  ],
}

const ADDRESS_FIELDS = [
  { key: 'cep', label: 'CEP' },
  { key: 'street', label: 'Logradouro' },
  { key: 'neighborhood', label: 'Bairro' },
  { key: 'city', label: 'Cidade' },
  { key: 'state', label: 'Estado' },
]

export default function CEPPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e consulta de CEP
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere um CEP real com o endereço para usar em testes ou descubra o
          endereço de um CEP.
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
                  Um CEP é gerado ao abrir a página. Escolha o estado ou clique
                  em "Gerar CEP" para criar outro.
                </p>

                <RecordGenerator
                  buttonLabel="Gerar CEP"
                  endpoint="/api/generators/address"
                  field="address"
                  fields={ADDRESS_FIELDS}
                  options={[
                    {
                      type: 'select',
                      name: 'state',
                      label: 'Estado',
                      defaultValue: ANY,
                      choices: [
                        { value: ANY, label: 'Qualquer estado' },
                        ...STATE_CHOICES,
                      ],
                    },
                  ]}
                />

                <HowItWorks
                  items={[
                    'Os CEPs são reais e vêm dos Correios, pela ViaCEP: cada um existe e corresponde à rua, ao bairro e à cidade mostrados.',
                    'São sorteados entre ruas da capital e de outra cidade grande de cada estado, então funcionam em formulários que preenchem o endereço pelo CEP.',
                    'CEPs exclusivos de empresas e órgãos públicos ficam de fora.',
                  ]}
                />

                <ApiUsage
                  name="gerador de CEP"
                  method="GET"
                  path="/api/generators/address"
                  query={{ state: 'PE' }}
                  parameters={[
                    {
                      name: 'state',
                      description:
                        'Opcional. A sigla do estado, como "SP". Sem ela, o estado é sorteado.',
                    },
                    {
                      name: 'formatted',
                      description:
                        'Opcional. "false" gera o CEP só com números. Padrão: "true".',
                    },
                  ]}
                  response={{
                    address: {
                      cep: '55016-460',
                      street: 'Avenida Terezina',
                      neighborhood: 'Universitário',
                      city: 'Caruaru',
                      state: 'PE',
                    },
                  }}
                />
              </>
            ),
          },
          {
            value: 'lookup',
            label: 'Consultar',
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  Digite um CEP e clique em "Consultar CEP" para ver o endereço.
                </p>

                <CepLookup />

                <HowItWorks
                  items={[
                    'A consulta usa a base dos Correios, pela ViaCEP.',
                    'O CEP pode ser digitado com ou sem hífen.',
                    'CEPs de cidades pequenas, que têm um CEP só, voltam sem rua e sem bairro.',
                  ]}
                />

                <ApiUsage
                  name="consulta de CEP"
                  method="GET"
                  path="/api/cep/01304000"
                  response={{
                    address: {
                      cep: '01304-000',
                      street: 'Rua Augusta',
                      complement: 'até 698 - lado par',
                      neighborhood: 'Consolação',
                      city: 'São Paulo',
                      state: 'SP',
                      ddd: '11',
                    },
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </div>
  )
}
