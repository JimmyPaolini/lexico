import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

import { pascalCase } from '../../utils/string'
import { Context } from '../layout/Context'
import SwitchEnglishLatin from './SwitchEnglishLatin'

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
  const theme = useTheme()
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
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        maxWidth: theme.custom.card.maxWidth,
        minWidth: theme.custom.card.minWidth,
        padding: theme.spacing(1 / 2),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }}
    >
      <Grid container alignItems="center">
        <Grid item>
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
        </Grid>
        <Grid item xs>
          <InputBase
            id="searchBar"
            sx={{ marginLeft: theme.spacing(1), fontSize: 20 }}
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
            sx={{ padding: theme.spacing(1) }}
            aria-label="search"
            size="large"
          >
            {!isLoading ? (
              <SearchIcon />
            ) : (
              <CircularProgress
                size={theme.spacing(3)}
                thickness={5.4}
                color={isLatin ? 'secondary' : 'primary'}
              />
            )}
          </IconButton>
        </Grid>
        {target === 'lexico' && (
          <SwitchEnglishLatin {...{ isLatin, setLatin }} />
        )}
      </Grid>
    </Paper>
  )
}
