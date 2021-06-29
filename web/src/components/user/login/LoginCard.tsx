import { Card, CardContent, Divider, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"
import CardHeader from "../../accessories/CardHeader"
import BasicLogin from "./BasicLoginForm"
import OAuthLogin from "./OAuthLogin"

export default function LoginCard(): JSX.Element {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader title="Sign In to Save Bookmarks & Settings" />
      <Divider variant="middle" />
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item className={classes.columnItem}>
            <OAuthLogin provider="google" />
          </Grid>
          <Grid item className={classes.columnItem}>
            <OAuthLogin provider="facebook" />
          </Grid>
        </Grid>
        <Divider className={classes.columnItem} />
        <BasicLogin />
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  columnItem: {
    marginBottom: theme.spacing(2),
  },
}))
