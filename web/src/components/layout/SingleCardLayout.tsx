import React, { PropsWithChildren } from 'react'

import { Grid, Grow, useTheme } from '@mui/material'

type Props = PropsWithChildren<{}>

export default function SingleCardLayout({ children }: Props) {
  const theme = useTheme()
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        sx={{
          width: theme.custom.cardWidth,
          marginTop: theme.spacing(4),
          marginBottom: theme.spacing(4),
        }}
      >
        <Grow in>
          <Grid>{children}</Grid>
        </Grow>
      </Grid>
    </Grid>
  )
}
