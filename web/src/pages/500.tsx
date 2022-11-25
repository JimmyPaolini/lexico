import React from 'react'

import { Card, CardContent } from '@mui/material'

import CardHeader from '../components/accessories/CardHeader'
import SubmitButton from '../components/accessories/SubmitButton'
import { SingleCardLayout } from '../components/layout/SingleCardLayout'

export default function Error500() {
  return (
    <SingleCardLayout>
      <Card>
        <CardHeader title="Error: Server Issue" />
        <CardContent>
          <SubmitButton name="Return to Homepage" href="/search" />
        </CardContent>
      </Card>
    </SingleCardLayout>
  )
}
