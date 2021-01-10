import { Grid } from "@material-ui/core"
import { useState } from "react"
import SearchBar from "../components/Search/SearchBar"

export default function Search() {
  const [search, setSearch] = useState("")
  const [results] = useState<any[] | undefined | null>(undefined)
  const [loading] = useState<boolean>(false)
  const [isLatin, setLatin] = useState<boolean>(true)
  results

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleSearchExecute = () => {
    if (!search) return
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <SearchBar
          {...{
            search,
            loading,
            handleSearchChange,
            handleSearchExecute,
            isLatin,
            setLatin,
          }}
          target="lexico"
        />
      </Grid>
      {/* <Grid item container justify="center">
        {results === undefined && <Home />}
        {results === null && <Typography variant="h4">Not found</Typography>}
        {results && <CardDeck cards={results} />}
      </Grid> */}
    </Grid>
  )
}
