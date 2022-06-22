import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

type Props = { centerText: string }

export default function CenterText({ centerText }: Props) {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography align="center" className={classes.centerText}>
        {centerText || '-'}
      </Typography>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  centerText: {
    flexGrow: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'box',
    lineClamp: 2,
    boxOrient: 'vertical',
  },
}))
