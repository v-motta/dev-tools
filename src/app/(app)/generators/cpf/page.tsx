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

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['cpf'],
    queryFn: async () => {
      return await ky.get('/api/generators/cpf').json<{ cpf: string }>()
    },
    staleTime: 1000 * 60 * 60 * 24,
  })

  async function handleCopyCPF() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.cpf)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateCPF() {
    await queryClient.refetchQueries()
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
          <div className="relative">
            <div className="h-12 font-mono border border-zinc-200 dark:border-zinc-500 px-3 flex items-center text-xl rounded-md">
              <p>
                {isLoading && <LoaderCircle className="animate-spin" />}
                {isSuccess && data.cpf}
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute [&_svg]:size-6 right-1 top-1/2 -translate-y-1/2 text-zinc-500"
              onClick={handleCopyCPF}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" onClick={handleGenerateCPF}>
          Gerar CPF
        </Button>
      </div>
    </div>
  )
}
