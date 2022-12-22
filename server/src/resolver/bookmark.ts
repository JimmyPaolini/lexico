import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import { Authenticate } from '../authentication/middleware'
import Entry from '../entity/dictionary/Entry'
import User from '../entity/user/User'
import { ResolverContext } from '../utils/ResolverContext'

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
