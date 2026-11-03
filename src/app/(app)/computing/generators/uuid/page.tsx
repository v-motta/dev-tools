import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de UUID',
  description: 'Gere um UUID v4 aleatório na hora.',
  keywords: [
    'gerador de UUID',
    'gerador de UUID online',
    'gerador de UUID aleatório',
  ],
}

export default function UUIDGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de UUID</h1>

        <p className="text-muted-foreground text-balance">
          Crie um identificador único com um clique.
        </p>
      </div>

      <Generator
        name="UUID"
        label="UUID gerado"
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
          <li>Para copiar o UUID, clique no ícone ao lado dele.</li>
        </ul>
      </div>
    </div>
  )
}
