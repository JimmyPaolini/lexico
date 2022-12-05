import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'
import CustomText from '../../../entity/literature/CustomText'
import log from '../../../utils/log'
import { Authenticate } from '../authentication/middleware'
import { ResolverContext } from '../utils/ResolverContext'

@Resolver(CustomText)
export default class CustomTextResolver {
  CustomTexts = getConnection().getRepository(CustomText)
  CUSTOM_TEXT_COUNT_LIMIT = 3

  @Query(() => [CustomText])
  @UseMiddleware(Authenticate)
  async listCustomTexts(
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText[]> {
    const customTexts = await this.CustomTexts.find({ user })
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
    return await this.CustomTexts.findOneOrFail({ id, user })
  }

  @Mutation(() => CustomText)
  @UseMiddleware(Authenticate)
  async createCustomText(
    @Arg('id') id: string,
    @Arg('title') title: string,
    @Arg('text') text: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText> {
    const customTexts = await this.CustomTexts.find({ user })
    if (
      customTexts.length >= this.CUSTOM_TEXT_COUNT_LIMIT &&
      !customTexts.some((customText) => customText.id === id)
    )
      throw new Error(
        `user cannot have more than ${this.CUSTOM_TEXT_COUNT_LIMIT} custom texts`,
      )
    const customText = await this.CustomTexts.save({ id, title, text, user })
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
    await this.CustomTexts.delete({ id, user })
    log.info('deleteCustomText', { id, user: user.email })
    return true
  }
}
