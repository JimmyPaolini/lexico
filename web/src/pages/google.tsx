import { rawRequest } from 'graphql-request'
import { GetServerSideProps } from 'next'

import { GoogleDocument } from 'src/graphql/generated'
import { googleAnalyticsEvent } from 'src/utils/googleAnalytics'

import { serverEndpoint } from './api'

export default function google() {
  googleAnalyticsEvent('login', {
    category: 'user',
    label: 'oauth',
    value: 'google',
  })
  return <></>
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { code },
  res,
}) => {
  const { headers, errors } = await rawRequest(serverEndpoint, GoogleDocument, {
    code,
  })
  const cookieHeader = headers.get('set-cookie')
  if (!errors && cookieHeader) res.setHeader('set-cookie', cookieHeader)

  res.writeHead(302, { Location: '/settings' })
  res.end()
  return { props: {} }
}
