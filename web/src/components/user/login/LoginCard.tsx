import React from 'react'

import { Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import CardHeader from '../../accessories/CardHeader'
import BasicLogin from './BasicLoginForm'
import OAuthLogin from './OAuthLogin'

const PREFIX = 'LoginCard'

const classes = {
  card: `${PREFIX}-card`,
  cardHeader: `${PREFIX}-cardHeader`,
  columnItem: `${PREFIX}-columnItem`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  [`& .${classes.cardHeader}`]: {
    paddingBottom: 0,
    minHeight: 64,
  },

  [`& .${classes.columnItem}`]: {
    marginBottom: theme.spacing(2),
  },
}))

export default function LoginCard() {
  return (
    <StyledCard className={classes.card}>
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
    </StyledCard>
  )
}
