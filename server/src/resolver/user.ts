import { JwtPayload, verify } from 'jsonwebtoken'
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import Settings from '../entity/user/Settings'
import User from '../entity/user/User'

import { Authenticate } from '../authentication/middleware'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)

  @Query(() => User, { nullable: true })
  async user(@Ctx() context: ResolverContext): Promise<User | null> {
    try {
      if (!context?.req?.cookies?.accessToken) return null
      const claims = verify(
        context.req.cookies.accessToken ?? '',
        process.env.JWT_SECRET!,
      ) as JwtPayload
      if (!claims?.sub) return null
      const user = await this.Users.findOne(claims.sub)
      return user ?? null
    } catch {
      return null
    }
  }

  @Query(() => Settings)
  @UseMiddleware(Authenticate)
  settings(@Ctx() { user }: ResolverContext): Settings {
    return user.settings
  }

  @Mutation(() => Settings)
  @UseMiddleware(Authenticate)
  async setSettings(
    @Arg('settings') settings: Settings,
    @Ctx() { user }: ResolverContext,
  ): Promise<Settings> {
    user = await this.Users.save({ ...user, settings })
    return user.settings
  }
}
