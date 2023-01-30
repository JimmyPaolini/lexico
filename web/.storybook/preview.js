import { RouterContext } from 'next/dist/shared/lib/router-context'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, Grid, ThemeProvider } from '@mui/material'

import { QueryClient, QueryClientProvider } from 'react-query'

import { LexicoContextProvider } from 'src/components/layout/LexicoContext'
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
  nextRouter: { Provider: RouterContext.Provider },
}

export const decorators = [
  (Story) => (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <LexicoContextProvider>
            <SnackbarProvider>
              <CssBaseline />
              <Grid
                container
                justifyContent="center"
                sx={{ minWidth: '500px' }}
              >
                <Story />
              </Grid>
            </SnackbarProvider>
          </LexicoContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  ),
]
