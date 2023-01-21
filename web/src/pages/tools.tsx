import Head from 'next/head'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Deck } from '../components/layout/Deck'
import { Tools } from '../components/tools'

export default function Settings() {
  const theme = useTheme()

  return (
    <div>
      <Head>
        <title>Lexico - Tools</title>
      </Head>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: theme.spacing(4) }}
      >
        <Deck Cards={[<Tools key="Tools" />]} />
      </Grid>
    </div>
  )
}
