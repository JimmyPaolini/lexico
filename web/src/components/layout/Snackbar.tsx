import React, { PropsWithChildren } from 'react'

import { useTheme } from '@mui/material/styles'

import { SnackbarProvider } from 'notistack'

type Props = PropsWithChildren<{}>

export default function Snackbar({ children }: Props) {
  const theme = useTheme()
  return (
    <SnackbarProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      sx={{
        '& .Snackbar-snackbarInfo': {
          backgroundColor: `${theme.palette.background.paper} !important`,
          flexWrap: 'nowrap',
        },
        '& .Snackbar-action': {
          flexShrink: 0,
          paddingLeft: theme.spacing(1),
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      elevation={4}
      hideIconVariant
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  )
}
