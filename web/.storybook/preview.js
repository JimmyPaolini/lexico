import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { SnackbarProvider } from "notistack"
import { QueryClient, QueryClientProvider } from "react-query"
import { ContextProvider } from "../src/components/layout/Context"
import theme from "../src/theme/theme"

export const parameters = {
  actions: { argTypesRegex: "^(on|set|handle)[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "Lexico",
    values: [
      {
        name: "Lexico",
        value: "#66023C",
      },
      {
        name: "Paper",
        value: "#424242",
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
          <SnackbarProvider style={{ display: "none" }}>
            <Story />
          </SnackbarProvider>
        </ContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  ),
]
