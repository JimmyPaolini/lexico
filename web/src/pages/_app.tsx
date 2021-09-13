import { CssBaseline, ThemeProvider } from "@material-ui/core"
import type { AppProps, NextWebVitalsMetric } from "next/app"
import Head from "next/head"
import React, { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Hydrate } from "react-query/hydration"
import { ContextProvider } from "../components/layout/Context"
import Layout from "../components/layout/Layout"
import useGoogleAnalytics from "../hooks/useGoogleAnalytics"
import theme from "../theme/theme"
import { googleAnalyticsEvent } from "../utils/googleAnalytics"

export const clientEndpoint =
  process.env.NEXT_ENV === "build"
    ? "https://lexicolatin.com/api"
    : typeof window === "undefined"
    ? `http://localhost:3001/graphql`
    : window.location.origin + "/api"

export const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles)
  }, [])

  useGoogleAnalytics()

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContextProvider>
            <Head>
              <title>Lexico</title>
            </Head>
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

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const { id, name, label, value } = metric
  googleAnalyticsEvent(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    label: id,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    non_interaction: true,
  })
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
