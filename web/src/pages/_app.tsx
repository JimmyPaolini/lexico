import {
  CssBaseline,
  ServerStyleSheets,
  ThemeProvider,
} from "@material-ui/core"
import { GraphQLClient } from "graphql-request"
import type { AppProps } from "next/app"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ContextProvider } from "../components/Context"
import Layout from "../components/Layout"
import theme from "../theme"

export const endpoint = "http://localhost:3001/graphql"
export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
  mode: "cors",
})

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const sheets = new ServerStyleSheets()
  return sheets.collect(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ContextProvider>
      </QueryClientProvider>
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
