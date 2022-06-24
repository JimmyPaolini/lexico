import React from 'react'

import { Card, CardContent } from '@mui/material'

import CardHeader from '../components/accessories/CardHeader'
import SubmitButton from '../components/accessories/SubmitButton'
import SingleCardLayout from '../components/layout/SingleCardLayout'

export default function Error404() {
  return (
    <SingleCardLayout>
      <Card>
        <CardHeader title="Error: Not Found" />
        <CardContent>
          <SubmitButton name="Return to Homepage" href="/search" />
        </CardContent>
      </Card>
    </SingleCardLayout>
  )
}
