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
import CardHeader from "../accessories/CardHeader"
import SubmitButton from "../accessories/SubmitButton"
import { Context } from "../Context"
import SettingsForm from "./SettingsForm"

export default function SettingsCard() {
  const classes = useStyles()
  const { user } = useContext(Context)
  const { refetch: logout } = useLogout()

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
              <SubmitButton name="Sign out" onClick={() => logout()} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grow>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    maxWidth: theme.custom.cardWidth,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
