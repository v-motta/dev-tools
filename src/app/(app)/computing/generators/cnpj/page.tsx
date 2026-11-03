import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de CNPJ',
  description: 'Gere um CNPJ válido para testes na hora.',
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
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CNPJ</h1>

        <p className="text-muted-foreground text-balance">
          Clique em "Gerar CNPJ" e, em instantes, um novo CNPJ válido é criado.
        </p>
      </div>

      <Generator
        name="CNPJ"
        label="CNPJ gerado"
        endpoint="/api/generators/cnpj"
        field="cnpj"
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
          <li>Para copiar o CNPJ, clique no ícone ao lado dele.</li>
        </ul>
      </div>
    </div>
  )
}
