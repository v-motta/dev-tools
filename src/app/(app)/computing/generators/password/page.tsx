import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'Password Generator',
  description:
    'Generate secure and random passwords with different combinations of characters, including uppercase letters, numbers, and special symbols.',
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
        <h1 className="text-2xl font-bold font-mono">Password Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our password generator to create a secure password.
        </p>
      </div>

      <Generator
        name="password"
        endpoint="/api/generators/password"
        field="password"
      />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The password is generated on the server and is not stored anywhere.
          </li>
          <li>
            The password is generated with a cryptographically secure random
            number generator.
          </li>
          <li>
            It has 18 characters split into three groups of six separated by
            hyphens (e.g. abcdef-ghiJkl-mn4opq), which makes it easy to read and
            type.
          </li>
          <li>
            It always contains exactly one uppercase letter and one number; the
            other characters are lowercase letters.
          </li>
          <li>
            You can copy the generated password by clicking the copy icon next
            to it.
          </li>
        </ul>
      </div>
    </div>
  )
}
