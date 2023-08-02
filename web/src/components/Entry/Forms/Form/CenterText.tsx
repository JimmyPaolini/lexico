import { useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

type Props = { centerText: string }

export const CenterText = ({ centerText }: Props) => {
  const theme = useTheme()
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Typography align="center" sx={{ ...theme.custom.lineClamp(2) }}>
        {centerText.split(',\n').map((text, i) => {
          if (i + 1 !== centerText.split(',\n').length) {
            return (
              <span key={text}>
                {text}, <br />
              </span>
            )
          } else return <span key={text}>{text}</span>
        })}
      </Typography>
    </Grid>
  )
}
