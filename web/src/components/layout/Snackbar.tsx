import React, { PropsWithChildren } from 'react'

import { useTheme } from '@mui/material/styles'

import { ClassNames } from '@emotion/react'
import { SnackbarProvider } from 'notistack'

type Props = PropsWithChildren<{}>

export default function Snackbar({ children }: Props) {
  const theme = useTheme()
  return (
    <ClassNames>
      {({ css }) => (
        <SnackbarProvider
          // classes={{
          //   variantInfo: css({
          //     background: `${theme.palette.background.paper} !important`,
          //     flexWrap: 'nowrap',
          //   }),

          //   action: css({
          //     flexShrink: 0,
          //     paddingLeft: theme.spacing(1),
          //   }),
          // }}
          className={css({
            '& .Snackbar-snackbarInfo': {
              background: `${theme.palette.background.paper} !important`,
              flexWrap: 'nowrap',
            },
            '& .Snackbar-action': {
              flexShrink: 0,
              paddingLeft: theme.spacing(1),
            },
          })}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          // elevation={4}
          hideIconVariant
          preventDuplicate
        >
          {children}
        </SnackbarProvider>
      )}
    </ClassNames>
  )
}
