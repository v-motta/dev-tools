import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  /** Referenced by the section's aria-labelledby */
  id: string
  icon: LucideIcon
  children: ReactNode
  className?: string
}

export function SectionHeading({
  id,
  icon: Icon,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={cn('flex items-center gap-2 text-lg font-semibold', className)}
    >
      <Icon className="size-5 text-primary" aria-hidden />
      {children}
    </h2>
  )
}
