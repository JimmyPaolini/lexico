import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type Props = { centerText: string }

export const CenterText = ({ centerText }: Props) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography
        align="center"
        sx={{
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {centerText ?? '-'}
      </Typography>
    </Grid>
  )
}
