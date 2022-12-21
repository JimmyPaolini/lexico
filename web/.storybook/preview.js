import { CssBaseline, ThemeProvider } from '@mui/material'

import { QueryClient, QueryClientProvider } from 'react-query'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';
import { ContextProvider } from 'src/components/layout/Context'
import { SnackbarProvider } from 'src/components/layout/SnackbarProvider'
import theme from 'src/theme'

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^(on|set|handle)[A-Z].*' },
  // backgrounds: {
  //   values: [
  //     { name: 'Lexico', value: theme.palette.primary.main },
  //     { name: 'Paper', value: theme.palette.background.paper },
  //   ],
  // },
}

export const decorators = [
  (Story) => (
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
  ),
]
