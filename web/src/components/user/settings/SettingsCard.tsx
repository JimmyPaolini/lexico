import { Card, CardContent, Divider, Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import React, { useContext } from "react"
import useLogout from "../../../hooks/authentication/useLogout"
import useUnregister from "../../../hooks/authentication/useUnregister"
import CardHeader from "../../accessories/CardHeader"
import SubmitButton from "../../accessories/SubmitButton"
import { Context } from "../../layout/Context"
import { Identity } from "./Identity"
import SettingsForm from "./SettingsForm"

export default function SettingsCard(): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)

  const { mutateAsync: logout } = useLogout()
  const { mutateAsync: unregister } = useUnregister()

  const confirmUnregister = async () => {
    const unregisterDialog =
      "Are you sure you want to delete your account? All your bookmarks and settings will be lost."
    if (window.confirm(unregisterDialog)) await unregister()
  }

  return (
    <Card className={classes.card}>
      <CardHeader title="Settings" />
      <Divider variant="middle" />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Identity />
          </Grid>
          <Grid item>
            <SettingsForm />
          </Grid>
          {user ? (
            <>
              <Grid item>
                <SubmitButton name="Sign Out" onClick={() => logout()} />
              </Grid>
              <Grid item>
                <SubmitButton
                  name="Delete Account"
                  className={classes.unregister}
                  onClick={confirmUnregister}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  unregister: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))
