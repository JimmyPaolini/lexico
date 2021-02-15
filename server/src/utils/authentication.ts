import axios from "axios"
import { sign, verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"
import { getConnection } from "typeorm"
import { GOOGLE_ID, GOOGLE_SECRET, JWT_SECRET } from "../config.json"
import User from "../entity/user/User"
import logger from "./log"
import { ResolverContext } from "./ResolverContext"

const log = logger.getChildLogger()

export function createAccessToken(user: User) {
  return sign({ sub: user.id, iss: "https://lexicolatin.com" }, JWT_SECRET, {
    expiresIn: "7d",
  })
}

export const Authenticate: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) throw new Error("no user signed in")
  const claims = verify(context.req.cookies.accessToken, JWT_SECRET) as any
  if (!claims) throw new Error("invalid access token")
  const user = await getConnection().getRepository(User).findOne(claims.sub)
  if (!user) throw new Error("user does not exist")
  context.user = user
  return next()
}

export const IsAuthenticated: MiddlewareFn<ResolverContext> = (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) throw new Error("no user signed in")
  const claims = verify(context.req.cookies.accessToken, JWT_SECRET) as any
  if (!claims) throw new Error("invalid access token")
  return next()
}

export const GetBookmarks: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) return next()
  const claims = verify(context.req.cookies.accessToken, JWT_SECRET) as any
  if (!claims) return next()
  const user = await getConnection()
    .getRepository(User)
    .findOne(claims.sub, { relations: ["bookmarks"] })
  if (!user) return next()
  context.bookmarks = user.bookmarks
  return next()
}

export async function fetchGoogleUser(code: string) {
  const {
    data: { access_token },
  } = await axios
    .post("https://oauth2.googleapis.com/token", null, {
      params: {
        code: code,
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
