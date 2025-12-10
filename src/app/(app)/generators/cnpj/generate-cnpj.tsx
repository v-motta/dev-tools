'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getQueryClient } from '@/lib/react-query'

function getGeneratedCNPJ() {
  return ky.get('/api/generators/cnpj').json<{ cnpj: string }>()
}

export function GenerateCNPJ() {
  const [isCopied, setIsCopied] = useState(false)
  const queryClient = getQueryClient()

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['generate-cnpj'],
    queryFn: getGeneratedCNPJ,
    refetchOnWindowFocus: false,
  })

  async function handleCopyCNPJ() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.cnpj)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  async function handleGenerateCNPJ() {
    await queryClient.refetchQueries({ queryKey: ['generate-cnpj'] })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="generated_cnpj">Generated CNPJ</Label>
        <div className="flex gap-2">
          <div className="min-h-9 flex-1 font-mono border border-border px-3 flex items-center text-xl rounded-md dark:bg-input/30">
            {isSuccess ? (
              data.cnpj
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
        disabled={isFetching}
        onClick={handleGenerateCNPJ}
      >
        {isFetching ? (
          <LoaderCircle className="animate-spin mr-2" />
        ) : (
          'Generate CNPJ'
        )}
      </Button>
    </div>
  )
}
