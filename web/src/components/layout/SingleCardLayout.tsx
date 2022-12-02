import { PropsWithChildren } from 'react'

import { Grid, Grow, useTheme } from '@mui/material'

type Props = PropsWithChildren<{}>

export const SingleCardLayout = ({ children }: Props) => {
  const theme = useTheme()
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        item
        sx={{
          width: '100%',
          maxWidth: theme.custom.card.maxWidth,
          minWidth: theme.custom.card.minWidth,
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
