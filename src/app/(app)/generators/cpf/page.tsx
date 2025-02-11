'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/query-client'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function CPFGeneratorPage() {
  const [isCopied, setIsCopied] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['cpf'],
    queryFn: async () => {
      return await ky.get('/api/generators/cpf').json<{ cpf: string }>()
    },
  })

  async function handleCopyCPF() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.cpf)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateCPF() {
    await queryClient.refetchQueries({ queryKey: ['cpf'] })
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Gerador de CPF</h1>

        <p className="text-zinc-400 text-balance">
          Use nosso gerador de CPF! Basta clicar em "Gerar CPF" e, em instantes,
          um novo número válido será criado.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="generated_cpf">CPF Gerado</Label>
          <div className="flex gap-2">
            <div className="min-h-9 flex-1 font-mono border border-border px-3 flex items-center text-xl rounded-md">
              {isSuccess ? (
                <p>{data.cpf}</p>
              ) : (
                <LoaderCircle className="animate-spin text-muted-foreground" />
              )}
            </div>

            <Button
              size="icon"
              variant="outline"
              className="[&_svg]:size-5 text-muted-foreground"
              onClick={handleCopyCPF}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          onClick={handleGenerateCPF}
          isPending={isFetching}
        >
          Gerar CPF
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Como isso funciona</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            O CPF é gerado no servidor e não é armazenado em nenhum lugar.
          </li>
          <li>
            O gerador cria um número de CPF válido seguindo as regras da Receita
            Federal.
          </li>
          <li>
            O CPF gerado possui os dígitos verificadores calculados
            corretamente.
          </li>
          <li>
            O número gerado é apenas para fins de teste e não pertence a nenhuma
            pessoa real.
          </li>
          <li>
            Você pode copiar o CPF gerado clicando no ícone de cópia ao lado
            dele.
          </li>
        </ul>
      </div>
    </div>
  )
}
