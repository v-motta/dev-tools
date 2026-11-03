import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'
import { HowItWorks } from '@/components/how-it-works'

export const metadata: Metadata = {
  title: 'Gerador de placa de veículo',
  description:
    'Gere placas de carro e moto aleatórias no padrão Mercosul ou no modelo antigo.',
  keywords: [
    'gerador de placa',
    'gerador de placa de carro',
    'gerador de placa mercosul',
    'gerador de placa de veículo',
  ],
}

export default function LicensePlateGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">
          Gerador de placa de veículo
        </h1>

        <p className="text-muted-foreground text-balance">
          Uma placa no padrão Mercosul é gerada ao abrir a página. Escolha a
          quantidade e o padrão, ou clique em "Gerar placa" para criar outra.
        </p>
      </div>

      <Generator
        name="placa"
        label="Placa gerada"
        pluralLabel="Placas geradas"
        endpoint="/api/generators/license-plate"
        field="plate"
        options={[
          {
            type: 'toggle',
            name: 'format',
            label: 'Padrão',
            defaultValue: 'mercosul',
            choices: [
              { value: 'mercosul', label: 'Mercosul' },
              { value: 'old', label: 'Antigo' },
            ],
          },
        ]}
      />

      <HowItWorks
        items={[
          'A placa é gerada no servidor e não fica armazenada em lugar nenhum.',
          'O padrão Mercosul tem três letras, um número, uma letra e dois números (ABC1D23).',
          'O modelo antigo tem três letras e quatro números (ABC-1234).',
          'A placa é sorteada e pode coincidir com a de um veículo real; use só para testes.',
          'Os últimos valores gerados ficam listados abaixo do botão até você sair da página.',
        ]}
      />

      <ApiUsage
        name="gerador de placa"
        method="GET"
        path="/api/generators/license-plate"
        query={{ format: 'old', quantity: '2' }}
        parameters={[
          {
            name: 'format',
            description:
              'Opcional. "mercosul" (ABC1D23) ou "old" (ABC-1234). Padrão: "mercosul".',
          },
          {
            name: 'quantity',
            description:
              'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "plates" em vez de "plate".',
          },
        ]}
        response={{ plates: ['RGR-4064', 'KQT-1182'] }}
      />
    </div>
  )
}
