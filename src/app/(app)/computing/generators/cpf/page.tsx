import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de CPF',
  description: 'Gere um CPF válido para testes na hora.',
}
export default async function CPFGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CPF</h1>

        <p className="text-muted-foreground text-balance">
          Clique em "Gerar CPF" e, em instantes, um novo CPF válido é criado.
        </p>
      </div>

      <Generator
        name="CPF"
        label="CPF gerado"
        endpoint="/api/generators/cpf"
        field="cpf"
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
          <li>Para copiar o CPF, clique no ícone ao lado dele.</li>
        </ul>
      </div>
    </div>
  )
}
