'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useId, useState } from 'react'
import { SegmentedControl } from '@/components/segmented-control'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/** Select value that leaves the option out of the request, e.g. "any state" */
export const ANY = 'any'

type Choices = { value: string; label: string }[]

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
      choices: Choices
    }
  | {
      type: 'select'
      name: string
      label: string
      defaultValue: string
      choices: Choices
    }
) & {
  /** Shows the option (and sends it) only while another option has a value */
  showWhen?: { name: string; value: string | number | boolean }
}

type OptionValue = string | number | boolean

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}

/**
 * Keeps the value of each option and serializes the visible ones into
 * `paramsKey`, the query parameters to send, as a JSON string.
 */
export function useGeneratorOptions(options: GeneratorOption[]) {
  const [values, setValues] = useState<Record<string, OptionValue>>(() =>
    Object.fromEntries(
      options.map((option) => [option.name, option.defaultValue])
    )
  )
  const visibleOptions = options.filter(
    ({ showWhen }) => !showWhen || values[showWhen.name] === showWhen.value
  )
  // Serialized so the debounce compares values, not a new object per render;
  // without the debounce, dragging the length slider fires a request per step
  const paramsKey = useDebouncedValue(
    JSON.stringify(
      Object.fromEntries(
        visibleOptions
          .filter((option) => values[option.name] !== ANY)
          .map((option) => [option.name, values[option.name]])
      )
    ),
    250
  )

  function setOption(name: string, value: OptionValue) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  return { values, setOption, visibleOptions, paramsKey }
}

interface GeneratorOptionsProps {
  options: GeneratorOption[]
  values: Record<string, OptionValue>
  onChange: (name: string, value: OptionValue) => void
}

/**
 * The option controls of a generator. Toggles and selects come first, next to
 * whatever the parent puts before them; checkboxes and sliders go under
 * "Options". Meant to sit in a flex row where every header is a leading-none
 * text-sm label followed by an 8px gap, so the controls line up.
 */
export function GeneratorOptions({
  options,
  values,
  onChange,
}: GeneratorOptionsProps) {
  const t = useTranslations('generator')
  const id = useId()
  const settings = options.filter(
    (option) => option.type === 'boolean' || option.type === 'range'
  )

  return (
    <>
      {options.map((option) =>
        option.type === 'toggle' ? (
          <SegmentedControl
            key={option.name}
            label={option.label}
            value={String(values[option.name])}
            onChange={(value) => onChange(option.name, value)}
            options={option.choices}
          />
        ) : option.type === 'select' ? (
          <div key={option.name} className="flex flex-col gap-2">
            <Label htmlFor={`${id}-${option.name}`}>{option.label}</Label>
            <Select
              value={String(values[option.name])}
              onValueChange={(value) => onChange(option.name, value)}
            >
              <SelectTrigger id={`${id}-${option.name}`} className="w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {option.choices.map((choice) => (
                  <SelectItem key={choice.value} value={choice.value}>
                    {choice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null
      )}

      {settings.length > 0 && (
        <fieldset className="min-w-56 flex-1">
          <legend className="mb-2 text-sm leading-none font-medium">
            {t('options')}
          </legend>

          <div className="space-y-3">
            {settings.map((option) =>
              option.type === 'boolean' ? (
                <div key={option.name} className="flex items-center gap-2">
                  <Checkbox
                    id={`${id}-${option.name}`}
                    checked={Boolean(values[option.name])}
                    onCheckedChange={(checked) =>
                      onChange(option.name, checked === true)
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
                      {values[option.name]}
                    </span>
                  </Label>
                  <input
                    type="range"
                    id={`${id}-${option.name}`}
                    min={option.min}
                    max={option.max}
                    value={Number(values[option.name])}
                    onChange={(event) =>
                      onChange(option.name, Number(event.target.value))
                    }
                    className="w-full max-w-xs accent-primary"
                  />
                </div>
              ) : null
            )}
          </div>
        </fieldset>
      )}
    </>
  )
}
