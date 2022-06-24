import { CssBaseline, ThemeProvider } from '@mui/material'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ContextProvider } from '../src/components/layout/Context'
import SnackbarProvider from '../src/components/layout/Snackbar'
import theme from '../src/theme'

export const parameters = {
  actions: { argTypesRegex: '^(on|set|handle)[A-Z].*' },
  layout: 'centered',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    values: [
      {
        name: 'Lexico',
        value: theme.palette.primary.main,
      },
      {
        name: 'Paper',
        value: theme.palette.background.paper,
      },
    ],
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={new QueryClient()}>
        <ContextProvider>
          <CssBaseline />
          <SnackbarProvider>
            <Story />
          </SnackbarProvider>
        </ContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ),
]
