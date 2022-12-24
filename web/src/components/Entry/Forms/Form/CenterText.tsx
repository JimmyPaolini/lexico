import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type Props = { centerText: string }

export const CenterText = ({ centerText }: Props) => {
  const theme = useTheme()
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography align="center" sx={{ ...theme.custom.lineClamp(2) }}>
        {centerText ?? '-'}
      </Typography>
    </Grid>
  )
}
