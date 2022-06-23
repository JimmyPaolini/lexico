import React from 'react'

import { Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import CardHeader from '../components/accessories/CardHeader'
import SubmitButton from '../components/accessories/SubmitButton'
import SingleCardLayout from '../components/layout/SingleCardLayout'

export default function Error500() {
  const theme = useTheme()
  return (
    <SingleCardLayout>
      <Card
        sx={{
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(1),
        }}
      >
        <CardHeader title="Error: Server Issue" />
        <CardContent>
          <SubmitButton name="Return to Homepage" href="/search" />
        </CardContent>
      </Card>
    </SingleCardLayout>
  )
}
