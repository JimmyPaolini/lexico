import React from 'react'

import { theme } from 'src/theme'

export default function Head() {
  return (
    <>
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
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                  page_path: window.location.pathname,
                });
              `,
        }}
      />
      {/* Inject MUI styles first to match with the prepend: true configuration. */}
      {/* {(this.props as any).emotionStyleTags} */}
    </>
  )
}
