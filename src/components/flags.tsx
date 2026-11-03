import type { SVGProps } from 'react'
import type { Locale } from '@/i18n/routing'

// Inline SVGs instead of emoji, since Windows shows flag emoji as two letters.
// Simplified to stay legible at icon size. Pass `size-auto` inside buttons and
// menu items, which otherwise force every svg into a 16px square.

function BrazilFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden {...props}>
      <rect width="20" height="14" fill="#009c3b" />
      <path d="M10 1.6 18.2 7 10 12.4 1.8 7z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.1" fill="#002776" />
      <path
        d="M7.05 6.2a6.5 6.5 0 0 1 5.85 1.7"
        stroke="#fff"
        strokeWidth=".55"
        fill="none"
      />
    </svg>
  )
}

function GermanyFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden {...props}>
      <rect width="20" height="14" fill="#ffce00" />
      <rect width="20" height="9.33" fill="#dd0000" />
      <rect width="20" height="4.67" fill="#000" />
    </svg>
  )
}

function UnitedStatesFlag(props: SVGProps<SVGSVGElement>) {
  // 7 red stripes over a white background give the 13 stripes
  const redStripes = Array.from({ length: 7 }, (_, index) => index * 2)

  return (
    <svg viewBox="0 0 20 14" width="20" height="14" aria-hidden {...props}>
      <rect width="20" height="14" fill="#fff" />
      {redStripes.map((stripe) => (
        <rect
          key={stripe}
          y={(stripe * 14) / 13}
          width="20"
          height={14 / 13}
          fill="#b22234"
        />
      ))}
      <rect width="8" height={(7 * 14) / 13} fill="#3c3b6e" />
    </svg>
  )
}

export const LOCALE_FLAGS: Record<
  Locale,
  (props: SVGProps<SVGSVGElement>) => React.JSX.Element
> = {
  'pt-BR': BrazilFlag,
  'de-DE': GermanyFlag,
  'en-US': UnitedStatesFlag,
}
