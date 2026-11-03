import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Locale-aware replacements for next/link and next/navigation: links get the
// locale prefix, and usePathname returns the path without it
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
