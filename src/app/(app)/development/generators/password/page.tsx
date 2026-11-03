import type { Metadata } from 'next'
import { ApiUsage } from '@/components/api-usage'
import { Generator } from '@/components/generator'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/utils/generate-password'

export const metadata: Metadata = {
  title: 'Gerador de senha',
  description:
    'Gere senhas seguras e aleatórias, escolhendo o tamanho e se terá letras maiúsculas, números e símbolos.',
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

const CUSTOM_STYLE = { name: 'style', value: 'custom' }

export default function PasswordGeneratorPage() {
  return (
    <div className="w-full max-w-2xl space-y-8">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de senha</h1>

        <p className="text-muted-foreground text-balance">
          Gere uma senha no estilo da Apple, fácil de ler e digitar, ou escolha
          o tamanho e os tipos de caractere. A senha é gerada de novo a cada
          mudança.
        </p>
      </div>

      <Generator
        name="senha"
        label="Senha gerada"
        pluralLabel="Senhas geradas"
        endpoint="/api/generators/password"
        field="password"
        options={[
          {
            type: 'toggle',
            name: 'style',
            label: 'Estilo',
            defaultValue: 'apple',
            choices: [
              { value: 'apple', label: 'Apple' },
              { value: 'custom', label: 'Personalizado' },
            ],
          },
          {
            type: 'range',
            name: 'length',
            label: 'Tamanho',
            defaultValue: 16,
            min: PASSWORD_MIN_LENGTH,
            max: PASSWORD_MAX_LENGTH,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'uppercase',
            label: 'Letras maiúsculas',
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'numbers',
            label: 'Números',
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
          {
            type: 'boolean',
            name: 'symbols',
            label: 'Símbolos (!@#$%&*-_=+?)',
            defaultValue: true,
            showWhen: CUSTOM_STYLE,
          },
        ]}
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
            O estilo Apple segue o formato das senhas fortes sugeridas pelo
            iPhone e pelo Mac: três grupos de seis letras minúsculas separados
            por hífens, com exatamente uma letra maiúscula e um número.
          </li>
          <li>
            No estilo personalizado, letras minúsculas sempre entram e a senha
            tem pelo menos um caractere de cada tipo escolhido. Os símbolos não
            incluem aspas, barras invertidas nem espaços, que costumam quebrar
            ao colar em arquivos de configuração ou no terminal.
          </li>
          <li>
            Os últimos valores gerados ficam listados abaixo do botão até você
            sair da página.
          </li>
        </ul>
      </div>

      <ApiUsage
        name="gerador de senha"
        method="GET"
        path="/api/generators/password"
        query={{ style: 'custom', length: '20', symbols: 'false' }}
        parameters={[
          {
            name: 'style',
            description:
              'Opcional. "apple" (abcdef-ghiJkl-mn4opq) ou "custom". Padrão: "apple".',
          },
          {
            name: 'length',
            description: `Só com style=custom. De ${PASSWORD_MIN_LENGTH} a ${PASSWORD_MAX_LENGTH}. Padrão: 16.`,
          },
          {
            name: 'uppercase',
            description:
              'Só com style=custom. Inclui letras maiúsculas. Padrão: "true".',
          },
          {
            name: 'numbers',
            description: 'Só com style=custom. Inclui números. Padrão: "true".',
          },
          {
            name: 'symbols',
            description:
              'Só com style=custom. Inclui símbolos. Padrão: "true".',
          },
          {
            name: 'quantity',
            description:
              'Opcional. De 1 a 50. Quando informado, a resposta traz a lista "passwords" em vez de "password".',
          },
        ]}
        response={{ password: 'q7RmvKw2tLxa9bNpEcz4' }}
      />
    </div>
  )
}
