import { useContext } from 'react'

import { Close } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

import { useRouter } from 'next/router'

import { SnackbarContext } from '../components/layout/SnackbarProvider'

export const useSnackbar = (closeButton: boolean = true, loginButton?: boolean) => {
  const { setSnackbarProps } = useContext(SnackbarContext)
  const router = useRouter()

  const LoginButton = () => (
    <Button
      onClick={async () => {
        setSnackbarProps((snackbarProps) => ({
          ...snackbarProps,
          open: false,
        }))
        await router.push('/user')
      }}
      color="secondary"
    >
      Sign in
    </Button>
  )

  const CloseButton = () => (
    <IconButton
      onClick={() =>
        setSnackbarProps((snackbarProps) => ({
          ...snackbarProps,
          open: false,
        }))
      }
      size="small"
    >
      <Close />
    </IconButton>
  )

  const action = (
    <>
      {loginButton && <LoginButton />}
      {closeButton && <CloseButton />}
    </>
  )

  return (message: string) =>
    setSnackbarProps((snackbarProps) => ({
      ...snackbarProps,
      open: true,
      action,
      message,
    }))
}
