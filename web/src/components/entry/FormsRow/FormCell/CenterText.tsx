import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import LinesEllipsis from 'react-lines-ellipsis'

import { normalize } from 'src/utils/string'

type Props = { centerText: string; searched?: string }

export default function CenterText({ centerText, searched }: Props) {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography
        align="center"
        sx={
          normalize(centerText) === searched
            ? { textDecoration: 'underline' }
            : {}
        }
      >
        <LinesEllipsis text={centerText || '-'} maxLine={2} />
      </Typography>
    </Grid>
  )
}
