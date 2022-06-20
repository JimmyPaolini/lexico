import { Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Translation } from "../../../graphql/generated"

interface TranslationBulletProps {
  translation: Translation
}
export default function TranslationBullet({
  translation,
}: TranslationBulletProps) {
  const classes = useStyles()
  return (
    <Grid
      container
      item
      spacing={1}
      xs
      alignItems="flex-start"
      wrap="nowrap"
      className={classes.translationBullet}
    >
      <div className={classes.bullet} />
      <Typography color="textPrimary">{translation.translation}</Typography>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  translationBullet: {
    margin: 0, // need to overwrite the negative margin of the Grid component
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: theme.palette.text.primary,
    margin: theme.spacing(1),
    flexShrink: 0,
  },
}))
