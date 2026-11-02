import type { Metadata } from 'next'
import { Generator } from '@/components/generator'

export const metadata: Metadata = {
  title: 'UUID Generator',
  description: 'Generate a random v4 UUID instantly.',
  keywords: [
    'gerador de UUID',
    'gerador de UUID online',
    'gerador de UUID aleatória',
  ],
}

export default function UUIDGeneratorPage() {
  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">UUID Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our UUID generator to create a unique identifier.
        </p>
      </div>

      <Generator name="UUID" endpoint="/api/generators/uuid" field="uuid" />

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The UUID is generated on the server and is not stored anywhere.
          </li>
          <li>
            The generator creates a v4 UUID that ensures a unique universal
            identifier.
          </li>
          <li>
            The generated UUID follows the 8-4-4-4-12 hexadecimal character
            format.
          </li>
          <li>
            The chance of generating two identical UUIDs is practically
            impossible.
          </li>
          <li>
            You can copy the generated UUID by clicking the copy icon next to
            it.
          </li>
        </ul>
      </div>
    </div>
  )
}
