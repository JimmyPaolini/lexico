import { ReactNode } from 'react'

import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import {
  OptionsObject,
  ProviderContext,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from 'notistack'

export default function useSnackbarEnhanced(): ProviderContext {
  const snackbar = useSnackbar()
  const { enqueueSnackbar, closeSnackbar } = snackbar

  const enqueueSnackbarEnhanced = (
    message: SnackbarMessage,
    options?: OptionsObject | undefined,
  ): SnackbarKey => {
    const SnackbarAction = (key: SnackbarKey) => (
      <>
        {options?.action
          ? (options.action as (key: SnackbarKey) => ReactNode)(key)
          : null}
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <Close />
        </IconButton>
      </>
    )
    return enqueueSnackbar(message, {
      ...(options || {}),
      variant: 'info',
      autoHideDuration: 8000,
      action: SnackbarAction,
    })
  }

  return { ...snackbar, enqueueSnackbar: enqueueSnackbarEnhanced }
}
