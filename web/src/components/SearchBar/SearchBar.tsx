import { Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import React, { Dispatch, SetStateAction, useContext, useRef } from "react"
import { pascalCase } from "../../utils/string"
import { Context } from "../layout/Context"
import SwitchEnglishLatin from "./SwitchEnglishLatin"

export interface SearchBarProps {
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
  target = "",
  isLatin = true,
  setLatin = () => null,
}: SearchBarProps): JSX.Element {
  const classes = useStyles()
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
    <Paper className={classes.searchBar}>
      <Grid container alignItems="center">
        <Grid item>
          {isMobile && (
            <IconButton
              onClick={() => setNavOpen(!isNavOpen)}
              className={classes.iconButton}
              aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item xs>
          <InputBase
            id="searchBar"
            className={classes.input}
            placeholder={"Search " + pascalCase(target)}
            inputProps={{ "aria-label": "search", ref: input }}
            tabIndex={1}
            value={search}
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
            aria-label="search">
            {!isLoading ? (
              <SearchIcon />
            ) : (
              <CircularProgress
                size={24}
                thickness={5.4}
                color={isLatin ? "secondary" : "primary"}
              />
            )}
          </IconButton>
        </Grid>
        {target === "lexico" && (
          <Grid item>
            <SwitchEnglishLatin {...{ isLatin, setLatin }} />
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

const useStyles = makeStyles((theme: any) => ({
  searchBar: {
    width: theme.custom.cardWidth,
    padding: "4px 4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    fontSize: 20,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}))
