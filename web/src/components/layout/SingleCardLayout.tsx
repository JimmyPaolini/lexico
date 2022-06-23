import React, { ReactNode } from 'react'

import { Grid, Grow } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'SingleCardLayout'

const classes = {
  column: `${PREFIX}-column`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.column}`]: {
    width: theme.custom.cardWidth,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))

type Props = {
  children?: ReactNode
}

export default function SingleCardLayout({ children }: Props) {
  return (
    <StyledGrid container justifyContent="center" alignItems="center">
      <Grid item className={classes.column}>
        <Grow in={true}>
          <Grid>{children}</Grid>
        </Grow>
      </Grid>
    </StyledGrid>
  )
}
