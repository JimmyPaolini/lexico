import axios from "axios"
import { verify } from "jsonwebtoken"
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
import Line from "../../../entity/literature/Line"
import Settings, { SettingsInput } from "../../../entity/user/Settings"
import User from "../../../entity/user/User"
import { JWT_SECRET, SLACK_WEBHOOK } from "../../../utils/env"
import { Authenticate } from "../auth/authentication"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)
  Entries = getConnection().getRepository(Entry)

  @Query(() => User)
  @UseMiddleware(Authenticate)
  async user(@Ctx() context: ResolverContext) {
    if (!context.req.cookies.accessToken) return null
    const claims = verify(context.req.cookies.accessToken, JWT_SECRET!) as any
    if (!claims) return null
    return (await this.Users.findOne(claims.sub)) || null
  }

  @Query(() => [User])
  async users() {
    return await this.Users.find()
  }

  @Query(() => [Entry])
  @UseMiddleware(Authenticate)
  async bookmarks(@Ctx() { user: { id } }: ResolverContext): Promise<Entry[]> {
    const user = await this.Users.findOne(id, {
      relations: ["bookmarks"],
    })
    // if (!user!.bookmarks) throw new Error("user has no bookmarks")
    return (
      user!.bookmarks?.map((entry) => {
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
  ) {
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
  ) {
    const bookmarks = await this.bookmarks({ user } as ResolverContext)
    if (!bookmarks.some((entry) => entry.id == entryId))
      throw new Error("user does not have entry bookmarked")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .remove(entryId)
    return true
  }

  @Query(() => [Line])
  @UseMiddleware(Authenticate)
  async readings(@Ctx() { user }: ResolverContext) {
    return await this.Users.createQueryBuilder()
      .relation(User, "reaings")
      .of(user)
      .loadMany()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async saveReading(
    @Arg("lineId") lineId: string,
    @Ctx() { user }: ResolverContext,
  ) {
    if (user.readings && user.readings.some((line) => line.id === lineId))
      throw new Error("user already has reading saved")
    await this.Users.createQueryBuilder()
      .relation(User, "readings")
      .of(user)
      .add(lineId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unsaveReading(
    @Arg("lineId") lineId: string,
    @Ctx() { user }: ResolverContext,
  ) {
    user = (await this.Users.findOne(user.id, {
      relations: ["readings"],
    })) as User
    if (!user.readings?.every((line) => line.id !== lineId))
      throw new Error("user does not have reading saved")
    await this.Users.createQueryBuilder()
      .relation(User, "readings")
      .of(user)
      .remove(lineId)
    return true
  }

  @Query(() => Line)
  @UseMiddleware(Authenticate)
  async readingSavePoint(
    @Arg("textId") textId: string,
    @Ctx() { user }: ResolverContext,
  ) {
    user = (await this.Users.findOne(user.id, {
      relations: ["readings"],
    })) as User
    const line = user.readings?.find((line) => line.text.id === textId)
    if (!line) throw new Error("user does not have reading saved")
    return line
  }

  @Query(() => Settings)
  @UseMiddleware(Authenticate)
  settings(@Ctx() { user }: ResolverContext) {
    return user.settings
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async setSettings(
    @Arg("settings") settings: SettingsInput,
    @Ctx() { user }: ResolverContext,
  ) {
    user.settings = { ...user.settings, ...settings }
    await this.Users.save(user)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async comment(
    @Arg("comment") comment: string,
    @Ctx() { user }: ResolverContext,
  ) {
    const { id, email, googleId, facebookId } = user
    const header = `From: ${email}${
      googleId ? " (Google)" : facebookId ? " (Facebook)" : ""
    } [${id}]`
    await axios.post(SLACK_WEBHOOK!, {
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
