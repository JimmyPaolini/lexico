import React, { ReactNode } from 'react'

import { styled } from '@mui/material/styles'

import { SnackbarProvider } from 'notistack'

const PREFIX = 'Snackbar'

const classes = {
  snackbarInfo: `${PREFIX}-snackbarInfo`,
  action: `${PREFIX}-action`,
}

const StyledSnackbarProvider = styled(SnackbarProvider)(({ theme }) => ({
  [`& .${classes.snackbarInfo}`]: {
    backgroundColor: `${theme.palette.background.paper} !important`,
    flexWrap: 'nowrap',
  },

  [`& .${classes.action}`]: {
    flexShrink: 0,
    paddingLeft: theme.spacing(1),
  },
}))

type Props = {
  children?: ReactNode
}

export default function Snackbar({ children }: Props) {
  return (
    <StyledSnackbarProvider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      /* @ts-ignore */
      classes={{ variantInfo: classes.snackbarInfo, action: classes.action }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      elevation={4}
      hideIconVariant
      preventDuplicate
    >
      {children}
    </StyledSnackbarProvider>
  )
}
