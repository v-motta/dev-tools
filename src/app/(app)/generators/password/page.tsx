'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/query-client'
import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function PasswordGeneratorPage() {
  const [lengthError, setLengthError] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [urlParams, setUrlParams] = useState({
    length: '12',
    uppercase: false,
    numbers: false,
    symbols: false,
  })

  const {
    data: generatedPassword,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['password'],
    queryFn: async () => {
      const {
        length,
        uppercase: includeUppercase,
        numbers: includeNumbers,
        symbols: includeSymbols,
      } = urlParams

      const url = `/api/generators/password?length=${length}&uppercase=${includeUppercase}&numbers=${includeNumbers}&symbols=${includeSymbols}`

      return await ky.get(url).json<{ password: string }>()
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const result = Object.fromEntries(data)

    if (!result.length) {
      setLengthError('This field is required')
      return
    }

    if (Number(result.length) <= 3) {
      setLengthError('The length must be greater than 3')
      return
    }

    setLengthError('')

    await queryClient.refetchQueries({ queryKey: ['password'] })
  }

  async function handleCopyPassword() {
    if (isSuccess) {
      navigator.clipboard.writeText(generatedPassword.password)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8 w-full lg:w-1/2 2xl:w-1/3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold font-mono">Password Generator</h1>

        <p className="text-muted-foreground text-balance">
          Use our password generator to create a secure password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="length">Maximum character length</Label>
          <Input
            id="length"
            name="length"
            maxLength={3}
            value={urlParams.length}
            onChange={(event) => {
              let { value } = event.currentTarget
              setLengthError('')

              value = value.replace(/\D/g, '')

              setUrlParams((prev) => ({ ...prev, length: value }))
            }}
          />
          {lengthError && <p className="text-red-500 text-sm">{lengthError}</p>}
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="uppercase"
              name="uppercase"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  uppercase: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="uppercase">Uppercase letters</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="numbers"
              name="numbers"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  numbers: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="numbers">Numbers</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="symbols"
              name="symbols"
              onCheckedChange={(checked) => {
                setUrlParams((prev) => ({
                  ...prev,
                  symbols: checked as boolean,
                }))
              }}
            />
            <Label htmlFor="symbols">Symbols</Label>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="generated_password">Senha gerada</Label>
          <div className="flex gap-2">
            <div className="min-h-9 flex-1 font-mono border border-border px-3 py-1 flex items-center text-xl rounded-md">
              {isSuccess ? (
                <p className="break-all">{generatedPassword.password}</p>
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

        <Button className="w-full" isPending={isFetching}>
          Generate password
        </Button>
      </form>

      <div>
        <h2 className="text-lg font-medium mb-2">How it works</h2>

        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>
            The password is generated on the server and is not stored anywhere.
          </li>
          <li>
            The password generator creates a random password based on the
            selected options.
          </li>
          <li>
            The password will have at least 4 characters (1 lowercase letter, 1
            uppercase letter, 1 number, and 1 symbol).
          </li>
          <li>
            There will always be one lowercase letter, one uppercase letter, one
            number, and one symbol if the options are selected.
          </li>
          <li>
            By default, the password contains only lowercase letters if no
            additional options are selected.
          </li>
          <li>
            You can copy the generated password by clicking the copy icon next
            to it.
          </li>
        </ul>
      </div>
    </div>
  )
}
