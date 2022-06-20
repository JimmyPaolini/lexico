import { Box, Modal, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import React, { Dispatch, memo, SetStateAction, useRef } from "react"
import { useSwipeable } from "react-swipeable"
import { Entry, useSearchLatinQuery } from "../../graphql/generated"
import useEventListener from "../../hooks/useEventListener"
import CardDeck from "../accessories/CardDeck"
import EntryCard from "../entry/EntryCard"

interface ReaderModalProps {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default memo(function ReaderModal({
  searched,
  open,
  setOpen,
}: ReaderModalProps) {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)

  const { data, isFetched, isSuccess, isError } = useSearchLatinQuery(
    { search: searched },
    {
      retryDelay: 0,
      staleTime: 1000 * 60 * 5,
    },
  )
  const entries = data?.searchLatin as Entry[]

  useEventListener("keydown", (e: any) => {
    if (e.key === "Escape") setOpen(false)
  })

  const cards =
    entries?.map((entry) => {
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
})

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
