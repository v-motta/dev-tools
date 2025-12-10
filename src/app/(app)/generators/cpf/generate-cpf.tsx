'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getQueryClient } from '@/lib/react-query'

function getGeneratedCPF() {
  return ky.get('/api/generators/cpf').json<{ cpf: string }>()
}

export function GenerateCPF() {
  const [isCopied, setIsCopied] = useState(false)
  const queryClient = getQueryClient()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['generate-cpf'],
    queryFn: getGeneratedCPF,
    refetchOnWindowFocus: false,
  })

  async function handleCopyCPF() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.cpf)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateCPF() {
    await queryClient.refetchQueries({ queryKey: ['generate-cpf'] })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="generated_cpf">Generated CPF</Label>
        <div className="flex gap-2">
          <div className="min-h-9 flex-1 font-mono border border-border px-3 flex items-center text-xl rounded-md">
            {isSuccess ? (
              data.cpf
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
        disabled={isFetching}
        onClick={handleGenerateCPF}
      >
        {isFetching ? (
          <LoaderCircle className="animate-spin mr-2" />
        ) : (
          'Generate CPF'
        )}
      </Button>
    </div>
  )
}
