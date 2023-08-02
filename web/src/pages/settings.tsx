import { useEffect } from 'react'

import Head from 'next/head'

import { IncomingHttpHeaders } from 'http2'
import { GetServerSideProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { shouldShowSettingsInstructions } from 'src/components/user/settings/settingsLocal'
import { UserDocument, useUserQuery } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'

import { DeckLayout } from '../components/layout/DeckLayout'
import { SettingsCard } from '../components/user/settings/SettingsCard'
import { serverEndpoint } from './api'

export default function Settings() {
  const { user } = useLexicoContext()
  const enqueueSnackbar = useSnackbar()
  useEffect(() => {
    if (!user && shouldShowSettingsInstructions()) {
      enqueueSnackbar(
        'Your settings are saved locally, sign in to save them across devices/browsers'
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Lexico - Settings</title>
      </Head>
      <DeckLayout Cards={[<SettingsCard key="SettingsCard" />]} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
}) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    useUserQuery.getKey({}),
    getUserFetcher(headers),
    { staleTime: 1000 * 60 * 5 } // 5 minutes
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const getUserFetcher = (headers: IncomingHttpHeaders) => async () => {
  const res = await fetch(serverEndpoint, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      cookie: headers?.cookie,
    } as HeadersInit,
    body: JSON.stringify({ query: UserDocument, variables: {} }),
  })

  const json = await res.json()

  if (json.errors) {
    const { message } = json.errors[0]

    throw new Error(message)
  }

  return json.data
}
