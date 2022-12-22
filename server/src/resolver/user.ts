import { JwtPayload, verify } from 'jsonwebtoken'
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import { Authenticate } from '../authentication/middleware'
import Settings from '../entity/user/Settings'
import User from '../entity/user/User'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Ctx() context: ResolverContext): Promise<User | null> {
    try {
      if (!context?.req?.cookies?.accessToken || !process.env.JWT_SECRET) {
        return null
      }
      const claims = verify(
        context.req.cookies.accessToken,
        process.env.JWT_SECRET
      ) as JwtPayload
      if (!claims?.sub) return null
      const user = await User.findOne({ where: { id: claims.sub } })
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
    @Ctx() { user }: ResolverContext
  ): Promise<Settings> {
    user = await User.save({ ...user, settings })
    return user.settings
  }
}
