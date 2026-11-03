import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de CNPJ',
  description: 'Gere CNPJs válidos para testes na hora, com ou sem pontuação.',
  keywords: [
    'gerador de cnpj',
    'gerador de cnpj online',
    'gerador de cnpj válido',
    'gerador de cnpj com números',
    'gerador de cnpj com pontuação',
    'gerador de cnpj com máscara',
  ],
}

export default function CNPJGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CNPJ</h1>

        <p className="text-muted-foreground text-balance">
          Um CNPJ válido é gerado ao abrir a página. Escolha a quantidade e o
          formato, ou clique em "Gerar CNPJ" para criar outro.
        </p>
      </div>

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
            O CNPJ é gerado no servidor e não fica armazenado em lugar nenhum.
          </li>
          <li>O número segue as regras da Receita Federal.</li>
          <li>Os dígitos verificadores são calculados corretamente.</li>
          <li>
            O número serve apenas para testes e não pertence a nenhuma empresa
            real.
          </li>
          <li>
            Os últimos valores gerados ficam listados abaixo do botão até você
            sair da página.
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
    </div>
  )
}
