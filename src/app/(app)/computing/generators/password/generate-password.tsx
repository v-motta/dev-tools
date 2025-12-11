'use client'

import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getQueryClient } from '@/lib/react-query'

function getGeneratedPassword() {
  return ky.get('/api/generators/password').json<{ password: string }>()
}

export function GeneratePassword() {
  const queryClient = getQueryClient()
  const [isCopied, setIsCopied] = useState(false)

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['generate-password'],
    queryFn: getGeneratedPassword,
  })

  async function handleGeneratePassword() {
    await queryClient.refetchQueries({ queryKey: ['generate-password'] })
  }

  async function handleCopyPassword() {
    if (isSuccess) {
      navigator.clipboard.writeText(data.password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-1">
        <Label htmlFor="generated_password">Generated Password</Label>
        <div className="flex gap-2">
          <div className="min-h-9 flex-1 font-mono border border-border px-3 py-1 flex items-center text-xl rounded-md dark:bg-input/30">
            {isSuccess ? (
              <p className="break-all">{data.password}</p>
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
              onClick={handleCopyPassword}
            >
              {isCopied ? <Check className="text-emerald-500" /> : <Copy />}
            </Button>
          )}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleGeneratePassword}
        disabled={isFetching}
      >
        Generate password
      </Button>
    </div>
  )
}
