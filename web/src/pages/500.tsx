import React from 'react'

import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'

import CardHeader from '../components/accessories/CardHeader'
import SubmitButton from '../components/accessories/SubmitButton'
import SingleCardLayout from '../components/layout/SingleCardLayout'

const PREFIX = '500'

const classes = {
  card: `${PREFIX}-card`,
}

const StyledSingleCardLayout = styled(SingleCardLayout)(({ theme }) => ({
  [`& .${classes.card}`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default function Error500() {
  return (
    <StyledSingleCardLayout>
      <Card className={classes.card}>
        <CardHeader title="Error: Server Issue" />
        <CardContent>
          <SubmitButton name="Return to Homepage" href="/search" />
        </CardContent>
      </Card>
    </StyledSingleCardLayout>
  )
}
