import { Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { IncomingHttpHeaders } from "http2"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { useContext, useEffect } from "react"
import { QueryClient } from "react-query"
import { dehydrate } from "react-query/hydration"
import CardDeck from "../components/accessories/CardDeck"
import { Context } from "../components/layout/Context"
import SingleCardLayout from "../components/layout/SingleCardLayout"
import LoginCard from "../components/user/login/LoginCard"
import SettingsCard from "../components/user/settings/SettingsCard"
import { UserDocument, useUserQuery } from "../graphql/generated"
import useSnackbarEnhanced from "../hooks/useSnackbarEnhanced"
import { showSettingsInstructions } from "../utils/settingsLocal"
import { serverEndpoint } from "./api"

export default function User(): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)
  const { enqueueSnackbar } = useSnackbarEnhanced()
  useEffect(() => {
    if (!user && showSettingsInstructions()) {
      enqueueSnackbar(
        `Your settings are saved locally, sign in to save them across devices/browsers`,
        { autoHideDuration: 10000 },
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Lexico - User</title>
      </Head>
      {!user ? (
        <Grid container justifyContent="center" className={classes.noUser}>
          <CardDeck
            cards={[
              {
                key: "LoginCard",
                Card: <LoginCard />,
              },
              {
                key: "SettingsCard",
                Card: <SettingsCard />,
              },
            ]}
          />
        </Grid>
      ) : (
        <SingleCardLayout>
          <SettingsCard />
        </SingleCardLayout>
      )}
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
    { staleTime: 1000 * 60 * 5 }, // 5 minutes
  )
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

const getUserFetcher = (headers: IncomingHttpHeaders) => async () => {
  const res = await fetch(serverEndpoint as string, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: {
      "content-type": "application/json",
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

const useStyles = makeStyles((theme: Theme) => ({
  noUser: {
    marginTop: theme.spacing(4),
  },
}))
