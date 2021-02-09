import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Line from "../entity/literature/Line"
import Settings, { SettingsInput } from "../entity/user/Settings"
import User from "../entity/user/User"
import { Authenticate } from "../utils/authentication"
import { ResolverContext } from "../utils/ResolverContext"

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)
  Entries = getConnection().getRepository(Entry)

  @Query(() => User)
  @UseMiddleware(Authenticate)
  user(@Ctx() { user }: ResolverContext) {
    return user
  }

  @Query(() => [User])
  async users() {
    return await this.Users.find()
  }

  @Query(() => [Entry])
  @UseMiddleware(Authenticate)
  async bookmarks(@Ctx() { user }: ResolverContext) {
    return await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .loadMany()
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async bookmark(
    @Arg("entryId") entryId: number,
    @Ctx() { user }: ResolverContext,
  ) {
    if (user.bookmarks && user.bookmarks.some((entry) => entry.id === entryId))
      throw new Error("user already has entry bookmarked")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .add(entryId)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unbookmark(
    @Arg("entryId") entryId: number,
    @Ctx() { user }: ResolverContext,
  ) {
    user = (await this.Users.findOne(user.id, {
      relations: ["bookmarks"],
    })) as User
    if (!user?.bookmarks?.every((entry) => entry.id !== entryId))
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
    @Arg("lineId") lineId: number,
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
    @Arg("lineId") lineId: number,
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
    @Arg("textId") textId: number,
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
}
