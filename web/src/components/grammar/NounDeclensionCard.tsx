import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { forwardRef, useState } from "react"
import { MyTheme } from "../../theme"
import NounForms from "../entry/FormsRow/PartsOfSpeech/NounFormsTable"
import PrincipalPartsRow from "../entry/PrincipalPartsRow/PrincipalPartsRow"
import nounDeclensions from "./nounDeclensions"

interface NounDeclensionCardProps {
  declension: typeof nounDeclensions[0]
}
export default forwardRef(function NounDeclensionCard(
  { declension }: NounDeclensionCardProps,
  ref,
): JSX.Element {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(declension.id === "first")

  return (
    <Card className={classes.card} ref={ref}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        classes={{ focusHighlight: classes.none }}
        disableRipple
        disableTouchRipple>
        <PrincipalPartsRow {...{ ...declension, expanded }} />
      </CardActionArea>
      <Collapse in={expanded} mountOnEnter>
        <CardContent className={classes.cardContent}>
          <Divider variant="middle" />
          <Typography align="center" className={classes.info}>
            {declension.info}
          </Typography>
          <Divider variant="middle" />
          <NounForms {...declension} />
        </CardContent>
      </Collapse>
    </Card>
  )
})

const useStyles = makeStyles((theme: MyTheme) => ({
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
  info: {
    margin: theme.spacing(2),
  },
  none: {
    display: "none",
  },
}))
