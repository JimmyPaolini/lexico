import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import { ResolverContext } from '../config/ResolverContext'
import Entry from '../entity/dictionary/Entry'
import User from '../entity/user/User'
import { Authenticate } from '../services/authentication/middleware'
import { Log } from '../services/log'

@Resolver(Entry)
export class BookmarkResolver {
  @Query(() => [Entry])
  @UseMiddleware(Authenticate)
  async bookmarks(@Ctx() { user: { id } }: ResolverContext): Promise<Entry[]> {
    const user = await User.findOneOrFail({
      where: { id },
      relations: { bookmarks: true },
    })

    return (
      user.bookmarks?.map((entry) => {
        entry.bookmarked = true
        return entry
      }) ?? []
    )
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  @Log({
    mapParams: (params) => params[0],
    mapResult: (entries: Entry[]) => entries.map(({ id }) => id),
  })
  async bookmark(
    @Arg('entryId') entryId: string,
    @Ctx() { user }: ResolverContext
  ): Promise<boolean> {
    const bookmarks = await this.bookmarks({ user } as ResolverContext)
    if (bookmarks.some((entry) => entry.id === entryId)) {
      throw new Error('user already has entry bookmarked')
    }
    if (bookmarks.length > 1000) {
      throw new Error('user cannot have over 1000 bookmarks')
    }
    await User.createQueryBuilder()
      .relation(User, 'bookmarks')
      .of(user)
      .add(entryId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  @Log({
    mapParams: (params) => params[0],
    mapResult: (entries: Entry[]) => entries.map(({ id }) => id),
  })
  async unbookmark(
    @Arg('entryId') entryId: string,
    @Ctx() { user }: ResolverContext
  ): Promise<boolean> {
    const bookmarks = await this.bookmarks({ user } as ResolverContext)
    if (!bookmarks.some((entry) => entry.id === entryId)) {
      throw new Error('user does not have entry bookmarked')
    }
    await User.createQueryBuilder()
      .relation(User, 'bookmarks')
      .of(user)
      .remove(entryId)
    return true
  }
}
