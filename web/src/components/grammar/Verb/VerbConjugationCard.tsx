import { useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
} from '@mui/material'

import { VerbFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable'
import { PrincipalParts } from 'src/components/Entry/PrincipalParts/PrincipalParts'

import { verbConjugations } from './verbConjugations'

type Props = {
  conjugation: typeof verbConjugations[0]
  expandedInitial?: boolean
}

export const VerbConjugationCard = ({
  conjugation,
  expandedInitial = false,
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
      >
        <PrincipalParts {...{ ...conjugation, expanded }} />
      </CardActionArea>
      <Collapse in={expanded}>
        <CardContent
          sx={{
            padding: 0,
            '&:last-child': {
              padding: 0,
            },
          }}
        >
          <Divider variant="middle" />
          <VerbFormsTable {...conjugation} />
        </CardContent>
      </Collapse>
    </Card>
  )
}
