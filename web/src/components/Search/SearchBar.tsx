import CircularProgress from "@material-ui/core/CircularProgress"
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import React, { Dispatch, SetStateAction, useContext, useRef } from "react"
import { pascalCase } from "../../utils/string"
import useEventListener from "../../hooks/useEventListener"
import { Context } from "../Context"

interface Props {
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
  isLatin = false,
  setLatin = () => null
}: Props) {
  const classes = useStyles()
  const { isNavOpen, setNavOpen } = useContext(Context)
  const input = useRef<any>()
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"))
  isLatin
  setLatin
  // useEffect(() => input.current.focus(), []);

  useEventListener("keypress", (e: any) => {
    if (e.key === "Escape") return input.current.blur()
    if (e.key !== "Enter") return
    if (input.current === document.activeElement) input.current.blur()
    else {
      input.current.focus()
      input.current.select()
    }
  })

  return (
    <Paper className={classes.searchBar}>
      {isMobile && (
        <IconButton
          onClick={() => setNavOpen(!isNavOpen)}
          className={classes.iconButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      )}
      <InputBase
        id="searchBar"
        className={classes.input}
        placeholder={"Search " + pascalCase(target)}
        inputProps={{ "aria-label": "search", "ref": input }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) handleSearchExecute()
        }}
      />
      <IconButton
        type="submit"
        onClick={() => handleSearchExecute()}
        className={classes.iconButton}
        aria-label="search"
      >
        {!isLoading ? (
          <SearchIcon />
        ) : (
          <CircularProgress size={24} thickness={5.4} color="secondary" />
        )}
      </IconButton>
      {/* {target === "lexico" && <SwitchEnLa {...{ isLatin, setLatin }} />} */}
    </Paper>
  )
}

const useStyles = makeStyles((theme: any) => ({
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: theme.custom.cardWidth,
    height: 46,
    padding: "2px 4px",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 20,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}))
