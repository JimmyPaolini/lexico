import { Box, Modal, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { Dispatch, SetStateAction, useMemo, useRef } from "react"
import { useSwipeable } from "react-swipeable"
import Entry from "../../../../entity/dictionary/Entry"
import useSearchLatin from "../../hooks/search/useSearchLatin"
import useEventListener from "../../hooks/useEventListener"
import CardDeck from "../accessories/CardDeck"
import EntryCard from "../EntryCard/EntryCard"

interface Props {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function ReaderModal({ searched, open, setOpen }: Props) {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  const { data: entries, isFetched, isSuccess, isError } = useSearchLatin(
    searched,
  )

  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") setOpen(false)
  })

  const cards = useMemo(() => {
    if (!entries) return []
    return entries.map((entry: Entry) => ({
      key: entry.id,
      Card: () => useMemo(() => <EntryCard {...{ entry, searched }} />, []),
    }))
  }, [entries])

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
      })}
    >
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
  },
  container: {
    maxHeight: "100%",
    overflow: "scroll",
    // padding: theme.spacing(4),
    outline: "none",
  },
  notFound: {
    padding: theme.spacing(2),
  },
}))
