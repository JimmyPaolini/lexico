import { Grid, Typography } from "@material-ui/core"
import React from "react"
import { useQuery } from "react-query"
import Login from "../components/login/LoginCard"
import userQuery from "../graphql/user.gql"
import { graphQLClient } from "./_app"

export default function Settings() {
  const { data: user } = useUser()

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        {!!user ? (
          <Typography>Hello user {user.id}</Typography>
        ) : (
          <Login title="login to access settings" />
        )}
      </Grid>
    </Grid>
  )
}

const useUser = () =>
  useQuery("user", async () => {
    const { user: data } = await graphQLClient.request(userQuery)
    return data
  })
