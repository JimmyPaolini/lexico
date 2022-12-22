import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react'

import { Snackbar, SnackbarProps } from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const SnackbarContext = createContext(
  {} as {
    snackbarProps: SnackbarProps
    setSnackbarProps: Dispatch<SetStateAction<SnackbarProps>>
  },
)

type Props = PropsWithChildren<Record<string, unknown>>

export const SnackbarProvider = ({ children }: Props) => {
  const theme = useTheme()

  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    anchorOrigin: { vertical: 'bottom' as const, horizontal: 'right' as const },
    autoHideDuration: 8000,
    sx: {
      '& .MuiSnackbarContent-root': {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    },
  })

  return (
    <SnackbarContext.Provider value={{ snackbarProps, setSnackbarProps }}>
      <Snackbar
        {...snackbarProps}
        onClose={(_, reason) =>
          reason !== 'clickaway' &&
          setSnackbarProps((snackbarProps) => ({
            ...snackbarProps,
            open: false,
          }))
        }
        TransitionProps={{
          onExited: () =>
            setSnackbarProps((snackbarProps) => ({
              ...snackbarProps,
              open: false,
            })),
        }}
      />
      {children}
    </SnackbarContext.Provider>
  )
}
