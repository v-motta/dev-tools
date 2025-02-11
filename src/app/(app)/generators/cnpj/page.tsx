'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/query-client'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function CNPJGeneratorPage() {
  const [isCopied, setIsCopied] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['cnpj'],
    queryFn: async () => {
      return await ky.get('/api/generators/cnpj').json<{ cnpj: string }>()
    },
  })

  async function handleCopyCNPJ() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.cnpj)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateCNPJ() {
    await queryClient.refetchQueries({ queryKey: ['cnpj'] })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CNPJ</h1>

        <p className="text-muted-foreground text-balance">
          Use nosso gerador de CNPJ! Basta clicar em "Gerar CNPJ" e, em
          instantes, um novo número válido será criado.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="generated_cnpj">CNPJ Gerado</Label>
          <div className="flex gap-2">
            <div className="min-h-9 flex-1 font-mono border border-border px-3 flex items-center text-xl rounded-md">
              {isSuccess ? (
                <p>{data.cnpj}</p>
              ) : (
                <LoaderCircle className="animate-spin text-muted-foreground" />
              )}
            </div>

            <Button
              size="icon"
              variant="outline"
              className="[&_svg]:size-5 text-muted-foreground"
              onClick={handleCopyCNPJ}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleGenerateCNPJ}
          isPending={isFetching}
        >
          Gerar CNPJ
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como isso funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            O CNPJ é gerado no servidor e não é armazenado em nenhum lugar.
          </li>
          <li>
            O gerador cria um número de CNPJ válido seguindo as regras da
            Receita Federal.
          </li>
          <li>
            O CNPJ gerado possui os dígitos verificadores calculados
            corretamente.
          </li>
          <li>
            O número gerado é apenas para fins de teste e não pertence a nenhuma
            pessoa real.
          </li>
          <li>
            Você pode copiar o CNPJ gerado clicando no ícone de cópia ao lado
            dele.
          </li>
        </ul>
      </div>
    </div>
  )
}
