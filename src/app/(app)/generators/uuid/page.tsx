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
        <h1 className="text-2xl font-bold font-mono">UUID Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our UUID generator to create a unique identifier.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="generated_uuid">UUID Generator</Label>
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
          Generate UUID
        </Button>
      </div>

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
