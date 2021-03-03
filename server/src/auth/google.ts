import axios from "axios"
import { GOOGLE_ID, GOOGLE_SECRET } from "../../../utils/env"
import logger from "../../../utils/log"

const log = logger.getChildLogger()

export default async function fetchGoogleUser(code: string) {
  const {
    data: { access_token },
  } = await axios
    .post("https://oauth2.googleapis.com/token", null, {
      params: {
        code,
        client_id: GOOGLE_ID,
        client_secret: GOOGLE_SECRET,
        redirect_uri: "http://localhost:3000/google",
        grant_type: "authorization_code",
      },
    })
    .catch(() => {
      const error = new Error("error fetching google access token")
      log.error(error)
      throw error
    })
  const { data: profile } = await axios
    .get("https://www.googleapis.com/oauth2/v1/userinfo", {
      params: {
        alt: "json",
        access_token,
      },
    })
    .catch(() => {
      const error = new Error("error fetching google user info")
      log.error(error)
      throw error
    })
  return profile
}
