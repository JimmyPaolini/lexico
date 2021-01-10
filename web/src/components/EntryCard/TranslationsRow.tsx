import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { ExpandMore, FiberManualRecord } from "@material-ui/icons"
import React, { useState } from "react"
import Translation from "../../../../server/src/entity/dictionary/Translation"
import useEventListener from "../../utils/useEventListener"

interface Props {
  translations: Translation[] | null | undefined
}
export default function TranslationsRow({ translations }: Props) {
  if (translations === null || translations === undefined) return null
  translations = translations?.filter((translation) => !!translation)
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const expandable = translations?.length > 2

  useEventListener("keypress", (e: any) => {
    if (window.location.pathname.match(/^\/bookmarks/)) return
    if (e.key === "t" && document?.activeElement?.tagName !== "INPUT")
      setExpanded(!expanded)
  })

  const Translation = CreateTranslation(classes)

  return (
    <Accordion
      expanded={expandable && expanded}
      onClick={() => setExpanded(!expanded)}
      className={classes.accordion}
      elevation={0}
      square
    >
      <AccordionSummary
        expandIcon={expandable ? <ExpandMore /> : undefined}
        {...(!expandable ? { style: { cursor: "default" } } : {})}
        className={classes.accordionSummary}
      >
        <Grid container direction="column" justify="center">
          {translations
            .slice(0, 2)
            .map((translation) => Translation(translation))}
        </Grid>
      </AccordionSummary>
      {expandable && (
        <AccordionDetails className={classes.accordionDetails}>
          <Grid container direction="column" justify="center">
            {translations
              .slice(2)
              .map((translation) => Translation(translation))}
          </Grid>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

const CreateTranslation = (classes: Record<string, any>) => (
  translation: Translation,
) => (
  <Grid container item spacing={1} wrap="nowrap" key={translation.id}>
    <Grid item>
      <FiberManualRecord className={classes.bullet} />
    </Grid>
    <Grid item>
      <Typography color="textPrimary">{translation.translation}</Typography>
    </Grid>
  </Grid>
)

const Accordion = withStyles((theme) => ({
  root: {
    "&:before": {
      display: "none",
      color: theme.palette.primary.contrastText,
    },
  },
  expanded: {
    "&$expanded": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  // disabled: {
  //     color: theme.palette.primary.contrastText,
  //     '&$disabled': {
  //         backgroundColor: theme.palette.grey[800],
  //         color: theme.palette.primary.contrastText,
  //         opacity: 1
  //     },
  // },
}))(MuiAccordion)

const AccordionSummary = withStyles(() => ({
  root: {
    "minHeight": 0,
    "&$expanded": {
      minHeight: 0,
      maxHeight: "none",
    },
  },
  content: {
    "margin": 0,
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {
    "&$expanded": {
      maxHeight: "none",
    },
  },
  disabled: {
    "&$disabled": {
      backgroundColor: "inherit",
    },
  },
}))(MuiAccordionSummary)

const AccordionDetails = withStyles(() => ({}))(MuiAccordionDetails)

const useStyles = makeStyles((theme) => ({
  bullet: {
    position: "relative",
    top: 4,
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  accordion: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  accordionSummary: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  accordionDetails: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
}))
