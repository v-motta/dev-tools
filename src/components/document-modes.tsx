'use client'

import { type ReactNode, useState } from 'react'
import { SegmentedControl } from '@/components/segmented-control'

const MODES = [
  { value: 'generate', label: 'Gerar' },
  { value: 'validate', label: 'Validar' },
] as const

type Mode = (typeof MODES)[number]['value']

interface DocumentModesProps {
  generate: ReactNode
  validate: ReactNode
}

/** Switches a document page between its generator and its validator. */
export function DocumentModes({ generate, validate }: DocumentModesProps) {
  const [mode, setMode] = useState<Mode>('generate')

  return (
    <div className="space-y-8">
      <SegmentedControl
        label="O que você quer fazer?"
        value={mode}
        onChange={setMode}
        options={MODES}
      />

      {/* Both stay mounted so switching keeps the generated values and the
          typed document */}
      <div hidden={mode !== 'generate'} className="space-y-8">
        {generate}
      </div>
      <div hidden={mode !== 'validate'} className="space-y-8">
        {validate}
      </div>
    </div>
  )
}
