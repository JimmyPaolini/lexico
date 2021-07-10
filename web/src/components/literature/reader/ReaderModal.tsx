import { Box, Modal, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { Dispatch, SetStateAction, useRef } from "react"
import { UseQueryResult } from "react-query"
import { useSwipeable } from "react-swipeable"
import Entry from "../../../../../entity/dictionary/Entry"
import useSearchLatin from "../../../hooks/search/useSearchLatin"
import useEventListener from "../../../hooks/useEventListener"
import CardDeck from "../../accessories/CardDeck"
import EntryCard from "../../EntryCard/EntryCard"

interface ReaderModalProps {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function ReaderModal({
  searched,
  open,
  setOpen,
}: ReaderModalProps): JSX.Element {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  const {
    data: entries,
    isFetched,
    isSuccess,
    isError,
  } = useSearchLatin(searched) as UseQueryResult<Entry[], unknown>

  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") setOpen(false)
  })

  const cards =
    entries?.map((entry: Entry) => {
      const Card = <EntryCard {...{ entry, searched }} />
      return { key: entry.id, Card }
    }) || []

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableScrollLock
      container={() => ref.current}
      className={classes.modal}
      open={open && isFetched}
      onClose={() => setOpen(false)}
      {...useSwipeable({
        onSwipedLeft: () => setOpen(false),
        onSwipedRight: () => setOpen(false),
      })}>
      <Box className={classes.container} tabIndex={-1}>
        {isError || !entries?.length ? (
          <Paper className={classes.notFound}>
            <Typography variant="h5">No Results</Typography>
          </Paper>
        ) : isSuccess && !!entries ? (
          <CardDeck {...{ cards }} />
        ) : null}
      </Box>
    </Modal>
  )
}

const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(12),
  },
  container: {
    maxHeight: "100%",
    overflow: "scroll",
    outline: "none",
  },
  notFound: {
    padding: theme.spacing(2),
  },
}))
