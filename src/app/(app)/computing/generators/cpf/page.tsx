import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de CPF',
  description: 'Gere CPFs válidos para testes na hora, com ou sem pontuação.',
}

export default function CPFGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CPF</h1>

        <p className="text-muted-foreground text-balance">
          Um CPF válido é gerado ao abrir a página. Escolha a quantidade e o
          formato, ou clique em "Gerar CPF" para criar outro.
        </p>
      </div>

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
            O CPF é gerado no servidor e não fica armazenado em lugar nenhum.
          </li>
          <li>O número segue as regras da Receita Federal.</li>
          <li>Os dígitos verificadores são calculados corretamente.</li>
          <li>
            O número serve apenas para testes e não pertence a nenhuma pessoa
            real.
          </li>
          <li>
            Os últimos valores gerados ficam listados abaixo do botão até você
            sair da página.
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
    </div>
  )
}
