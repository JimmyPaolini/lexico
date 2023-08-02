import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import { ResolverContext } from '../config/ResolverContext'
import User from '../entity/user/User'
import { fetchFacebookUser } from '../services/authentication/facebook'
import { fetchGoogleUser } from '../services/authentication/google'
import { Authenticate } from '../services/authentication/middleware'
import { createAccessToken } from '../services/authentication/token'
import log from '../services/log'

@Resolver(User)
export class AuthenticationResolver {
  @Query(() => User)
  async google(
    @Arg('code') code: string,
    @Ctx() { req, res }: ResolverContext
  ): Promise<User> {
    const profile = await fetchGoogleUser(code, req.hostname)
    let user = await User.findOne({ where: { googleId: profile.id } })
    if (!user) {
      user = await User.save({
        googleId: profile.id,
        email: profile.email,
      })
    }
    log.info('login google user', user)
    res.cookie('accessToken', createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async facebook(
    @Arg('code') code: string,
    @Ctx() { req, res }: ResolverContext
  ): Promise<User> {
    const profile = await fetchFacebookUser(code, req.hostname)
    let user = await User.findOne({ where: { facebookId: profile.id } })
    if (!user) {
      user = await User.save({
        facebookId: profile.id,
        email: profile.email,
      })
    }
    log.info('login facebook user', user)
    res.cookie('accessToken', createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => Boolean)
  @UseMiddleware(Authenticate)
  logout(@Ctx() { user, res }: ResolverContext): boolean {
    log.info('logout user', user)
    res.clearCookie('accessToken')
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unregister(@Ctx() { user }: ResolverContext): Promise<boolean> {
    await User.delete(user.id)
    log.info('unregister user', user)
    return true
  }
}
