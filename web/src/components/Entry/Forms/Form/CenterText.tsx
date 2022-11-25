import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import LinesEllipsis from 'react-lines-ellipsis'

type Props = { centerText: string }

export const CenterText = ({ centerText }: Props) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography align="center">
        <LinesEllipsis text={centerText || '-'} maxLine={2} />
      </Typography>
    </Grid>
  )
}
