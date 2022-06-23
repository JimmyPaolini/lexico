import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import { pascalCase } from '../../utils/string'
import { Context } from '../layout/Context'
import SwitchEnglishLatin from './SwitchEnglishLatin'

const PREFIX = 'SearchBar'

const classes = {
  searchBar: `${PREFIX}-searchBar`,
  input: `${PREFIX}-input`,
  iconButton: `${PREFIX}-iconButton`,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.searchBar}`]: {
    width: theme.custom.cardWidth,
    padding: '4px 4px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  [`& .${classes.input}`]: {
    marginLeft: theme.spacing(1),
    fontSize: 20,
  },

  [`& .${classes.iconButton}`]: {
    padding: theme.spacing(1),
  },
}))

type Props = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  handleSearchExecute: any
  isLoading?: boolean
  target: string
  isLatin?: boolean
  setLatin?: Dispatch<SetStateAction<boolean>>
}

export default function SearchBar({
  search,
  setSearch,
  handleSearchExecute,
  isLoading = false,
  target = '',
  isLatin = true,
  setLatin = () => null,
}: Props) {
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)
  const input = useRef<any>()

  // useEventListener("keypress", (e: any) => {
  //   if (e.key === "Escape") return input.current.blur()
  //   if (e.key !== "Enter") return
  //   if (input.current === document.activeElement) input.current.blur()
  //   else {
  //     input.current.focus()
  //     input.current.select()
  //   }
  // })

  return (
    <StyledPaper className={classes.searchBar}>
      <Grid container alignItems="center">
        <Grid item>
          {isMobile && (
            <IconButton
              onClick={() => setNavOpen(!isNavOpen)}
              className={classes.iconButton}
              aria-label="menu"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs>
          <InputBase
            id="searchBar"
            className={classes.input}
            placeholder={'Search ' + pascalCase(target)}
            inputProps={{ 'aria-label': 'search', ref: input }}
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleSearchExecute()
            }}
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={() => handleSearchExecute()}
            className={classes.iconButton}
            aria-label="search"
            size="large"
          >
            {!isLoading ? (
              <SearchIcon />
            ) : (
              <CircularProgress
                size={24}
                thickness={5.4}
                color={isLatin ? 'secondary' : 'primary'}
              />
            )}
          </IconButton>
        </Grid>
        {target === 'lexico' && (
          <Grid item>
            <SwitchEnglishLatin {...{ isLatin, setLatin }} />
          </Grid>
        )}
      </Grid>
    </StyledPaper>
  )
}
