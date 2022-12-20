import { useContext, useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

import { Context } from '../layout/Context'

type Props = {
  initialSearch?: string
  handleSearch: (search: string) => unknown
  isLoading?: boolean
  placeholder: string
}

export const SearchBar = ({
  initialSearch = '',
  handleSearch,
  isLoading = false,
  placeholder = 'Search',
}: Props) => {
  const theme = useTheme()
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)
  const [search, setSearch] = useState(initialSearch)

  useEffect(() => {
    if (search === '') handleSearch('')
  }, [search])

  return (
    <Paper
      elevation={4}
      sx={{
        background: theme.palette.background.paper,
        width: '100%',
        maxWidth: theme.custom.card.maxWidth,
        minWidth: theme.custom.card.minWidth,
        padding: theme.spacing(1 / 2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }}
    >
      <Grid container alignItems="center">
        {isMobile && (
          <IconButton
            onClick={() => setNavOpen(!isNavOpen)}
            sx={{ padding: theme.spacing(1) }}
            aria-label="menu"
            size="large"
          >
            <MenuIcon />
          </IconButton>
        )}
        <InputBase
          id="searchBar"
          sx={{ marginLeft: theme.spacing(1), fontSize: 20, flexGrow: 1 }}
          placeholder={placeholder}
          inputProps={{ 'aria-label': 'search' }}
          value={search}
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
        />
        <IconButton
          onClick={() => handleSearch(search)}
          sx={{ padding: theme.spacing(1) }}
          aria-label="search"
          size="large"
        >
          {!isLoading
            ? <SearchIcon />
            : (
            <CircularProgress
              size={theme.spacing(3)}
              thickness={5.4}
              color="secondary"
            />
              )}
        </IconButton>
      </Grid>
    </Paper>
  )
}
