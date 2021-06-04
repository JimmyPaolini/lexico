import {
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from "@material-ui/icons"
import { useContext, useState } from "react"
import Translation from "../../../../entity/dictionary/Translation"
import useEventListener from "../../hooks/useEventListener"
import ExpandIcon from "../accessories/ExpandIcon"
import { Context } from "../Context"

interface Props {
  translations: Translation[]
}
export default function TranslationsRow({ translations }: Props) {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings.translationsExpandedDefault,
  )
  const expandable = translations?.length > 2

  useEventListener("keypress", (e: any) => {
    if (window.location.pathname.match(/^\/bookmarks/)) return
    if (e.key === "t" && document?.activeElement?.tagName !== "INPUT")
      setExpanded(!expanded)
  })

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
            {translations.slice(0, 2).map((translation) => (
              <TranslationBullet {...{ translation }} key={translation.id} />
            ))}
            <Collapse in={expanded || !expandable} timeout={250}>
              {translations.slice(2).map((translation) => (
                <TranslationBullet {...{ translation }} key={translation.id} />
              ))}
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

interface TranslationBulletProps {
  translation: Translation
}
function TranslationBullet({ translation }: TranslationBulletProps) {
  const classes = useStyles()
  return (
    <Grid container item spacing={1} wrap="nowrap">
      <Grid item>
        <FiberManualRecord className={classes.bullet} />
      </Grid>
      <Grid item>
        <Typography color="textPrimary">{translation.translation}</Typography>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  translationsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bullet: {
    position: "relative",
    top: 7,
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
