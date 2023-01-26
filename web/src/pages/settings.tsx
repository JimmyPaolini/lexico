import { useEffect } from 'react'

import Head from 'next/head'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { IncomingHttpHeaders } from 'http2'
import { GetServerSideProps } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { shouldShowSettingsInstructions } from 'src/components/user/settings/settingsLocal'
import { UserDocument, useUserQuery } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'

import { Deck } from '../components/layout/Deck'
import { SingleCardLayout } from '../components/layout/SingleCardLayout'
import { LoginCard } from '../components/user/login/LoginCard'
import { SettingsCard } from '../components/user/settings/SettingsCard'
import { serverEndpoint } from './api'

export default function Settings() {
  const theme = useTheme()
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
    <div>
      <Head>
        <title>Lexico - Settings</title>
      </Head>
      {!user ? (
        <Grid
          container
          justifyContent="center"
          sx={{ marginTop: theme.spacing(4) }}
        >
          <Deck
            Cards={[
              <LoginCard key="LoginCard" />,
              <SettingsCard key="SettingsCard" />,
            ]}
          />
        </Grid>
      ) : (
        <SingleCardLayout>
          <SettingsCard />
        </SingleCardLayout>
      )}
    </div>
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
