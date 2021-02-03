import { hash } from "argon2"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Line from "../entity/literature/Line"
import Settings, { SettingsInput } from "../entity/user/Settings"
import User from "../entity/user/User"
import logger from "../utils/log"
import { ResolverContext } from "../utils/ResolverContext"
import { validateEmail, validatePassword } from "../utils/string"

const log = logger.getChildLogger()

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)
  Entries = getConnection().getRepository(Entry)

  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { login }: ResolverContext,
  ) {
    if (!validateEmail(email)) throw new Error("invalid email")
    if (!validatePassword(password)) throw new Error("invalid password")
    if (await this.Users.findOne({ email: email.toLowerCase() }))
      throw new Error("user with this email already exists")
    const user = await this.Users.save({
      email: email.toLowerCase(),
      password: await hash(password),
      provider: "local",
    })
    log.info("registered user:", user.id, email)
    await login(user)
    return user
  }

  @Query(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { authenticate, login }: ResolverContext,
  ) {
    const { user } = await authenticate("graphql-local", {
      email,
      password,
    })
    if (!user) throw new Error("user not found")
    await login(user)
    return user
  }

  @Query(() => User)
  user(@Ctx() { req }: ResolverContext) {
    if (!req.user) throw new Error("no logged in user")
    return req.user
  }

  @Query(() => Boolean)
  logout(@Ctx() { req, logout }: ResolverContext) {
    if (!req.isAuthenticated()) throw new Error("no logged in user")
    logout()
    return true
  }

  @Mutation(() => Boolean)
  async unregister(@Ctx() ctx: ResolverContext) {
    const user = this.user(ctx)
    this.logout(ctx)
    await this.Users.delete(user.id)
    log.info("unregistered user:", user.id, user.email)
    return true
  }

  @Mutation(() => User)
  async setPassword(
    @Arg("password") password: string,
    @Ctx() ctx: ResolverContext,
  ) {
    if (!validatePassword(password)) throw new Error("invalid password")
    const user = this.user(ctx)
    await this.Users.createQueryBuilder()
      .update()
      .set({ password: await hash(password) })
      .where(user)
      .execute()
    log.info("set password for user:", user.id, user.email)
    return user
  }

  @Query(() => [Entry])
  async bookmarks(@Ctx() ctx: ResolverContext) {
    return await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(this.user(ctx))
      .loadMany()
  }

  @Mutation(() => Boolean)
  async bookmark(@Arg("entryId") entryId: number, @Ctx() ctx: ResolverContext) {
    const user = this.user(ctx)
    if (user.bookmarks && user.bookmarks.some((entry) => entry.id === entryId))
      throw new Error("user already has entry bookmarked")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .add(entryId)
    return true
  }

  @Mutation(() => Boolean)
  async unbookmark(
    @Arg("entryId") entryId: number,
    @Ctx() ctx: ResolverContext,
  ) {
    const user = await this.Users.findOne(this.user(ctx).id, {
      relations: ["bookmarks"],
    })
    if (!user?.bookmarks?.every((entry) => entry.id !== entryId))
      throw new Error("user does not have entry bookmarked")
    await this.Users.createQueryBuilder()
      .relation(User, "bookmarks")
      .of(user)
      .remove(entryId)
    return true
  }

  @Query(() => [Line])
  async readings(@Ctx() ctx: ResolverContext) {
    return await this.Users.createQueryBuilder()
      .relation(User, "reaings")
      .of(this.user(ctx))
      .loadMany()
  }

  @Mutation(() => Boolean)
  async saveReading(
    @Arg("lineId") lineId: number,
    @Ctx() ctx: ResolverContext,
  ) {
    const user = this.user(ctx)
    if (user.readings && user.readings.some((line) => line.id === lineId))
      throw new Error("user already has reading saved")
    await this.Users.createQueryBuilder()
      .relation(User, "readings")
      .of(user)
      .add(lineId)
    return true
  }

  @Mutation(() => Boolean)
  async unsaveReading(
    @Arg("lineId") lineId: number,
    @Ctx() ctx: ResolverContext,
  ) {
    const user = await this.Users.findOne(this.user(ctx).id, {
      relations: ["readings"],
    })
    if (!user?.readings?.every((line) => line.id !== lineId))
      throw new Error("user does not have reading saved")
    await this.Users.createQueryBuilder()
      .relation(User, "readings")
      .of(user)
      .remove(lineId)
    return true
  }

  @Query(() => Line)
  async readingSavePoint(
    @Arg("textId") textId: number,
    @Ctx() ctx: ResolverContext,
  ) {
    const user = await this.Users.findOne(this.user(ctx).id, {
      relations: ["readings"],
    })
    const line = user?.readings?.find((line) => line.text.id === textId)
    if (!line) throw new Error("user does not have reading saved")
    return line
  }

  @Query(() => Settings)
  settings(@Ctx() ctx: ResolverContext) {
    return this.user(ctx).settings
  }

  @Mutation(() => Boolean)
  async setSettings(
    @Arg("settings") settings: SettingsInput,
    @Ctx() ctx: ResolverContext,
  ) {
    const user = this.user(ctx)
    user.settings = { ...user.settings, ...settings }
    await this.Users.save(user)
    return true
  }

  @Query(() => [User])
  async users() {
    return await this.Users.find()
  }
}
