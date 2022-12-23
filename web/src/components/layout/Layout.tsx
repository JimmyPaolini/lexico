import { PropsWithChildren } from 'react'

import { useRouter } from 'next/router'

import { Grid } from '@mui/material'

import { Navigation } from './Navigation'
import { SnackbarProvider } from './SnackbarProvider'

type Props = PropsWithChildren<Record<string, unknown>>

export const Layout = ({ children }: Props) => {
  const router = useRouter()
  const page = router.pathname.split('/')[1]

  return (
    <SnackbarProvider>
      <Grid container>
        <Grid item>
          <Navigation page={page} />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </SnackbarProvider>
  )
}
