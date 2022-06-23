import { useContext } from 'react'

import { Typography } from '@mui/material'

import { Context } from '../../layout/Context'

export function Identity() {
  const { user } = useContext(Context)

  return user ? (
    <Typography gutterBottom align="center">
      Signed in
      {user.googleId
        ? ' with Google '
        : user.facebookId
        ? ' with Facebook '
        : ' with email/password '}
      as:
      <br />
      {user.email}
    </Typography>
  ) : (
    <Typography gutterBottom align="center">
      No user signed in:
      <br />
      settings saved locally on device/browser
    </Typography>
  )
}
