import { Dispatch, SetStateAction, useRef } from 'react'

import { Box, Modal, Paper, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useSwipeable } from 'react-swipeable'

import { Entry as EntryType, useSearchQuery } from 'src/graphql/generated'
import { useEventListener } from 'src/hooks/useEventListener'

import { Entry } from '../Entry/Entry'
import { Deck } from '../layout/Deck'

type Props = {
  searched: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const SearchModal = ({ searched, open, setOpen }: Props) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const { data, isFetched, isSuccess, isError } = useSearchQuery(
    { search: searched },
    {
      retryDelay: 0,
      staleTime: 1000 * 60 * 5,
    },
  )
  const entries = data?.search as EntryType[]

  useEventListener('keydown', (e: any) => {
    if (e.key === 'Escape') setOpen(false)
  })

  const Cards =
    entries?.map((entry) => <Entry {...{ entry, searched }} />) || []

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableScrollLock
      container={() => ref.current}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(12),
      }}
      open={open && isFetched}
      onClose={() => setOpen(false)}
      {...useSwipeable({
        onSwipedLeft: () => setOpen(false),
        onSwipedRight: () => setOpen(false),
      })}
    >
      <Box
        sx={{ maxHeight: '100%', overflow: 'scroll', outline: 'none' }}
        tabIndex={-1}
      >
        {isError || !entries?.length ? (
          <Paper sx={{ padding: theme.spacing(2) }}>
            <Typography variant="h5">No Results</Typography>
          </Paper>
        ) : isSuccess && !!entries ? (
          <Deck Cards={Cards} />
        ) : null}
      </Box>
    </Modal>
  )
}
