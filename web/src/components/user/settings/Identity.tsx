import { useContext } from 'react'

import { Typography } from '@mui/material'

import { Context } from '../../layout/Context'

export function Identity() {
  const { user } = useContext(Context)
  const provider = user?.googleId
    ? 'Google'
    : user?.facebookId
    ? 'Facebook'
    : 'email/password'

  return user ? (
    <Typography gutterBottom align="center">
      Signed in with {provider} as:
      <br />
      {user.email}
    </Typography>
  ) : (
    <Typography gutterBottom align="center">
      No user signed in:
      <br />
      Settings saved locally on device/browser
    </Typography>
  )
}
