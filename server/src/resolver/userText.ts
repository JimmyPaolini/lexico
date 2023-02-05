import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import { ResolverContext } from '../config/ResolverContext'
import CustomText from '../entity/library/CustomText'
import { Authenticate } from '../services/authentication/middleware'
import { Log } from '../services/log'

@Resolver(CustomText)
export class UserTextResolver {
  USER_TEXT_COUNT_LIMIT = 3

  @Query(() => [CustomText])
  @UseMiddleware(Authenticate)
  async userTexts(@Ctx() { user }: ResolverContext): Promise<CustomText[]> {
    const userTexts = await CustomText.findBy({
      user: { id: user.id },
    })
    userTexts.sort((userText1, userText2) =>
      userText1.title.localeCompare(userText2.title)
    )
    return userTexts
  }

  @Query(() => CustomText)
  @UseMiddleware(Authenticate)
  @Log({
    mapParams: ([id]) => id,
    mapResult: ({ id, title, user }) => ({ id, title, user: user.email }),
  })
  async userText(
    @Arg('id') id: string,
    @Ctx() { user }: ResolverContext
  ): Promise<CustomText> {
    return await CustomText.findOneByOrFail({ id, user: { id: user.id } })
  }

  @Mutation(() => CustomText)
  @UseMiddleware(Authenticate)
  @Log({
    mapParams: ([id, title]) => ({ id, title }),
    mapResult: ({ id, title, user }) => ({ id, title, user: user.email }),
  })
  async createUserText(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('text') text: string,
    @Ctx() { user }: ResolverContext
  ): Promise<CustomText> {
    const userTexts = await CustomText.findBy({
      user: { id: user.id },
    })
    if (
      userTexts.length >= this.USER_TEXT_COUNT_LIMIT &&
      !userTexts.some((userText) => userText.id === id)
    ) {
      throw new Error(
        `user cannot have more than ${this.USER_TEXT_COUNT_LIMIT} user texts`
      )
    }
    const userText = await CustomText.save({ id, title, text, user })
    return userText
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  @Log({
    mapParams: ([id]) => id,
    logResult: false,
  })
  async deleteUserText(
    @Arg('id') id: string,
    @Ctx() { user }: ResolverContext
  ): Promise<boolean> {
    const userText = await CustomText.findOneByOrFail({
      id,
      user: { id: user.id },
    })
    await CustomText.delete(userText.id)
    return true
  }
}
