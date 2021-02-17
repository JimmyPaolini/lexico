import { Grid } from "@material-ui/core"
import React from "react"
import { useQuery } from "react-query"
import LoginCard from "../components/settings/LoginCard"
import SettingsCard from "../components/settings/SettingsCard"
import userQuery from "../graphql/authentication/user.gql"
import { graphQLClient } from "./_app"

export default function Settings() {
  const { data: user, isSuccess } = useQuery(
    "user",
    async () => {
      const { user: data } = await graphQLClient.request(userQuery)
      return data
    },
    { retryDelay: 0 },
  )
  console.log("user", user)

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        {isSuccess ? (
          <SettingsCard />
        ) : (
          <LoginCard title="login to access settings" />
        )}
      </Grid>
    </Grid>
  )
}
