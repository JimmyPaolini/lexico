import { Box, Modal, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { Dispatch, SetStateAction, useMemo, useRef } from "react"
import { QueryFunctionContext, useQuery } from "react-query"
import Entry from "../../../../server/src/entity/dictionary/Entry"
import searchLatinQuery from "../../graphql/search/searchLatin.gql"
import { graphQLClient } from "../../pages/_app"
import CardDeck from "../CardDeck"
import EntryCard from "../EntryCard/EntryCard"

interface Props {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function ReaderModal({ searched, open, setOpen }: Props) {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  const { data: entries, isFetched, isSuccess, isError } = useQuery(
    ["searchLatin", searched],
    searchLatin,
    { retry: false },
  )

  const cards = useMemo(() => {
    if (!entries) return []
    return entries.map((entry: Entry) => ({
      key: entry.id,
      Card: () => useMemo(() => <EntryCard {...{ entry, searched }} />, []),
    }))
  }, [entries])
  cards

  return (
    <div className={classes.container} ref={ref}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        disableScrollLock
        container={() => ref.current}
        className={classes.modal}
        open={open && isFetched}
        onClose={() => setOpen(false)}
      >
        <Box overflow="scroll">
          {isError ? (
            <Paper className={classes.notFound}>
              <Typography variant="h5">not found</Typography>
            </Paper>
          ) : isSuccess && !!entries ? (
            <CardDeck {...{ cards }} />
          ) : null}
        </Box>
      </Modal>
    </div>
  )
}

async function searchLatin({
  queryKey: [, search],
}: QueryFunctionContext<any>) {
  if (!search) return undefined
  const { searchLatin: data } = await graphQLClient.request(searchLatinQuery, {
    search,
  })
  return data
}

const useStyles = makeStyles((theme: any) => ({
  container: {
    "height": 300,
    "flexGrow": 1,
    "minWidth": 300,
    "transform": "translateZ(0)",
    "@media all and (-ms-high-contrast: none)": {
      display: "none",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    position: "absolute",
    height: "100%",
  },
  notFound: {
    padding: theme.spacing(2),
  },
}))
