import { useState } from 'react'

import type { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import { useGoogleAnalytics } from 'src/hooks/useGoogleAnalytics'
import { theme } from 'src/theme'
import { createEmotionCache } from 'src/theme/createEmotionCache'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'

import { Layout } from '../components/layout/Layout'
import { ContextProvider } from '../components/layout/LexicoContext'

export const clientEndpoint =
  process.env.NEXT_ENV === 'build'
    ? 'https://lexicolatin.com/api'
    : typeof window === 'undefined'
    ? 'http://localhost:3001/graphql'
    : window.location.origin + '/api'

const clientSideEmotionCache = createEmotionCache()

type Props = AppProps & {
  emotionCache?: EmotionCache
}
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: Props) {
  const [queryClient] = useState(() => new QueryClient())

  useGoogleAnalytics()

  return (
    <html lang="en">
      <body>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <ContextProvider queryClient={queryClient}>
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
        </CacheProvider>
      </body>
    </html>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const { id, name, label, value } = metric
  googleAnalyticsEvent(name, {
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
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