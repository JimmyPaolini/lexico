import axios from "axios"
import { GOOGLE_ID, GOOGLE_SECRET } from "../../../utils/env"
import log from "../../../utils/log"

export type GoogleProfile = {
  id: string
  email: string
}

export default async function fetchGoogleUser(
  code: string,
  hostname: string,
): Promise<GoogleProfile> {
  const redirect_uri = hostname.match(/localhost/i)
    ? "http://localhost:3000/google"
    : "https://www.lexicolatin.com/google"
  const {
    data: { access_token },
  } = await axios
    .post("https://oauth2.googleapis.com/token", null, {
      params: {
        code,
        client_id: GOOGLE_ID,
        client_secret: GOOGLE_SECRET,
        redirect_uri,
        grant_type: "authorization_code",
      },
    })
    .catch((error) => {
      log.error("error fetching google access token", error)
      throw error
    })
  const { data: profile } = await axios
    .get("https://www.googleapis.com/oauth2/v1/userinfo", {
      params: {
        alt: "json",
        access_token,
      },
    })
    .catch((error) => {
      log.error("error fetching google user info", error)
      throw error
    })
  return profile
}
