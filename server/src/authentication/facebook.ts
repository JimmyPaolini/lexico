import axios from 'axios'

import { FACEBOOK_ID, FACEBOOK_SECRET } from '../../../utils/env'
import log from '../../../utils/log'

export type FacebookProfile = {
  id: string
  email: string
}

export default async function fetchFacebookUser(
  code: string,
  hostname: string,
): Promise<FacebookProfile> {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    data: { access_token },
  } = await axios
    .get('https://graph.facebook.com/v10.0/oauth/access_token', {
      params: {
        code,
        client_id: FACEBOOK_ID,
        client_secret: FACEBOOK_SECRET,
        redirect_uri: hostname.match(/lexicolatin/i)
          ? 'https://lexicolatin.com/facebook'
          : 'http://localhost:3000/facebook',
      },
    })
    .catch((error) => {
      log.error('error fetching facebook access token', error.response)
      throw error
    })
  const { data: profile } = await axios
    .get('https://graph.facebook.com/v10.0/me', {
      params: {
        access_token,
        fields: 'id,email',
        format: 'json',
        // transport: "cors",
        // pretty: 0,
        // debug: "all",
        // method: "get",
        // suppress_http_code: 1,
      },
    })
    .catch((error) => {
      log.error('error fetching facebook user info', error)
      throw error
    })
  return profile
}
