'use client'

import { useId } from 'react'
import { cn } from '@/lib/utils'

interface SegmentedControlProps<T extends string> {
  label: string
  value: T
  onChange: (value: T) => void
  options: readonly { value: T; label: string }[]
}

/** A row of mutually exclusive buttons, backed by native radio inputs. */
export function SegmentedControl<T extends string>({
  label,
  value,
  onChange,
  options,
}: SegmentedControlProps<T>) {
  const name = useId()

  return (
    <fieldset>
      <legend className="mb-2 text-sm leading-none font-medium">{label}</legend>
      <div className="inline-flex h-9 rounded-md border p-0.5">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-center rounded px-3 text-sm transition-colors has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50',
              value === option.value
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
