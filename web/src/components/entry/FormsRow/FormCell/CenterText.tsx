import LinesEllipsis from 'react-lines-ellipsis'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

type Props = { centerText: string }

export default function CenterText({ centerText }: Props) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography align="center">
        <LinesEllipsis text={centerText || '-'} maxLine={2} />
      </Typography>
    </Grid>
  )
}
