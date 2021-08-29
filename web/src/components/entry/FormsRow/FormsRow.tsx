import {
  Box,
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useContext, useState } from "react"
import { Forms } from "../../../../../entity/dictionary/word/Forms"
import { PartOfSpeech } from "../../../../../entity/dictionary/word/PartOfSpeech"
import identifierAbbreviations from "../../../utils/identifierAbbreviations"
import { getSettingsLocal } from "../../../utils/settingsLocal"
import ExpandIcon from "../../accessories/ExpandIcon"
import { Context } from "../../layout/Context"
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
}: Props): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings.formsExpandedDefault ||
      getSettingsLocal().formsExpandedDefault,
  )
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

  if (searched.match(/Table/i) && !expandable) return <></>

  return (
    <>
      <Divider variant="inset" />
      <CardContent className={classes.formsRow}>
        <CardActionArea
          onClick={() => setExpanded((expanded) => !expanded)}
          disabled={!expandable}
          disableRipple
          disableTouchRipple
          classes={{ focusHighlight: classes.hide }}>
          <Grid container direction="row" justify="space-evenly">
            <Grid container item direction="column" justify="center" xs={true}>
              <Typography variant="body1">{searched}</Typography>
              {identifiers.map((identifier, i) => (
                <Typography variant="button" key={identifier + i}>
                  {identifier}
                </Typography>
              ))}
            </Grid>
            {FormsCard && (
              <Box mt={0.5} mr={1.5}>
                <ExpandIcon {...{ expanded }} />
              </Box>
            )}
          </Grid>
        </CardActionArea>
      </CardContent>
      {FormsCard && (
        <Collapse in={expanded && !!FormsCard} mountOnEnter>
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
} as {
  [key: string]: typeof VerbForms | typeof NounForms | typeof AdjectiveForms
}

const useStyles = makeStyles((theme: Theme) => ({
  formsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  hide: {
    display: "none",
  },
}))
