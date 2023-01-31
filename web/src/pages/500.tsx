import { Card, CardContent } from '@mui/material'

import { CardHeader } from '../components/accessories/CardHeader'
import { SubmitButton } from '../components/accessories/SubmitButton'
import { DeckLayout } from '../components/layout/DeckLayout'

export default function Error500() {
  return (
    <DeckLayout
      Cards={[
        <Card key="500">
          <CardHeader title="Error: Server Issue" />
          <CardContent>
            <SubmitButton name="Return to Homepage" href="/search" />
          </CardContent>
        </Card>,
      ]}
    />
  )
}
