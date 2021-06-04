import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useContext } from "react"
import { Context } from "../../components/Context"
import LoginCard from "../../components/user/LoginCard"
import SettingsCard from "../../components/user/SettingsCard"

export default function User() {
  const classes = useStyles()
  const { user } = useContext(Context)

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.card}>
        {!!user ? (
          <SettingsCard />
        ) : (
          <LoginCard title="sign in to use settings" />
        )}
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    width: theme.custom.cardWidth,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))
