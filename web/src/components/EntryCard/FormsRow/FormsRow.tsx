import {
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from "react"
import { Forms } from "../../../../../server/src/entity/dictionary/word/Forms"
import { PartOfSpeech } from "../../../../../server/src/entity/dictionary/word/PartOfSpeech"
import identifierAbbreviations from "../../../utils/identifierAbbreviations"
import useEventListener from "../../../utils/useEventListener"
import ExpandIcon from "../../accessories/ExpandIcon"
import AdjectiveForms from "./PartsOfSpeech/AdjectiveForms"
import NounForms from "./PartsOfSpeech/NounForms"
import VerbForms from "./PartsOfSpeech/VerbForms"

interface Props {
  searched: string
  forms: Forms | null | undefined
  partOfSpeech: PartOfSpeech
  identifiers: string[]
}

export default function FormsRow({
  searched,
  forms,
  partOfSpeech,
  identifiers = [],
}: Props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  identifiers = identifiers.map((identifier) =>
    identifier
      .split(" ")
      .map((inflector) => identifierAbbreviations[inflector])
      .join(" "),
  )

  if (!searched)
    searched =
      partOfSpeech === "verb" ? "Conjugation Table" : "Declension Table"

  const FormsCard = !forms ? null : partOfSpeechToFormsCard[partOfSpeech]

  const expandable = !!FormsCard

  useEventListener("keypress", (e: any) => {
    if (window.location.pathname.match(/^\/bookmarks/)) return
    if (e.key === "f" && document?.activeElement?.tagName !== "INPUT")
      setExpanded(!expanded)
  })

  if (searched.match(/Table/i) && !expandable) return null

  return (
    <>
      <Divider variant="inset" />
      <CardContent className={classes.formsRow}>
        <CardActionArea
          onClick={() => setExpanded((expanded) => !expanded)}
          disabled={!expandable}
          disableRipple
          disableTouchRipple
          classes={{ focusHighlight: classes.hide }}
        >
          <Grid container direction="row" justify="space-evenly">
            <Grid container item direction="column" justify="center" xs={true}>
              <Typography variant="body1">{searched}</Typography>
              {identifiers.map((identifier) => (
                <Typography variant="button">{identifier}</Typography>
              ))}
            </Grid>
            {FormsCard && (
              <Grid item>
                <ExpandIcon {...{ expanded }} />
              </Grid>
            )}
          </Grid>
        </CardActionArea>
      </CardContent>
      {FormsCard && (
        <Collapse in={expanded && FormsCard}>
          <Divider variant="inset" />
          <FormsCard forms={forms} />
        </Collapse>
      )}
    </>
  )
}

const partOfSpeechToFormsCard = {
  verb: VerbForms,
  noun: NounForms,
  properNoun: NounForms,
  adjective: AdjectiveForms,
  participle: AdjectiveForms,
  suffix: AdjectiveForms,
  numeral: AdjectiveForms,
  pronoun: AdjectiveForms,
  determiner: AdjectiveForms,
} as { [key: string]: any }

const useStyles = makeStyles((theme: any) => ({
  formsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  rightSideUp: {
    transition: "250ms ease",
    transform: "rotateZ(0deg)",
  },
  upSideDown: {
    transition: "250ms ease",
    transform: "rotateZ(-180deg)",
  },
  disableHoverGlow: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  hide: {
    display: "none",
  },
}))
