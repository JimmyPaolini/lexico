import {
  CssBaseline,
  ServerStyleSheets,
  ThemeProvider,
} from "@material-ui/core"
import type { AppProps } from "next/app"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ContextProvider } from "../components/Context"
import Layout from "../components/Layout"
import theme from "../theme"

export const endpoint = "http://localhost:2048/graphql"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const sheets = new ServerStyleSheets()
  return sheets.collect(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ContextProvider>
    </ThemeProvider>,
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// App.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps: AppProps = await App.getInitialProps(appContext)

//   return { ...appProps }
// }
