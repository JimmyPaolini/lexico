import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'

import log from '../../../utils/log'
import { Authenticate } from '../authentication/middleware'
import CustomText from '../entity/library/CustomText'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(CustomText)
export class CustomTextResolver {
  CUSTOM_TEXT_COUNT_LIMIT = 3

  @Query(() => [CustomText])
  @UseMiddleware(Authenticate)
  async listCustomTexts(
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText[]> {
    const customTexts = await CustomText.find({
      where: { user: { id: user.id } },
    })
    customTexts.sort((customText1, customText2) =>
      customText1.title.localeCompare(customText2.title),
    )
    return customTexts
  }

  @Query(() => CustomText)
  @UseMiddleware(Authenticate)
  async getCustomText(
    @Arg('id') id: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText> {
    log.info('getCustomText', { id, user: user.email })
    return await CustomText.findOneOrFail({
      where: { id, user: { id: user.id } },
    })
  }

  @Mutation(() => CustomText)
  @UseMiddleware(Authenticate)
  async createCustomText(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('text') text: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText> {
    const customTexts = await CustomText.find({
      where: { user: { id: user.id } },
    })
    if (
      customTexts.length >= this.CUSTOM_TEXT_COUNT_LIMIT &&
      !customTexts.some((customText) => customText.id === id)
    ) {
      throw new Error(
        `user cannot have more than ${this.CUSTOM_TEXT_COUNT_LIMIT} custom texts`,
      )
    }
    const customText = await CustomText.save({ id, title, text, user })
    log.info('createCustomText', {
      id: customText.id,
      title: customText.title,
      user: user.email,
    })
    return customText
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async deleteCustomText(
    @Arg('id') id: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    const customText = await CustomText.findOneOrFail({
      where: { id, user: { id: user.id } },
    })
    await CustomText.delete(customText.id)
    log.info('deleteCustomText', { id, user: user.email })
    return true
  }
}
