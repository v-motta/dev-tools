import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de UUID',
  description: 'Gere UUIDs v4 aleatórios na hora.',
  keywords: [
    'gerador de UUID',
    'gerador de UUID online',
    'gerador de UUID aleatório',
  ],
}

export default function UUIDGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de UUID</h1>

        <p className="text-muted-foreground text-balance">
          Um UUID é gerado ao abrir a página. Escolha a quantidade ou clique em
          "Gerar UUID" para criar outro.
        </p>
      </div>

      <Generator
        name="UUID"
        label="UUID gerado"
        pluralLabel="UUIDs gerados"
        endpoint="/api/generators/uuid"
        field="uuid"
      />

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            O UUID é gerado no servidor e não fica armazenado em lugar nenhum.
          </li>
          <li>
            O gerador cria um UUID versão 4, baseado em números aleatórios.
          </li>
          <li>
            O UUID segue o formato 8-4-4-4-12, com caracteres hexadecimais.
          </li>
          <li>A chance de gerar dois UUIDs iguais é, na prática, nula.</li>
          <li>
            Os últimos valores gerados ficam listados abaixo do botão até você
            sair da página.
          </li>
        </ul>
      </div>

      <ApiUsage
        name="gerador de UUID"
        method="GET"
        path="/api/generators/uuid"
        parameters={[
          {
            name: 'quantity',
            description:
              'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "uuids" em vez de "uuid".',
          },
        ]}
        response={{ uuid: '3b241101-e2bb-4255-8caf-4136c566a962' }}
      />
    </div>
  )
}
