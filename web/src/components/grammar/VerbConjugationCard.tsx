import { useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  useTheme,
} from '@mui/material'

import { VerbFormsTable } from '../Entry/Forms/PartsOfSpeech/VerbFormsTable'
import { PrincipalParts } from '../Entry/PrincipalParts/PrincipalParts'
import verbConjugations from './verbConjugations'

type Props = {
  conjugation: typeof verbConjugations[0]
  expandedInitial?: boolean
}

export const VerbConjugationCard = ({
  conjugation,
  expandedInitial = false,
}: Props) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card sx={{ ...theme.custom.card }}>
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
