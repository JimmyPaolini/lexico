import { ReactNode } from 'react'

import { Close } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

import { useRouter } from 'next/router'
import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from 'notistack'

export const useSnackbarEnhanced = (
  closeButton?: boolean,
  loginButton?: boolean,
): ProviderContext => {
  const router = useRouter()
  const snackbar = useSnackbar()
  const { enqueueSnackbar, closeSnackbar } = snackbar

  const enqueueSnackbarEnhanced = (
    message: SnackbarMessage,
    options?: OptionsObject,
  ): SnackbarKey => {
    const SnackbarAction = (key: SnackbarKey) => (
      <>
        {options?.action &&
          (options.action as (key: SnackbarKey) => ReactNode)(key)}
        {loginButton && (
          <Button
            onClick={() => {
              closeSnackbar(key)
              router.push('/user')
            }}
            color="secondary"
          >
            Sign in
          </Button>
        )}
        {closeButton && (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close />
          </IconButton>
        )}
      </>
    )
    return enqueueSnackbar(message, {
      variant: 'info',
      autoHideDuration: 8000,
      action: SnackbarAction,
      ...(options ?? {}),
    })
  }

  return { ...snackbar, enqueueSnackbar: enqueueSnackbarEnhanced }
}
