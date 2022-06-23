import React, { Dispatch, SetStateAction, memo, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'

import { Box, Modal, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Entry, useSearchLatinQuery } from '../../graphql/generated'
import useEventListener from '../../hooks/useEventListener'
import CardDeck from '../accessories/CardDeck'
import EntryCard from '../entry/EntryCard'

const PREFIX = 'ReaderModal'

const classes = {
  modal: `${PREFIX}-modal`,
  container: `${PREFIX}-container`,
  notFound: `${PREFIX}-notFound`,
}

const StyledModal = styled(Modal)(({ theme }) => ({
  [`&.${classes.modal}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(12),
  },

  [`& .${classes.container}`]: {
    maxHeight: '100%',
    overflow: 'scroll',
    outline: 'none',
  },

  [`& .${classes.notFound}`]: {
    padding: theme.spacing(2),
  },
}))

type Props = {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default memo(function ReaderModal({ searched, open, setOpen }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const { data, isFetched, isSuccess, isError } = useSearchLatinQuery(
    { search: searched },
    {
      retryDelay: 0,
      staleTime: 1000 * 60 * 5,
    },
  )
  const entries = data?.searchLatin as Entry[]

  useEventListener('keydown', (e: any) => {
    if (e.key === 'Escape') setOpen(false)
  })

  const cards =
    entries?.map((entry) => {
      const Card = <EntryCard {...{ entry, searched }} />
      return { key: entry.id, Card }
    }) || []

  return (
    <StyledModal
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
    </StyledModal>
  )
})
