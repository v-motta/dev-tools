'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { CopyButton } from '@/components/copy-button'
import { SegmentedControl } from '@/components/segmented-control'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type GeneratorOption = (
  | { type: 'boolean'; name: string; label: string; defaultValue: boolean }
  | {
      type: 'range'
      name: string
      label: string
      defaultValue: number
      min: number
      max: number
    }
  | {
      type: 'toggle'
      name: string
      label: string
      defaultValue: string
      choices: { value: string; label: string }[]
    }
) & {
  /** Shows the option (and sends it) only while another option has a value */
  showWhen?: { name: string; value: string | number | boolean }
}

interface GeneratorProps {
  /** Name of the generated value, e.g. "CPF" or "senha" */
  name: string
  /** Output labels, e.g. "CPF gerado"/"CPFs gerados" (Portuguese inflects them) */
  label: string
  pluralLabel: string
  /** API route that responds with `{ [field + 's']: string[] }` */
  endpoint: string
  field: string
  options?: GeneratorOption[]
}

const QUANTITIES = [1, 5, 10, 25, 50]
const HISTORY_SIZE = 10

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}

export function Generator({
  name,
  label,
  pluralLabel,
  endpoint,
  field,
  options = [],
}: GeneratorProps) {
  const id = useId()
  const [quantity, setQuantity] = useState(1)
  const [optionValues, setOptionValues] = useState(() =>
    Object.fromEntries(
      options.map((option) => [option.name, option.defaultValue])
    )
  )
  const visibleOptions = options.filter(
    ({ showWhen }) =>
      !showWhen || optionValues[showWhen.name] === showWhen.value
  )
  // Serialized so the debounce compares values, not a new object per render;
  // without the debounce, dragging the length slider fires a request per step
  const paramsKey = useDebouncedValue(
    JSON.stringify(
      Object.fromEntries(
        visibleOptions.map((option) => [option.name, optionValues[option.name]])
      )
    ),
    250
  )
  const [history, setHistory] = useState<string[]>([])

  const { data, isError, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['generator', endpoint, quantity, paramsKey],
    queryFn: async () => {
      const params: Record<string, string | number | boolean> =
        JSON.parse(paramsKey)
      const response = await ky
        .get(endpoint, { searchParams: { quantity, ...params } })
        .json<Record<string, string[]>>()
      const values = response[`${field}s`]

      setHistory((previous) => [...values, ...previous].slice(0, 50))
      return values
    },
    // Every visit should show a new value instead of the cached one
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    // Keeps the current values on screen while new options are fetched
    placeholderData: keepPreviousData,
  })

  // The newest values are on screen, so the history starts after them
  const previousValues = isSuccess
    ? history.slice(data.length, data.length + HISTORY_SIZE)
    : []

  function setOption(name: string, value: string | number | boolean) {
    setOptionValues((values) => ({ ...values, [name]: value }))
  }

  // Toggles sit next to the quantity; checkboxes and sliders go under "Opções"
  const toggles = visibleOptions.filter((option) => option.type === 'toggle')
  const settings = visibleOptions.filter((option) => option.type !== 'toggle')

  return (
    <div className="flex flex-col gap-y-6">
      {/* Every header in this row is a leading-none text-sm label followed by
          an 8px gap, so the controls line up */}
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${id}-quantity`}>Quantidade</Label>
          <Select
            value={String(quantity)}
            onValueChange={(value) => setQuantity(Number(value))}
          >
            <SelectTrigger id={`${id}-quantity`} className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUANTITIES.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {toggles.map(
          (option) =>
            option.type === 'toggle' && (
              <SegmentedControl
                key={option.name}
                label={option.label}
                value={String(optionValues[option.name])}
                onChange={(value) => setOption(option.name, value)}
                options={option.choices}
              />
            )
        )}

        {settings.length > 0 && (
          <fieldset className="min-w-56 flex-1">
            <legend className="mb-2 text-sm leading-none font-medium">
              Opções
            </legend>

            <div className="space-y-3">
              {settings.map((option) =>
                option.type === 'boolean' ? (
                  <div key={option.name} className="flex items-center gap-2">
                    <Checkbox
                      id={`${id}-${option.name}`}
                      checked={Boolean(optionValues[option.name])}
                      onCheckedChange={(checked) =>
                        setOption(option.name, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`${id}-${option.name}`}
                      className="font-normal"
                    >
                      {option.label}
                    </Label>
                  </div>
                ) : option.type === 'range' ? (
                  <div key={option.name} className="space-y-2">
                    <Label
                      htmlFor={`${id}-${option.name}`}
                      className="font-normal"
                    >
                      {option.label}:{' '}
                      <span className="font-mono font-medium">
                        {optionValues[option.name]}
                      </span>
                    </Label>
                    <input
                      type="range"
                      id={`${id}-${option.name}`}
                      min={option.min}
                      max={option.max}
                      value={Number(optionValues[option.name])}
                      onChange={(event) =>
                        setOption(option.name, Number(event.target.value))
                      }
                      className="w-full max-w-xs accent-primary"
                    />
                  </div>
                ) : null
              )}
            </div>
          </fieldset>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor={id}>{quantity > 1 ? pluralLabel : label}</Label>

        <div className="flex items-start gap-2">
          <output
            id={id}
            aria-busy={isFetching}
            className="min-h-9 flex-1 font-mono border border-border px-3 py-1 flex items-center text-xl rounded-md dark:bg-input/30"
          >
            {isSuccess && data.length === 1 ? (
              <p className="break-all">{data[0]}</p>
            ) : isSuccess ? (
              <ul className="w-full divide-y text-base">
                {data.map((value, index) => (
                  <li
                    key={value}
                    className="flex items-center justify-between gap-2 py-1"
                  >
                    <span className="break-all">{value}</span>
                    <CopyButton
                      value={value}
                      label={`Copiar ${name} ${index + 1}`}
                      className="size-7 border-0 shadow-none"
                    />
                  </li>
                ))}
              </ul>
            ) : isError && !isFetching ? (
              <p className="text-base font-sans text-red-500">
                Não foi possível gerar. Tente novamente.
              </p>
            ) : (
              <LoaderCircle
                className="animate-spin text-muted-foreground"
                aria-label="Gerando"
              />
            )}
          </output>

          {isSuccess && (
            <CopyButton
              value={data.join('\n')}
              label={data.length > 1 ? 'Copiar todos' : `Copiar ${name}`}
              showText
            />
          )}
        </div>
      </div>

      <Button
        className="w-full"
        disabled={isFetching}
        onClick={() => refetch()}
      >
        {isFetching ? (
          <LoaderCircle className="animate-spin" aria-label="Gerando" />
        ) : isError ? (
          'Tentar novamente'
        ) : (
          `Gerar ${name}`
        )}
      </Button>

      {previousValues.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Gerados anteriormente</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setHistory(isSuccess ? data : [])}
            >
              Limpar
            </Button>
          </div>

          <ul className="divide-y rounded-md border font-mono text-sm">
            {previousValues.map((value, index) => (
              <li
                key={value}
                className="flex items-center justify-between gap-2 px-3 py-1"
              >
                <span className="break-all text-muted-foreground">{value}</span>
                <CopyButton
                  value={value}
                  label={`Copiar ${name} anterior ${index + 1}`}
                  className="size-7 border-0 shadow-none"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
