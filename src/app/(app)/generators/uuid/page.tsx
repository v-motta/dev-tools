'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/query-client'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function UUIDGeneratorPage() {
  const [isCopied, setIsCopied] = useState(false)

  const {
    data: generatedUUID,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['uuid'],
    queryFn: async () => {
      return await ky.get('/api/generators/uuid').json<{ uuid: string }>()
    },
  })

  async function handleCopyUUID() {
    if (isSuccess) {
      navigator.clipboard.writeText(generatedUUID.uuid)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateUUID() {
    await queryClient.refetchQueries({ queryKey: ['uuid'] })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de UUID</h1>

        <p className="text-muted-foreground text-balance">
          Use nosso gerador de UUID para criar um identificador único.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="generated_uuid">UUID Gerado</Label>
          <div className="flex gap-2">
            <div className="min-h-9 flex-1 font-mono border border-border px-3 flex items-center text-xl rounded-md">
              {isSuccess ? (
                <p>{generatedUUID.uuid}</p>
              ) : (
                <LoaderCircle className="animate-spin text-muted-foreground" />
              )}
            </div>

            <Button
              size="icon"
              variant="outline"
              className="[&_svg]:size-5 text-muted-foreground"
              onClick={handleCopyUUID}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleGenerateUUID}
          isPending={isFetching}
        >
          Gerar UUID
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como isso funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            O UUID é gerado no servidor e não é armazenado em nenhum lugar.
          </li>
          <li>
            O gerador cria um UUID v4 que garante um identificador único
            universal.
          </li>
          <li>
            O UUID gerado segue o padrão 8-4-4-4-12 caracteres hexadecimais.
          </li>
          <li>
            A chance de gerar dois UUIDs iguais é praticamente impossível.
          </li>
          <li>
            Você pode copiar o UUID gerado clicando no ícone de cópia ao lado
            dele.
          </li>
        </ul>
      </div>
    </div>
  )
}
