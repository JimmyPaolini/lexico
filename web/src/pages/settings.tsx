import { Button, Card, Grid, Grow } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

export default function User() {
  const classes = useStyles()
  return (
    <Grid container justify="center" alignItems="center">
      <Grow in={true}>
        <Card className={classes.card}>
          <Button href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=profile&client_id=581175821772-acc3epk92kl7n8bna0m6md2p4gvtrfpa.apps.googleusercontent.com">
            Google Sign In
          </Button>
        </Card>
      </Grow>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    maxWidth: theme.custom.cardWidth * 2,
  },
}))
