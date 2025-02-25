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
    staleTime: 1000 * 60 * 60 * 4, // 4 hours
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
        <h1 className="text-2xl font-bold font-mono">CPF Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our CPF generator! Just click on 'Generate CPF' and, in moments, a
          new valid number will be created.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="generated_cpf">Generated CPF</Label>
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
          Generate CPF
        </Button>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The CPF is generated on the server and is not stored anywhere.
          </li>
          <li>
            The generator creates a valid CPF number following the rules of the
            Federal Revenue Service.
          </li>
          <li>The generated CPF has correctly calculated check digits.</li>
          <li>
            The generated number is for testing purposes only and does not
            belong to any real person.
          </li>
          <li>
            You can copy the generated CPF by clicking the copy icon next to it.
          </li>
        </ul>
      </div>
    </div>
  )
}
