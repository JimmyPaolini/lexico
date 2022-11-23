import React, { PropsWithChildren } from 'react'

import { Grid } from '@mui/material'

import Navigation from './Navigation'
import Snackbar from './Snackbar'
import {useRouter} from 'next/router';

type Props = PropsWithChildren<{}>

export default function Layout({ children }: Props) {
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
