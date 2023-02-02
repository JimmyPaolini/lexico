import axios from 'axios'

import log from '../log'

export type GoogleProfile = {
  id: string
  email: string
}

export async function fetchGoogleUser(
  code: string,
  hostname: string
): Promise<GoogleProfile> {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    data: { access_token },
  } = await axios
    .post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
        redirect_uri: hostname.match(/lexicolatin.com/i)
          ? 'https://lexicolatin.com/google'
          : 'http://localhost:3000/google',
        grant_type: 'authorization_code',
      },
    })
    .catch((error) => {
      log.error('error fetching google access token', error.response)
      throw error
    })
  const { data: profile } = await axios
    .get('https://www.googleapis.com/oauth2/v1/userinfo', {
      params: {
        alt: 'json',
        access_token,
      },
    })
    .catch((error) => {
      log.error('error fetching google user info', error)
      throw error
    })
  return profile
}
