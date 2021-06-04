import { IconButton } from "@material-ui/core"
import { Close } from "@material-ui/icons"
import {
  OptionsObject,
  SnackbarKey,
  SnackbarMessage,
  useSnackbar,
} from "notistack"
import { ReactNode } from "react"

export default function useSnackbarEnhanced() {
  const snackbar = useSnackbar()
  const { enqueueSnackbar, closeSnackbar } = snackbar

  const enqueueSnackbarEnhanced = (
    message: SnackbarMessage,
    options?: OptionsObject | undefined,
  ): SnackbarKey => {
    return enqueueSnackbar(message, {
      ...(options || {}),
      variant: "info",
      autoHideDuration: 8000,
      action: (key: any) => (
        <>
          {options?.action
            ? (options.action as (key: SnackbarKey) => ReactNode)(key)
            : null}
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <Close />
          </IconButton>
        </>
      ),
    })
  }

  return { ...snackbar, enqueueSnackbar: enqueueSnackbarEnhanced }
}
