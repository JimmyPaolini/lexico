import {
  Card,
  CardContent,
  Divider,
  Grid,
  Grow,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useContext } from "react"
import useLogout from "../../hooks/authentication/useLogout"
import useUnregister from "../../hooks/authentication/useUnregister"
import CardHeader from "../accessories/CardHeader"
import SubmitButton from "../accessories/SubmitButton"
import { Context } from "../Context"
import SettingsForm from "./SettingsForm"

export default function SettingsCard() {
  const classes = useStyles()
  const { user } = useContext(Context)
  const { mutateAsync: logout } = useLogout()
  const { mutateAsync: unregister } = useUnregister()

  const confirmUnregister = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? All your bookmarks and settings will be lost.",
      )
    )
      await unregister()
  }

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader title="Settings" />
        <Divider variant="middle" />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography gutterBottom align="center">
                Signed in
                {user.googleId
                  ? " with Google "
                  : user.facebookId
                  ? " with Facebook "
                  : " with email/password "}
                as:
                <br />
                {user.email}
              </Typography>
            </Grid>
            <Grid item>
              <SettingsForm />
            </Grid>
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
          </Grid>
        </CardContent>
      </Card>
    </Grow>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  unregister: {
    "backgroundColor": theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}))
