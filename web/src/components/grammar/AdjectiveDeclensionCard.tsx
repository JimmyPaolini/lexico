import { forwardRef, useState } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LexicoTheme } from '../../theme'
import AdjectiveForms from '../entry/FormsRow/PartsOfSpeech/AdjectiveFormsTable'
import PrincipalPartsRow from '../entry/PrincipalPartsRow/PrincipalPartsRow'
import adjectiveDeclensions from './adjectiveDeclensions'

type Props = {
  declension: typeof adjectiveDeclensions[0]
  expandedInitial?: boolean
}
export default forwardRef(function AdjectiveDeclensionCard(
  { declension, expandedInitial = false }: Props,
  ref,
) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

  return (
    <Card className={classes.card} ref={ref}>
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
    </Card>
  )
})

const useStyles = makeStyles((theme: LexicoTheme) => ({
  card: {
    margin: theme.spacing(1),
  },
  action: {
    marginBottom: -theme.spacing(1),
  },
  summary: {
    display: 'block',
    lineHeight: 1.3,
    marginTop: 4,
  },
  cardContent: {
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
  info: {
    margin: theme.spacing(2),
  },
  none: {
    display: 'none',
  },
}))
