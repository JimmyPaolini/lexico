import Head from "next/head"
import React from "react"

const Header = () => (
  <Head>
    <title>Lexico</title>
    <meta name="lexico" content="latin translation assistant" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <link rel="icon" href="icon/favicon.ico" />
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
  </Head>
)

export default Header
