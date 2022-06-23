import React, { ComponentProps, ReactNode } from 'react'

import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

import SearchBar from '../search/SearchBar'

const PREFIX = 'SearchBarLayout'

const classes = {
  searchBar: `${PREFIX}-searchBar`,
  children: `${PREFIX}-children`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.searchBar}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },

  [`& .${classes.children}`]: {
    marginTop: theme.spacing(4),
  },
}))

type Props = {
  searchBarProps: ComponentProps<typeof SearchBar>
  children?: ReactNode
}

export default function SearchBarLayout({ searchBarProps, children }: Props) {
  return (
    <StyledGrid container direction="column" alignItems="stretch">
      <Grid
        item
        container
        justifyContent="center"
        className={classes.searchBar}
      >
        <SearchBar {...searchBarProps} />
      </Grid>
      <Grid item container justifyContent="center" className={classes.children}>
        {children}
      </Grid>
    </StyledGrid>
  )
}
