import { MiddlewareFn } from 'type-graphql'

import { ResolverContext } from '../../config/ResolverContext'

export const DevOnly: MiddlewareFn<ResolverContext> = async (_, next) => {
  if (process.env.NODE_ENV !== 'development')
    throw new Error('forbidden outside of development environment')
  return await next()
}

export const ProdOnly: MiddlewareFn<ResolverContext> = async (_, next) => {
  if (process.env.NODE_ENV !== 'production')
    throw new Error('forbidden outside of production environment')
  return await next()
}
