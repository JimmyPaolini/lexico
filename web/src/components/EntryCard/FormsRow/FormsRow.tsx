import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import { Forms } from "../../../../../server/src/entity/dictionary/word/Forms"
import { PartOfSpeech } from "../../../../../server/src/entity/dictionary/word/PartOfSpeech"
import formNameAbbreviations from "../../../utils/formAbbreviations"
import { normalize } from "../../../utils/string"
import useEventListener from "../../../utils/useEventListener"
import AdjectiveForms from "./PartsOfSpeech/AdjectiveForms"
import NounForms from "./PartsOfSpeech/NounForms"
import VerbForms from "./PartsOfSpeech/VerbForms"

const Accordion = withStyles((theme) => ({
  root: {
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  disabled: {
    "&$disabled": {
      backgroundColor: theme.palette.grey[800],
      textColor: theme.palette.text.primary,
    },
  },
  expanded: {},
}))(MuiAccordion)

const AccordionSummary = withStyles(() => ({
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
}))(MuiAccordionSummary)

const AccordionDetails = withStyles(() => ({
  root: {
    padding: 0,
  },
}))(MuiAccordionDetails)

interface Props {
  searched: string
  forms: Forms | null | undefined
  partOfSpeech: PartOfSpeech
}

export default function FormsRow({ searched, forms, partOfSpeech }: Props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  let searchedForms = [] as string[]
  try {
    searchedForms = getSearchedForms(searched, forms as any, [], searchedForms)
  } catch (e) {}

  useEventListener("keypress", (e: any) => {
    if (window.location.pathname.match(/^\/bookmarks/)) return
    if (e.key === "f" && document?.activeElement?.tagName !== "INPUT")
      setExpanded(!expanded)
  })

  if (!searched)
    searched =
      partOfSpeech === "verb" ? "Conjugation Table" : "Declension Table"

  const FormsCard = !forms
    ? null
    : ({
        "verb": VerbForms,
        "noun": NounForms,
        "proper noun": NounForms,
        "adjective": AdjectiveForms,
        "participle": AdjectiveForms,
        "pronoun": AdjectiveForms,
      } as { [key: string]: any })[partOfSpeech]

  const expandable = !!FormsCard

  if (searched.match(/Table/i) && !expandable) return null

  return (
    <>
      <Divider variant="inset" />
      <Accordion
        expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        disabled={!expandable}
        className={classes.accordion}
        elevation={0}
        square
      >
        <AccordionSummary
          expandIcon={expandable ? <ExpandMore /> : undefined}
          className={classes.accordion}
        >
          <Grid container direction="column" justify="center">
            <Grid item>
              <Typography variant="body1">{searched}</Typography>
            </Grid>
            {searchedForms.map((searchedForm) => (
              <Grid item>
                <Typography variant="button" key={searchedForm}>
                  {searchedForm}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </AccordionSummary>
        {expandable && (
          <AccordionDetails>
            <Divider variant="inset" absolute />
            <FormsCard forms={forms} />
          </AccordionDetails>
        )}
      </Accordion>
    </>
  )
}

function getSearchedForms(
  searched: string,
  forms: { [key: string]: any },
  currentForm: string[],
  searchedForms: string[],
) {
  if (Array.isArray(forms)) {
    if (
      forms.some((form) =>
        normalize(form).match(new RegExp("^" + searched + "$", "i")),
      )
    ) {
      return [...searchedForms, currentForm.join(" ")]
    }
  } else {
    for (const key in forms) {
      searchedForms = getSearchedForms(
        searched,
        forms[key],
        [...currentForm, formNameAbbreviations[key]],
        searchedForms,
      )
    }
  }
  return searchedForms
}

const useStyles = makeStyles(() => ({
  accordion: {
    minHeight: 64,
  },
}))
