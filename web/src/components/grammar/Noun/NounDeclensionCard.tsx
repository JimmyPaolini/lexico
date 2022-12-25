import { useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { NounFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/NounFormsTable'
import { PrincipalParts } from 'src/components/Entry/PrincipalParts/PrincipalParts'

import { nounDeclensions } from './nounDeclensions'

type Props = {
  declension: typeof nounDeclensions[0]
  expandedInitial: boolean
}

export const NounDeclensionCard = ({
  declension,
  expandedInitial = false,
}: Props) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
      >
        <PrincipalParts {...{ ...declension, expanded }} />
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
          <Typography align="center" sx={{ margin: theme.spacing(2) }}>
            {declension.info}
          </Typography>
          <Divider variant="middle" />
          <NounFormsTable {...declension} />
        </CardContent>
      </Collapse>
    </Card>
  )
}
