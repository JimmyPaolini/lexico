import { Typography } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

export const Identity = () => {
  const { user } = useLexicoContext()
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
