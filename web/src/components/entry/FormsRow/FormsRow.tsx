import {
  CardActionArea,
  CardContent,
  Collapse,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { useContext, useState } from "react"
import { Forms } from "../../../graphql/generated"
import { getSettingsLocal } from "../../../utils/settingsLocal"
import ExpandIcon from "../../accessories/ExpandIcon"
import IdentifierPill from "../../accessories/IdentifierPill"
import { Context } from "../../layout/Context"
import AdjectiveForms from "./PartsOfSpeech/AdjectiveForms"
import NounForms from "./PartsOfSpeech/NounForms"
import VerbForms from "./PartsOfSpeech/VerbForms"

interface Props {
  searched: string
  forms?: Forms | null
  partOfSpeech: string
  identifiers: string[]
}

export default function FormsRow({
  searched,
  forms,
  partOfSpeech,
  identifiers: identifiersList = [],
}: Props): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)
  const expandedInitial =
    user?.settings?.formsExpandedDefault ||
    getSettingsLocal().formsExpandedDefault ||
    false
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)

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
          classes={{ focusHighlight: classes.hide }}
        >
          <Grid container wrap="nowrap">
            <Grid container item direction="column">
              <Grid item>
                <Typography variant="body1">{searched}</Typography>
              </Grid>
              {identifiersList.map((identifiers) => (
                <Grid
                  container
                  item
                  key={identifiers}
                  className={classes.identifiers}
                >
                  {identifiers.split(" ").map((identifier) => (
                    <IdentifierPill identifier={identifier} key={identifier} />
                  ))}
                </Grid>
              ))}
            </Grid>
            {FormsCard && (
              <Grid item className={classes.expandIcon}>
                <ExpandIcon {...{ expanded }} />
              </Grid>
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
  identifiers: {
    marginTop: theme.spacing(1),
  },
  expandIcon: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(1.5),
  },
}))
