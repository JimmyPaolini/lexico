import axios from "axios"
import { JwtPayload, verify } from "jsonwebtoken"
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../../../entity/dictionary/Entry"
import CustomText from "../../../entity/literature/CustomText"
import Settings, { SettingsInput } from "../../../entity/user/Settings"
import User from "../../../entity/user/User"
import { JWT_SECRET, SLACK_WEBHOOK } from "../../../utils/env"
import log from "../../../utils/log"
import { Authenticate } from "../auth/token"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)
  Entries = getConnection().getRepository(Entry)
  CustomTexts = getConnection().getRepository(CustomText)

  @Query(() => User)
  @UseMiddleware(Authenticate)
  async user(@Ctx() context: ResolverContext): Promise<User | null> {
    if (!context.req.cookies.accessToken) return null
    const claims = verify(
      context.req.cookies.accessToken,
      JWT_SECRET as string,
    ) as JwtPayload
    if (!claims) return null
    return (await this.Users.findOne(claims.sub)) || null
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.Users.find()
  }

  @Query(() => [Entry])
  @UseMiddleware(Authenticate)
  async bookmarks(@Ctx() { user: { id } }: ResolverContext): Promise<Entry[]> {
    const user = await this.Users.findOneOrFail(id, {
      relations: ["bookmarks"],
    })
    // if (!user!.bookmarks) throw new Error("user has no bookmarks")
    return (
      user.bookmarks?.map((entry) => {
        entry.bookmarked = true
        return entry
      }) || []
    )
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async bookmark(
    @Arg("entryId") entryId: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    const bookmarks = await this.bookmarks({ user } as ResolverContext)
    if (bookmarks.some((entry) => entry.id == entryId))
      throw new Error("user already has entry bookmarked")
    if (bookmarks.length > 1000)
      throw new Error("user cannot have over 1000 bookmarks")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .add(entryId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unbookmark(
    @Arg("entryId") entryId: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    const bookmarks = await this.bookmarks({ user } as ResolverContext)
    if (!bookmarks.some((entry) => entry.id == entryId))
      throw new Error("user does not have entry bookmarked")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .remove(entryId)
    return true
  }

  @Query(() => Settings)
  @UseMiddleware(Authenticate)
  settings(@Ctx() { user }: ResolverContext): Settings {
    return user.settings
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async setSettings(
    @Arg("settings") settings: SettingsInput,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    user.settings = { ...user.settings, ...settings }
    await this.Users.save(user)
    return true
  }

  @Query(() => [CustomText])
  @UseMiddleware(Authenticate)
  async listCustomTexts(
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText[]> {
    const customTexts = await this.CustomTexts.find({ user })
    return customTexts || []
  }

  @Query(() => CustomText)
  @UseMiddleware(Authenticate)
  async getCustomText(
    @Arg("id") id: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText> {
    log.info("getCustomText", { id, user: user.email })
    return await this.CustomTexts.findOneOrFail({ id, user })
  }

  @Mutation(() => CustomText)
  @UseMiddleware(Authenticate)
  async createCustomText(
    @Arg("id") id: string,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<CustomText> {
    const customTexts = await this.CustomTexts.find({ user })
    if (
      customTexts.length >= 3 &&
      !customTexts.some((customText) => customText.id === id)
    )
      throw new Error("user cannot have more than 3 custom texts")
    const customText = await this.CustomTexts.save({ id, title, text, user })
    log.info("createCustomText", { ...customText, user: user.email })
    return customText
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async deleteCustomText(
    @Arg("id") id: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    await this.CustomTexts.delete({ id, user })
    log.info("deleteCustomText", { id, user: user.email })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async comment(
    @Arg("comment") comment: string,
    @Ctx() { user }: ResolverContext,
  ): Promise<boolean> {
    const { id, email, googleId, facebookId } = user
    const header = `From: ${email}${
      googleId ? " (Google)" : facebookId ? " (Facebook)" : ""
    } [${id}]`
    await axios.post(SLACK_WEBHOOK as string, {
      blocks: [
        {
          type: "header",
          text: { type: "plain_text", text: header },
        },
        {
          type: "section",
          text: { type: "plain_text", text: comment },
        },
      ],
    })
    return true
  }
}
