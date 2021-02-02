import { hash } from "argon2"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { getConnection } from "typeorm"
import Entry from "../entity/dictionary/Entry"
import Settings from "../entity/user/Settings"
import User from "../entity/user/User"
import logger from "../utils/log"
import { ResolverContext } from "../utils/ResolverContext"
import { validateEmail, validatePassword } from "../utils/string"

const log = logger.getChildLogger()

@Resolver(User)
export default class UserResolver {
  Users = getConnection().getRepository(User)

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: ResolverContext,
  ) {
    if (!validateEmail(email)) throw new Error("invalid email")
    if (!validatePassword(password)) throw new Error("invalid password")
    const existingUser = await this.Users.findOne({
      email: email.toLowerCase(),
    })
    if (existingUser)
    const user = await this.Users.save({
      email: email.toLowerCase(),
      password: await hash(password),
    })
    log.info("registered user:", user)
    await this.login(email, password, context)
    return true
  }

  @Mutation(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: ResolverContext,
  ) {
    const { user } = await context.authenticate("graphql-local", {
      email,
      password,
    })
    context.login(user)
    return { user }
  }

  @Query(() => User)
  async me() {}

  @Query(() => User)
  async logout() {}

  @Mutation(() => Boolean)
  async unregister(@Arg("id") id: number) {
    await this.Users.delete(id)
    log.info("unregistered user:", id)
    return true
  }

  @Mutation(() => User)
  async changePassword(@Arg("newPassword") newPassword: string) {
    newPassword
  }

  @Query(() => [Entry])
  async bookmarks(@Ctx() context: ResolverContext) {
    context
  }

  @Mutation(() => Boolean)
  async bookmark(@Arg("entryId") entryId: number) {
    entryId
  }

  @Mutation(() => Boolean)
  async unbookmark(@Arg("entryId") entryId: number) {
    entryId
  }

  @Query(() => Settings)
  async settings() {}

  @Mutation(() => Boolean)
  async setSettings(@Arg("settings") settings: string) {
    settings
  }

  @Query(() => [User])
  async users(@Ctx() { req }: ResolverContext) {
    console.log(req.session)
    return await this.Users.find()
  }
}
