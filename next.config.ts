import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // Pages of tools that moved; keep in sync with MOVED_TOOL_URLS in tools.ts
  async redirects() {
    return [
      {
        source: '/brazil/fake-data/person',
        destination: '/development/generators/person',
        permanent: true,
      },
      {
        source: '/:locale/brazil/fake-data/person',
        destination: '/:locale/development/generators/person',
        permanent: true,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
