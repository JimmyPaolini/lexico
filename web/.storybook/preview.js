import { RouterContext } from 'next/dist/shared/lib/router-context'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ContextProvider } from 'src/components/layout/Context'
import { SnackbarProvider } from 'src/components/layout/SnackbarProvider'
import { createEmotionCache, theme } from 'src/theme'

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^(on|set|handle)[A-Z].*' },
  backgrounds: {
    values: [
      { name: 'Lexico', value: theme.palette.primary.main },
      { name: 'Paper', value: theme.palette.background.paper },
    ],
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [
  (Story) => (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <ContextProvider>
            <SnackbarProvider>
              <CssBaseline />
              <Story />
            </SnackbarProvider>
          </ContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  ),
]
