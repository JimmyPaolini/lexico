import {
  Box,
  CardActionArea,
  CardContent,
  Collapse,
  Grid,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useContext, useState } from "react"
import Translation from "../../../../../entity/dictionary/Translation"
import { getSettingsLocal } from "../../../utils/settingsLocal"
import ExpandIcon from "../../accessories/ExpandIcon"
import { Context } from "../../layout/Context"
import TranslationBullet from "./TranslationBullet"

interface Props {
  translations: Translation[]
}
export default function TranslationsRow({ translations }: Props): JSX.Element {
  const classes = useStyles()
  const { user } = useContext(Context)
  const [expanded, setExpanded] = useState<boolean>(
    user?.settings.translationsExpandedDefault ||
      getSettingsLocal().translationsExpandedDefault,
  )
  const expandable = translations.length > 2

  return (
    <CardContent className={classes.translationsRow}>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disabled={!expandable}
        disableRipple
        disableTouchRipple
        classes={{ focusHighlight: classes.hide }}>
        <Grid container direction="row" justify="space-evenly" wrap="nowrap">
          <Grid container item direction="column">
            {translations.slice(0, 2).map((translation) => (
              <TranslationBullet {...{ translation }} key={translation.id} />
            ))}
            <Collapse in={expanded || !expandable} timeout={250} mountOnEnter>
              <Grid item>
                {translations.slice(2).map((translation) => (
                  <TranslationBullet
                    {...{ translation }}
                    key={translation.id}
                  />
                ))}
              </Grid>
            </Collapse>
          </Grid>
          {expandable && (
            <Box mt={0.5} mr={1.5}>
              <ExpandIcon {...{ expanded }} />
            </Box>
          )}
        </Grid>
      </CardActionArea>
    </CardContent>
  )
}

const useStyles = makeStyles((theme) => ({
  translationsRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
}))
