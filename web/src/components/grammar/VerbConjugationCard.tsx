import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { forwardRef, useState } from "react"
import { LexicoTheme } from "../../theme"
import VerbForms from "../entry/FormsRow/PartsOfSpeech/VerbFormsTable"
import PrincipalPartsRow from "../entry/PrincipalPartsRow/PrincipalPartsRow"
import verbConjugations from "./verbConjugations"

type Props = {
  conjugation: typeof verbConjugations[0]
  expandedInitial?: boolean
}
export default forwardRef(function VerbConjugationCard(
  { conjugation, expandedInitial = false }: Props,
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
        <PrincipalPartsRow {...{ ...conjugation, expanded }} />
      </CardActionArea>
      <Collapse in={expanded} mountOnEnter>
        <CardContent className={classes.cardContent}>
          <Divider variant="middle" />
          <VerbForms {...conjugation} />
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
    display: "block",
    lineHeight: 1.3,
    marginTop: 4,
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      padding: 0,
    },
  },
  none: {
    display: "none",
  },
}))
