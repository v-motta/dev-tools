'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface GeneratorProps {
  /** Name of the generated value, e.g. "CPF" */
  name: string
  /** API route that responds with `{ [field]: string }` */
  endpoint: string
  /** Response field that holds the generated value */
  field: string
}

export function Generator({ name, endpoint, field }: GeneratorProps) {
  const id = useId()
  const [isCopied, setIsCopied] = useState(false)

  const { data, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['generator', endpoint],
    queryFn: async () => {
      const response = await ky.get(endpoint).json<Record<string, string>>()
      return response[field]
    },
  })

  async function handleCopy() {
    if (!isSuccess) return

    await navigator.clipboard.writeText(data)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <Label htmlFor={id}>Generated {name}</Label>
        <div className="flex gap-2">
          <output
            id={id}
            className="min-h-9 flex-1 font-mono border border-border px-3 py-1 flex items-center text-xl rounded-md dark:bg-input/30"
          >
            {isSuccess ? (
              <p className="break-all">{data}</p>
            ) : (
              <LoaderCircle className="animate-spin text-muted-foreground" />
            )}
          </output>

          {isSuccess && (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="[&_svg]:size-5 text-muted-foreground"
              aria-label={`Copy ${name}`}
              onClick={handleCopy}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          )}
        </div>
      </div>

      <Button
        className="w-full"
        disabled={isFetching}
        onClick={() => refetch()}
      >
        {isFetching ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          `Generate ${name}`
        )}
      </Button>
    </div>
  )
}
