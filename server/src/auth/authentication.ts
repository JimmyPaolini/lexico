import { sign, verify } from "jsonwebtoken"
import { MiddlewareFn } from "type-graphql"
import { getConnection } from "typeorm"
import { JWT_SECRET } from "../../../config.json"
import User from "../../../entity/user/User"
import { ResolverContext } from "../utils/ResolverContext"

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
