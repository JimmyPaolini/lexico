import LinesEllipsis from 'react-lines-ellipsis'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

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
