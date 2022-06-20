import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

export default function CornerText({ text }: { text: string }) {
  const classes = useStyles()
  return (
    <Typography variant="caption" className={classes.cornerText}>
      {text}
    </Typography>
  )
}

const useStyles = makeStyles(() => ({
  cornerText: {
    lineHeight: 1.2,
  },
}))
