import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import User from '../../../entity/user/User'

import log from '../../../utils/log'
import { Authenticate, IsAuthenticated } from '../authentication/middleware'

import { createAccessToken } from '../authentication/token'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(User)
export default class AuthenticationResolver {
  Users = getConnection().getRepository(User)

  @Mutation(() => User)
  async signIn(
    @Arg('email') email: string,
    @Arg('provider') provider: string,
    @Arg('providerId') providerId: string,
    @Ctx() { res }: ResolverContext,
  ): Promise<User> {
    const user = await this.Users.save({ email, provider, providerId })
    res.cookie('accessToken', createAccessToken(user), { httpOnly: true })
    log.info('signIn user', user)
    return user
  }

  @Query(() => Boolean)
  @UseMiddleware(IsAuthenticated)
  signOut(@Ctx() { res }: ResolverContext): boolean {
    res.clearCookie('accessToken')
    
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unregister(@Ctx() { user }: ResolverContext): Promise<boolean> {
    await this.Users.delete(user.id)
    log.info('unregister user', user)
    return true
  }
}
