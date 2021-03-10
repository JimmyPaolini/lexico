import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { GraphQLClient } from "graphql-request"
import type { AppProps } from "next/app"
import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ContextProvider } from "../components/Context"
import Layout from "../components/Layout"
import theme from "../theme/theme"

// const SERVER_HOST =
//   process.env.NODE_ENV === "production" ? "server" : "localhost"
export const endpoint = `http://localhost:3001/graphql`
export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
  mode: "cors",
  keepalive: true,
})

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) jssStyles.parentElement!.removeChild(jssStyles)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContextProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
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
