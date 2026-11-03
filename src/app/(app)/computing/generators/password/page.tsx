import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Gerador de senha',
  description:
    'Gere senhas seguras e aleatórias, com letras maiúsculas, minúsculas e números.',
  keywords: [
    'gerador de senha',
    'gerador de senha online',
    'gerador de senha segura',
    'gerador de senha aleatória',
    'gerador de senha forte',
    'gerador de senha com letras e números',
    'gerador de senha com letras maiúsculas',
    'gerador de senha com letras minúsculas',
    'gerador de senha com números',
    'gerador de senha com símbolos',
    'gerador de senha com caracteres especiais',
  ],
}

export default function PasswordGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de senha</h1>

        <p className="text-muted-foreground text-balance">
          Crie uma senha segura com um clique.
        </p>
      </div>

      <Generator
        name="senha"
        label="Senha gerada"
        endpoint="/api/generators/password"
        field="password"
      />

      <div>
        <h2 className="text-lg font-medium mb-2">Como funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            A senha é gerada no servidor e não fica armazenada em lugar nenhum.
          </li>
          <li>
            Ela é criada com um gerador de números aleatórios criptograficamente
            seguro.
          </li>
          <li>
            Tem 18 caracteres em três grupos de seis, separados por hífens (por
            exemplo, abcdef-ghiJkl-mn4opq), o que facilita ler e digitar.
          </li>
          <li>
            Sempre tem exatamente uma letra maiúscula e um número; os demais
            caracteres são letras minúsculas.
          </li>
          <li>Para copiar a senha, clique no ícone ao lado dela.</li>
        </ul>
      </div>
    </div>
  )
}
