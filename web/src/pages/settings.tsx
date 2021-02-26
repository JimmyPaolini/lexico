import { Grid } from "@material-ui/core"
import React, { useContext } from "react"
import { Context } from "../components/Context"
import LoginCard from "../components/settings/LoginCard"
import SettingsCard from "../components/settings/SettingsCard"

export default function Settings() {
  const { user } = useContext(Context)

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        {!!user ? (
          <SettingsCard />
        ) : (
          <LoginCard title="login to access settings" />
        )}
      </Grid>
    </Grid>
  )
}
