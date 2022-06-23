import { forwardRef, useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import AdjectiveForms from '../entry/FormsRow/PartsOfSpeech/AdjectiveFormsTable'
import PrincipalPartsRow from '../entry/PrincipalPartsRow/PrincipalPartsRow'
import adjectiveDeclensions from './adjectiveDeclensions'

const PREFIX = 'AdjectiveDeclensionCard'

const classes = {
  card: `${PREFIX}-card`,
  action: `${PREFIX}-action`,
  summary: `${PREFIX}-summary`,
  cardContent: `${PREFIX}-cardContent`,
  info: `${PREFIX}-info`,
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

  [`& .${classes.info}`]: {
    margin: theme.spacing(2),
  },

  [`& .${classes.none}`]: {
    display: 'none',
  },
}))

type Props = {
  declension: typeof adjectiveDeclensions[0]
  expandedInitial?: boolean
}
export default forwardRef(function AdjectiveDeclensionCard(
  { declension, expandedInitial = false }: Props,
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
        <PrincipalPartsRow {...{ ...declension, expanded }} />
      </CardActionArea>
      <Collapse in={expanded} mountOnEnter>
        <CardContent className={classes.cardContent}>
          <Divider variant="middle" />
          <Typography align="center" className={classes.info}>
            {declension.info}
          </Typography>
          <Divider variant="middle" />
          <AdjectiveForms {...declension} />
        </CardContent>
      </Collapse>
    </StyledCard>
  )
})
