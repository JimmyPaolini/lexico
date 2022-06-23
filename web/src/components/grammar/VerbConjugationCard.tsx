import { forwardRef, useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import VerbForms from '../entry/FormsRow/PartsOfSpeech/VerbFormsTable'
import PrincipalPartsRow from '../entry/PrincipalPartsRow/PrincipalPartsRow'
import verbConjugations from './verbConjugations'

const PREFIX = 'VerbConjugationCard'

const classes = {
  card: `${PREFIX}-card`,
  action: `${PREFIX}-action`,
  summary: `${PREFIX}-summary`,
  cardContent: `${PREFIX}-cardContent`,
  none: `${PREFIX}-none`,
}

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    margin: theme.spacing(1),
  },

  [`& .${classes.action}`]: {
    marginBottom: -theme.spacing(1),
  },

  [`& .${classes.summary}`]: {
    display: 'block',
    lineHeight: 1.3,
    marginTop: 4,
  },

  [`& .${classes.cardContent}`]: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },

  [`& .${classes.none}`]: {
    display: 'none',
  },
}))

type Props = {
  conjugation: typeof verbConjugations[0]
  expandedInitial?: boolean
}
export default forwardRef(function VerbConjugationCard(
  { conjugation, expandedInitial = false }: Props,
  ref,
) {
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <StyledCard className={classes.card} ref={ref}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        classes={{ focusHighlight: classes.none }}
        disableRipple
        disableTouchRipple
      >
        <PrincipalPartsRow {...{ ...conjugation, expanded }} />
      </CardActionArea>
      <Collapse in={expanded} mountOnEnter>
        <CardContent className={classes.cardContent}>
          <Divider variant="middle" />
          <VerbForms {...conjugation} />
        </CardContent>
      </Collapse>
    </StyledCard>
  )
})
