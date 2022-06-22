import React from 'react'

import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CardHeader from '../components/accessories/CardHeader'
import SubmitButton from '../components/accessories/SubmitButton'
import SingleCardLayout from '../components/layout/SingleCardLayout'
import { LexicoTheme } from '../theme'

export default function Error404() {
  const classes = useStyles()

  return (
    <SingleCardLayout>
      <Card className={classes.card}>
        <CardHeader title="Error: Not Found" />
        <CardContent>
          <SubmitButton name="Return to Homepage" href="/search" />
        </CardContent>
      </Card>
    </SingleCardLayout>
  )
}

const useStyles = makeStyles((theme: LexicoTheme) => ({
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))
