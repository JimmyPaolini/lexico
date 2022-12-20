/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-new */
import React from 'react'

import createEmotionServer from '@emotion/server/create-instance'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import { theme } from 'src/theme'
import { createEmotionCache } from 'src/theme/createEmotionCache'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="lexico" content="latin translation assistant" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta charSet="utf-8" />
          <link rel="icon" href="/icon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="icon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="icon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="icon/favicon-16x16.png"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${String(
              process.env.GOOGLE_ANALYTICS_ID,
            )}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${String(process.env.GOOGLE_ANALYTICS_ID)}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body id="body">
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// You can find a benchmark of the available CSS minifiers under
// https://github.com/GoalSmashers/css-minification-benchmark
// We have found that clean-css is faster than cssnano but the output is larger.
// Waiting for https://github.com/cssinjs/jss/issues/279
// 4% slower but 12% smaller output than doing it in a single step.
//
// It's using .browserslistrc
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  const postcss = require('postcss')
  const autoprefixer = require('autoprefixer')
  const CleanCSS = require('clean-css')
  /* eslint-enable global-require */

  postcss([autoprefixer])
  new CleanCSS()
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)

  // Generate style tags for the styles coming from Emotion
  // This is important. It prevents Emotion from rendering invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    styles: [
      ...emotionStyleTags,
      ...React.Children.toArray(initialProps.styles),
    ],
  }
}
