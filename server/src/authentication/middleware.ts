import { JwtPayload, verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { getConnection } from 'typeorm'

import User from '../../../entity/user/User'

import { ResolverContext } from '../utils/ResolverContext'

export const Authenticate: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) throw new Error('no user signed in')
  const claims = verify(
    context.req.cookies.accessToken,
    process.env.JWT_SECRET as string,
  ) as JwtPayload
  if (!claims) throw new Error('invalid access token')
  const user = await getConnection().getRepository(User).findOne(claims.sub)
  if (!user) throw new Error('user does not exist')
  context.user = user
  return next()
}

export const IsAuthenticated: MiddlewareFn<ResolverContext> = (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) throw new Error('no user signed in')
  const claims = verify(
    context.req.cookies.accessToken,
    process.env.JWT_SECRET as string,
  ) as JwtPayload
  if (!claims) throw new Error('invalid access token')
  return next()
}

export const GetBookmarks: MiddlewareFn<ResolverContext> = async (
  { context },
  next,
) => {
  if (!context.req.cookies.accessToken) return next()
  let userId
  try {
    const claims = verify(
      context.req.cookies.accessToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayload
    if (!claims) return next()
    userId = claims.sub
  } catch {
    return next()
  }
  const user = await getConnection()
    .getRepository(User)
    .findOne(userId, { relations: ['bookmarks'] })
  if (!user) return next()
  context.bookmarks = user.bookmarks
  return next()
}
