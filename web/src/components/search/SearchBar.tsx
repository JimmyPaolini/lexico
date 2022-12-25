import { useContext, useEffect, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import {
  Card,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  useTheme,
} from '@mui/material'

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
    <Card
      sx={{
        padding: theme.spacing(1 / 2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }}
    >
      <Grid container alignItems="center" wrap="nowrap">
        {isMobile && (
          <IconButton
            onClick={() => setNavOpen(!isNavOpen)}
            sx={{ padding: theme.spacing(1) }}
            aria-label="menu"
            size="large"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        )}
        <InputBase
          id="searchBar"
          placeholder={placeholder}
          value={search}
          autoFocus
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
          sx={{ marginLeft: theme.spacing(1), fontSize: 24, flexGrow: 1 }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton
          onClick={() => handleSearch(search)}
          sx={{ padding: theme.spacing(1) }}
          size="large"
          aria-label="search"
        >
          {!isLoading ? (
            <SearchIcon fontSize="large" />
          ) : (
            <CircularProgress
              size={theme.spacing(3)}
              thickness={5.4}
              color="secondary"
            />
          )}
        </IconButton>
      </Grid>
    </Card>
  )
}
