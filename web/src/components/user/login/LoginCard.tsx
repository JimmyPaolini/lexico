import React from 'react'

import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CardHeader from '../../accessories/CardHeader'
import BasicLogin from './BasicLoginForm'
import OAuthLogin from './OAuthLogin'

export default function LoginCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader title="Sign In" className={classes.cardHeader} />
      <Typography align="center" variant="body2" color="textSecondary">
        Save your Bookmarks, Literature,
      </Typography>
      <Typography
        align="center"
        variant="body2"
        color="textSecondary"
        gutterBottom
      >
        and Settings across devices
      </Typography>
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
  cardHeader: {
    paddingBottom: 0,
    minHeight: 64,
  },
  columnItem: {
    marginBottom: theme.spacing(2),
  },
}))
