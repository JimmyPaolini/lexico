import {
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from "@material-ui/icons"
import React, { useState } from "react"
import Translation from "../../../../server/src/entity/dictionary/Translation"
import useEventListener from "../../utils/useEventListener"
import ExpandIcon from "../accessories/ExpandIcon"

interface Props {
  translations: Translation[]
}
export default function TranslationsRow({ translations }: Props) {
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
    <CardContent className={classes.translationsRow}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disabled={!expandable}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}
      >
        <Grid container direction="row" justify="space-evenly">
          <Grid container item direction="column" xs={expandable}>
            {translations
              .slice(0, 2)
              .map((translation) => Translation(translation))}
            <Collapse in={expanded || !expandable} timeout={250}>
              {translations
                .slice(2)
                .map((translation) => Translation(translation))}
            </Collapse>
          </Grid>
          {expandable && (
            <Grid item>
              <ExpandIcon {...{ expanded }} />
            </Grid>
          )}
        </Grid>
      </CardActionArea>
    </CardContent>
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

const useStyles = makeStyles((theme) => ({
  translationsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bullet: {
    position: "relative",
    top: 4,
    fontSize: 12,
    color: theme.palette.text.primary,
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
