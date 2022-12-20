import { JwtPayload, verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { getConnection } from 'typeorm'

import User from '../entity/user/User'
import { ResolverContext } from '../utils/ResolverContext'

const getUserIdFromContext = (context: ResolverContext) => {
  if (!context?.req?.cookies?.accessToken) throw new Error('no user signed in')
  const claims = verify(
    context.req.cookies.accessToken,
    process.env.JWT_SECRET as string,
  ) as JwtPayload
  if (!claims?.sub) throw new Error('invalid access token')
  return claims.sub
}

export const Authenticate: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  const userId = getUserIdFromContext(context)
  const user = await getConnection().getRepository(User).findOne(userId)
  if (!user) throw new Error('user does not exist')
  context.user = user
  return await next()
}

export const IsAuthenticated: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  getUserIdFromContext(context)
  return await next()
}

export const GetBookmarks: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  let userId
  try {
    userId = getUserIdFromContext(context)
  } catch {
    return await next()
  }
  const user = await getConnection()
    .getRepository(User)
    .findOne(userId, { relations: ['bookmarks'] })
  if (!user) return await next()
  context.bookmarks = user.bookmarks
  return await next()
}
