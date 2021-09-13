import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { FiberManualRecord } from "@material-ui/icons"
import { Translation } from "../../../graphql/generated"

interface TranslationBulletProps {
  translation: Translation
}
export default function TranslationBullet({
  translation,
}: TranslationBulletProps): JSX.Element {
  const classes = useStyles()
  return (
    <Grid
      container
      item
      spacing={1}
      wrap="nowrap"
      className={classes.translationBullet}>
      <Grid item>
        <FiberManualRecord className={classes.bullet} />
      </Grid>
      <Grid item>
        <Typography color="textPrimary">{translation.translation}</Typography>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  translationBullet: {
    marginLeft: -4,
    margin: 0,
  },
  bullet: {
    position: "relative",
    top: 7,
    fontSize: 12,
  },
}))
