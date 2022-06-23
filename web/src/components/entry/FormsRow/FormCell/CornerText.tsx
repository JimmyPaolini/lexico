import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const PREFIX = 'CornerText'

const classes = {
  cornerText: `${PREFIX}-cornerText`,
}

const StyledTypography = styled(Typography)(() => ({
  [`&.${classes.cornerText}`]: {
    lineHeight: 1.2,
  },
}))

export default function CornerText({ text }: { text: string }) {
  return (
    <StyledTypography variant="caption" className={classes.cornerText}>
      {text}
    </StyledTypography>
  )
}
