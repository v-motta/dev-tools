'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getQueryClient } from '@/lib/react-query'

function getGeneratedUUID() {
  return ky.get('/api/generators/uuid').json<{ uuid: string }>()
}

export function GenerateUUID() {
  const queryClient = getQueryClient()
  const [isCopied, setIsCopied] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['generate-uuid'],
    queryFn: getGeneratedUUID,
  })

  async function handleGenerateUUID() {
    await queryClient.refetchQueries({ queryKey: ['generate-uuid'] })
  }

  async function handleCopyUUID() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.uuid)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <Label htmlFor="generated_uuid">Generated UUID</Label>
        <div className="flex gap-2">
          <div className="min-h-9 flex-1 font-mono border border-border px-3 py-1 flex items-center text-xl rounded-md dark:bg-input/30">
            {isSuccess ? (
              <p className="break-all">{data.uuid}</p>
            ) : (
              <LoaderCircle className="animate-spin text-muted-foreground" />
            )}
          </div>

          {isSuccess && (
            <Button
              size="icon"
              variant="outline"
              type="button"
              className="[&_svg]:size-5 text-muted-foreground"
              onClick={handleCopyUUID}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          )}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleGenerateUUID}
        disabled={isFetching}
      >
        Generate uuid
      </Button>
    </div>
  )
}
