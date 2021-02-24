import { hash, verify } from "argon2"
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection, IsNull } from "typeorm"
import User from "../entity/user/User"
import {
  Authenticate,
  createAccessToken,
  IsAuthenticated,
} from "../utils/authentication"
import fetchFacebookUser from "../utils/facebook"
import fetchGoogleUser from "../utils/google"
import logger from "../utils/log"
import { ResolverContext } from "../utils/ResolverContext"
import { validateEmail, validatePassword } from "../utils/string"

const log = logger.getChildLogger()

@Resolver(User)
export default class AuthenticationResolver {
  Users = getConnection().getRepository(User)

  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ResolverContext,
  ) {
    if (!validateEmail(email)) throw new Error("invalid email")
    if (!validatePassword(password)) throw new Error("invalid password")
    if (await this.Users.findOne({ email: email.toLowerCase() }))
      throw new Error("user with this email already exists")
    const user = await this.Users.save({
      email: email.toLowerCase(),
      password: await hash(password),
    })
    log.info("registered basic user:", user.id, email)
    return await this.login(email, password, ctx)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unregister(@Ctx() { user }: ResolverContext) {
    await this.Users.delete(user.id)
    log.info("unregistered user:", user.id, user.email)
    return true
  }

  @Query(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: ResolverContext,
  ) {
    if (!validateEmail(email)) throw new Error("invalid email")
    if (!validatePassword(password)) throw new Error("invalid password")
    const user = await this.Users.findOne({
      email: email.toLowerCase(),
      googleId: IsNull(),
      facebookId: IsNull(),
    })
    if (!user) throw new Error("email not found")
    if (!(await verify(user.password!, password)))
      throw new Error("incorrect password")
    log.info("login basic user:", user.id, email)
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async google(@Arg("code") code: string, @Ctx() { res }: ResolverContext) {
    const profile: any = await fetchGoogleUser(code)
    let user = await this.Users.findOne({ googleId: profile.id })
    if (!user) {
      user = await this.Users.save({
        googleId: profile.id,
        email: profile.email,
      })
    }
    log.info("login google user:", user.id, user.email)
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async facebook(@Arg("code") code: string, @Ctx() { res }: ResolverContext) {
    const profile: any = await fetchFacebookUser(code)
    let user = await this.Users.findOne({ facebookId: profile.id })
    if (!user) {
      user = await this.Users.save({
        facebookId: profile.id,
        email: profile.email,
      })
    }
    log.info("login facebook user:", user.id, user.email)
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => Boolean)
  @UseMiddleware(IsAuthenticated)
  logout(@Ctx() { res }: ResolverContext) {
    res.cookie("accessToken", "", { maxAge: 0 })
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async setPassword(
    @Arg("password") password: string,
    @Ctx() { user }: ResolverContext,
  ) {
    if (!validatePassword(password)) throw new Error("invalid password")
    await this.Users.update(user.id, { password: await hash(password) })
    return true
  }
}
