import {
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  Grow,
  Switch,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import useLogout from "../../hooks/authentication/useLogout"
import CardHeader from "../accessories/CardHeader"
import SubmitButton from "../accessories/SubmitButton"

export default function SettingsCard() {
  const classes = useStyles()
  const { refetch: logout } = useLogout()

  return (
    <Grow in={true}>
      <Card className={classes.card}>
        <CardHeader title="Settings" />
        <Divider variant="middle" />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={true}
                    onChange={() => null}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Primary"
              />
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
    margin: theme.spacing(2),
    width: theme.custom.cardWidth,
  },
  columnItem: {
    marginBottom: theme.spacing(2),
  },
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
