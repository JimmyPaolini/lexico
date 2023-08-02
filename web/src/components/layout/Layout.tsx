import { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'

import { Navigation } from './Navigation'
import { SnackbarProvider } from './SnackbarProvider'

type Props = PropsWithChildren<Record<string, unknown>>

export const Layout = ({ children }: Props) => {
  return (
    <SnackbarProvider>
      <Grid container>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </SnackbarProvider>
  )
}
