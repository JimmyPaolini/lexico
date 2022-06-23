import { PropsWithChildren } from 'react'

import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'Pill'

const classes = {
  pill: `${PREFIX}-pill`,
}

const StyledTypography = styled(Typography)(() => ({
  [`&.${classes.pill}`]: {
    height: 20,
    padding: '0px 6px',
    borderRadius: 100,
    display: 'inline-flex',
    alignItems: 'center',
  },
}))

type Props = PropsWithChildren<{
  backgroundColor: string
  color: string
}>

export default function Pill({ backgroundColor, color, children }: Props) {
  return (
    <StyledTypography
      variant="button"
      noWrap
      className={classes.pill}
      style={{ color, backgroundColor }}
    >
      {children}
    </StyledTypography>
  )
}
