import { print } from 'graphql'
import { rawRequest } from 'graphql-request'
import { GetServerSideProps } from 'next'

import facebookQuery from '../graphql/user/login/facebook.graphql'
import { googleAnalyticsEvent } from '../utils/googleAnalytics'
import { serverEndpoint } from './api'

export default function facebook() {
  googleAnalyticsEvent('login', {
    category: 'user',
    label: 'oauth',
    value: 'facebook',
  })
  return <></>
}
export const getServerSideProps: GetServerSideProps = async ({
  query: { code },
  res,
}) => {
  const { headers, errors } = await rawRequest(
    serverEndpoint,
    print(facebookQuery),
    { code },
  )
  const cookieHeader = headers.get('set-cookie')
  if (!errors && cookieHeader) res.setHeader('set-cookie', cookieHeader)

  res.writeHead(302, { Location: '/user' })
  res.end()
  return { props: {} }
}
