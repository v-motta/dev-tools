'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { LoaderCircle } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import {
  type GeneratorOption,
  GeneratorOptions,
  useGeneratorOptions,
} from '@/components/generator-options'
import { type RecordField, RecordList } from '@/components/record-list'
import { Button } from '@/components/ui/button'

interface RecordGeneratorProps {
  /** Button text, e.g. "Gerar pessoa" */
  buttonLabel: string
  /** API route that responds with `{ [field]: { ... } }` */
  endpoint: string
  field: string
  fields: RecordField[]
  options?: GeneratorOption[]
}

/**
 * Generates one record with several fields (a person, a company, a card)
 * and shows each field with its own copy button.
 */
export function RecordGenerator({
  buttonLabel,
  endpoint,
  field,
  fields,
  options = [],
}: RecordGeneratorProps) {
  const { values, setOption, visibleOptions, paramsKey } =
    useGeneratorOptions(options)

  const { data, isError, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['record-generator', endpoint, paramsKey],
    queryFn: async () => {
      const params: Record<string, string | number | boolean> =
        JSON.parse(paramsKey)
      const response = await ky
        .get(endpoint, { searchParams: params })
        .json<Record<string, Record<string, unknown>>>()

      return response[field]
    },
    // Every visit should show a new record instead of the cached one
    staleTime: 0,
    gcTime: 0,
    retry: 1,
    placeholderData: keepPreviousData,
  })

  return (
    <div className="flex flex-col gap-y-6">
      {visibleOptions.length > 0 && (
        <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
          <GeneratorOptions
            options={visibleOptions}
            values={values}
            onChange={setOption}
          />
        </div>
      )}

      <div aria-busy={isFetching} aria-live="polite">
        {isSuccess ? (
          <RecordList fields={fields} record={data} />
        ) : isError && !isFetching ? (
          <p className="rounded-md border px-3 py-2 text-red-500">
            Não foi possível gerar. Tente novamente.
          </p>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-md border">
            <LoaderCircle
              className="animate-spin text-muted-foreground"
              aria-label="Gerando"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={isFetching}
          onClick={() => refetch()}
        >
          {isFetching ? (
            <LoaderCircle className="animate-spin" aria-label="Gerando" />
          ) : isError ? (
            'Tentar novamente'
          ) : (
            buttonLabel
          )}
        </Button>

        {isSuccess && (
          <CopyButton
            value={JSON.stringify(data, null, 2)}
            label="Copiar como JSON"
            text="Copiar JSON"
            showText
          />
        )}
      </div>
    </div>
  )
}
