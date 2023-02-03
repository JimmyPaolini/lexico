import { Typography } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

import { OAuthLogin } from '../login/OAuthLogin'

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
    <>
      <Typography gutterBottom align="center">
        Sign in to save your Bookmarks, User Texts, and Settings across devices
      </Typography>
      <OAuthLogin provider="google" />
    </>
  )
}
