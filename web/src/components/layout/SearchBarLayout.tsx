import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { ReactNode } from "react"
import SearchBar, { SearchBarProps } from "../SearchBar/SearchBar"

interface Props {
  searchBarProps: SearchBarProps
  children?: ReactNode
}
export default function SearchBarLayout({ searchBarProps, children }: Props) {
  const classes = useStyles()

  return (
    <Grid container direction="column" alignItems="stretch">
      <Grid item container justify="center" className={classes.searchBar}>
        <SearchBar {...searchBarProps} />
      </Grid>
      <Grid item container justify="center" className={classes.children}>
        {children}
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles((theme: any) => ({
  searchBar: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  children: {
    marginTop: theme.spacing(4),
  },
}))
