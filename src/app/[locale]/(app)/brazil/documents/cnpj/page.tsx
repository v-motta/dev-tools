import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { DocumentValidator } from '@/components/document-validator'
import { Generator } from '@/components/generator'
import { ANY } from '@/components/generator-options'
import { HowItWorks } from '@/components/how-it-works'
import { RecordGenerator } from '@/components/record-generator'
import { ToolModes } from '@/components/tool-modes'
import { STATE_CHOICES } from '@/utils/states'

export const metadata: Metadata = {
  title: 'Gerador de CNPJ e de empresa, e validador de CNPJ',
  description:
    'Gere CNPJs válidos ou empresas completas para testes, com razão social, inscrição estadual e endereço, ou confira se um CNPJ é válido.',
  keywords: [
    'gerador de cnpj',
    'gerador de cnpj online',
    'gerador de cnpj válido',
    'gerador de cnpj com máscara',
    'gerador de empresa',
    'gerador de empresa fictícia',
    'validador de cnpj',
    'validador de cnpj online',
  ],
}

const COMPANY_FIELDS = [
  { key: 'name', label: 'Razão social' },
  { key: 'tradeName', label: 'Nome fantasia' },
  { key: 'cnpj', label: 'CNPJ' },
  { key: 'stateRegistration', label: 'Inscrição estadual' },
  { key: 'foundedAt', label: 'Data de abertura' },
  { key: 'email', label: 'E-mail' },
  { key: 'website', label: 'Site' },
  { key: 'phone', label: 'Telefone' },
  { key: 'cep', label: 'CEP' },
  { key: 'street', label: 'Logradouro' },
  { key: 'number', label: 'Número' },
  { key: 'neighborhood', label: 'Bairro' },
  { key: 'city', label: 'Cidade' },
  { key: 'state', label: 'Estado' },
]

export default function CNPJPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador e validador de CNPJ
        </h1>

        <p className="text-muted-foreground text-balance">
          Gere só um CNPJ ou uma empresa completa para usar em testes, ou
          confira se um CNPJ é válido.
        </p>
      </div>

      <ToolModes
        modes={[
          {
            value: 'cnpj',
            label: 'Só o CNPJ',
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  Um CNPJ válido é gerado ao abrir a página. Escolha a
                  quantidade e o formato, ou clique em "Gerar CNPJ" para criar
                  outro.
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

                <HowItWorks
                  items={[
                    'O CNPJ é gerado no servidor e não fica armazenado em lugar nenhum.',
                    'O número segue as regras da Receita Federal.',
                    'Os dígitos verificadores são calculados corretamente.',
                    'O número serve apenas para testes e não pertence a nenhuma empresa real.',
                    'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
                  ]}
                />

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
            ),
          },
          {
            value: 'company',
            label: 'Empresa completa',
            content: (
              <>
                <p className="text-muted-foreground text-balance">
                  Uma empresa fictícia com CNPJ, inscrição estadual, contato e
                  endereço. Escolha o estado ou deixe em "Qualquer estado".
                </p>

                <RecordGenerator
                  buttonLabel="Gerar empresa"
                  endpoint="/api/generators/company"
                  field="company"
                  fields={COMPANY_FIELDS}
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
                    'A empresa é gerada no servidor e não fica armazenada em lugar nenhum.',
                    'O CNPJ e a inscrição estadual são válidos, e a inscrição segue as regras do estado da empresa.',
                    'O endereço é real: o CEP existe e corresponde à rua, ao bairro e à cidade. O telefone usa o DDD da cidade.',
                    'O e-mail usa domínios reservados para testes (example.com), então nenhuma mensagem chega a alguém de verdade.',
                    'Os dados servem apenas para testes e não pertencem a nenhuma empresa real.',
                  ]}
                />

                <ApiUsage
                  name="gerador de empresa"
                  method="GET"
                  path="/api/generators/company"
                  query={{ state: 'RS' }}
                  parameters={[
                    {
                      name: 'state',
                      description:
                        'Opcional. A sigla do estado, como "SP". Sem ela, o estado é sorteado.',
                    },
                  ]}
                  response={{
                    company: {
                      name: 'Santos Logística Ltda',
                      tradeName: 'Santos Logística',
                      cnpj: '47.870.299/7915-54',
                      stateRegistration: '416/9121979',
                      foundedAt: '10/01/2016',
                      email: 'contato.santoslogistica@example.com',
                      website: 'www.santoslogistica.com.br',
                      phone: '(51) 2984-4088',
                      cep: '91510-090',
                      street: 'Avenida Rocio',
                      number: '2583',
                      neighborhood: 'Vila João Pessoa',
                      city: 'Porto Alegre',
                      state: 'RS',
                    },
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
                  Digite um CNPJ e clique em "Validar CNPJ" para saber se ele é
                  válido.
                </p>

                <DocumentValidator document="cnpj" />

                <HowItWorks
                  items={[
                    'A validação é feita no servidor e nada fica armazenado.',
                    'O validador confere se o CNPJ segue as regras da Receita Federal.',
                    'São verificados o formato e os dígitos verificadores.',
                    'O CNPJ pode ser digitado com ou sem pontuação (00.000.000/0001-00 ou 00000000000100).',
                    'O resultado aparece logo abaixo do campo.',
                  ]}
                />

                <ApiUsage
                  name="validador de CNPJ"
                  method="POST"
                  path="/api/validators/cnpj"
                  body={{ cnpj: '00.111.222/0000-00' }}
                  parameters={[
                    {
                      name: 'cnpj',
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
