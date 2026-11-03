import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { RandomPicker } from './random-picker'

export const metadata: Metadata = {
  title: 'Sorteador de números',
  description: 'Sorteie um ou mais números aleatórios dentro de um intervalo.',
}

export default function RandomPickerPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Sorteador de números</h1>

        <p className="text-muted-foreground text-balance">
          Escolha quantos números quer sortear e o intervalo do sorteio.
        </p>
      </div>

      <RandomPicker />

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Os números são sorteados no servidor e não ficam armazenados.</li>
          <li>
            O mínimo e o máximo fazem parte do intervalo, e números negativos
            são aceitos.
          </li>
          <li>Você pode sortear até 1000 números de uma vez.</li>
          <li>
            Cada número é sorteado de forma independente, então pode repetir.
          </li>
          <li>
            O sorteio não é criptograficamente seguro: não use para senhas,
            tokens de segurança ou sorteios com prêmios de verdade.
          </li>
        </ul>
      </div>

      <ApiUsage
        name="sorteador de números"
        method="POST"
        path="/api/random-picker"
        body={{ random_count: 3, random_min: 1, random_max: 60 }}
        parameters={[
          {
            name: 'random_count',
            description: 'Obrigatório. Quantos números sortear, de 1 a 1000.',
          },
          {
            name: 'random_min',
            description: 'Obrigatório. O menor número possível (incluído).',
          },
          {
            name: 'random_max',
            description: 'Obrigatório. O maior número possível (incluído).',
          },
        ]}
        response={{ randomNumber: [7, 42, 18] }}
      />
    </div>
  )
}
