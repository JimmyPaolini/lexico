import React, { PropsWithChildren } from 'react'

import { useTheme } from '@mui/material/styles'

import { SnackbarProvider } from 'notistack'

export default function Snackbar({ children }: PropsWithChildren<{}>) {
  const theme = useTheme()
  return (
    <SnackbarProvider
      style={{
        pointerEvents: 'all',
        background: theme.palette.background.paper,
        flexWrap: 'nowrap',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      hideIconVariant
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  )
}
