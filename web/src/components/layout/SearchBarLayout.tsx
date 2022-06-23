import React, { ComponentProps, PropsWithChildren } from 'react'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import SearchBar from '../search/SearchBar'

type Props = PropsWithChildren<{
  searchBarProps: ComponentProps<typeof SearchBar>
}>

export default function SearchBarLayout({ searchBarProps, children }: Props) {
  const theme = useTheme()
  return (
    <Grid container direction="column" alignItems="stretch">
      <Grid
        item
        container
        justifyContent="center"
        sx={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}
      >
        <SearchBar {...searchBarProps} />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        sx={{ marginTop: theme.spacing(4) }}
      >
        {children}
      </Grid>
    </Grid>
  )
}
