import React, { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'

import { useRouter } from 'next/router'

import { Navigation } from './Navigation'
import Snackbar from './Snackbar'

type Props = PropsWithChildren<{}>

export const Layout = ({ children }: Props) => {
  const router = useRouter()
  const page = router.pathname.split('/')[1]

  return (
    <Snackbar>
      <Grid container>
        <Grid item>
          <Navigation page={page} />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Snackbar>
  )
}
