import sgMail from "@sendgrid/mail"
import { hash, verify } from "argon2"
import { verify as verifyJWT } from "jsonwebtoken"
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql"
import { getConnection, IsNull } from "typeorm"
import User from "../../../entity/user/User"
import { JWT_SECRET, SENDGRID_API_KEY } from "../../../utils/env"
import log from "../../../utils/log"
import { validateEmail, validatePassword } from "../../../utils/string"
import {
  Authenticate,
  createAccessToken,
  createPasswordResetToken,
  IsAuthenticated,
} from "../auth/authentication"
import fetchFacebookUser from "../auth/facebook"
import fetchGoogleUser from "../auth/google"
import { ResolverContext } from "../utils/ResolverContext"

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
    if (
      await this.Users.findOne({
        email: email.toLowerCase(),
        facebookId: IsNull(),
        googleId: IsNull(),
      })
    )
      throw new Error("user with this email already exists")
    const user = await this.Users.save({
      email: email.toLowerCase(),
      password: await hash(password),
    })
    log.info("registered basic user", { id: user.id, email })
    return await this.login(email, password, ctx)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(Authenticate)
  async unregister(@Ctx() { user }: ResolverContext) {
    await this.Users.delete(user.id)
    log.info("unregistered user", { id: user.id, email: user.email })
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
    log.info("login basic user", { id: user.id, email })
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async google(
    @Arg("code") code: string,
    @Ctx() { req, res }: ResolverContext,
  ) {
    const profile: any = await fetchGoogleUser(code, req.hostname)
    let user = await this.Users.findOne({ googleId: profile.id })
    if (!user) {
      user = await this.Users.save({
        googleId: profile.id,
        email: profile.email,
      })
    }
    log.info("login google user", { id: user.id, email: user.email })
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => User)
  async facebook(
    @Arg("code") code: string,
    @Ctx() { req, res }: ResolverContext,
  ) {
    const profile: any = await fetchFacebookUser(code, req.hostname)
    let user = await this.Users.findOne({ facebookId: profile.id })
    if (!user) {
      user = await this.Users.save({
        facebookId: profile.id,
        email: profile.email,
      })
    }
    log.info("login facebook user", { id: user.id, email: user.email })
    res.cookie("accessToken", createAccessToken(user), { httpOnly: true })
    return user
  }

  @Query(() => Boolean)
  @UseMiddleware(IsAuthenticated)
  logout(@Ctx() { res }: ResolverContext) {
    res.clearCookie("accessToken")
    return true
  }

  @Mutation(() => Boolean)
  async recoverPassword(@Arg("email") email: string) {
    log.info(`recoverPassword: ${email}`)
    if (!validateEmail(email)) throw new Error("invalid email")
    const user = await this.Users.findOne({
      email: email.toLowerCase(),
      googleId: IsNull(),
      facebookId: IsNull(),
    })
    if (!user) throw new Error("email not found")

    const passwordResetToken = createPasswordResetToken(email)
    await this.Users.update(user.id, { passwordResetToken })

    sgMail.setApiKey(SENDGRID_API_KEY!)
    const origin =
      process.env.NODE_ENV === "production"
        ? "https://www.lexicolatin.com"
        : "http://localhost:3000"
    await sgMail.send({
      to: email,
      from: "Lexico <passwordrecovery@lexicolatin.com>",
      subject: "Lexico Password Recovery",
      html:
        `<h1>Salvē from Lexico! </h1>` +
        `<h2>Click this link to reset your password: ` +
        `<a href="${origin}/user/resetPassword/${passwordResetToken}">Reset Password </a></h2>` +
        `<p>This link expires in 1 day. Please do not respond to this email.</p>` +
        `<p>If you did not request to recover your password, please ignore this email ` +
        `or contact Lexico through <a href="https://join.slack.com/t/lexico-group/shared_invite/zt-qmkx0bwn-SfkHxk4v6QHe7pkDXQaNpQ">Slack</a>.</p>`,
    })
    return true
  }

  @Query(() => Boolean)
  async validatePasswordResetToken(
    @Arg("passwordResetToken") passwordResetToken: string,
  ) {
    const claims = verifyJWT(passwordResetToken, JWT_SECRET!) as any
    if (!claims) throw new Error("invalid password reset token")
    const user = await this.Users.findOneOrFail({
      email: claims.sub.toLowerCase(),
      googleId: IsNull(),
      facebookId: IsNull(),
    })
    if (user.passwordResetToken !== passwordResetToken)
      throw new Error("invalid password reset token")
    return true
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("passwordResetToken") passwordResetToken: string,
    @Arg("password") password: string,
    @Ctx() ctx: ResolverContext,
  ) {
    const claims = verifyJWT(passwordResetToken, JWT_SECRET!) as any
    if (!claims) throw new Error("invalid password reset token")
    if (!validatePassword(password)) throw new Error("invalid password")
    await this.Users.update(
      {
        email: claims.sub.toLowerCase(),
        googleId: IsNull(),
        facebookId: IsNull(),
      },
      { password: await hash(password), passwordResetToken: undefined },
    )
    await this.login(claims.sub, password, ctx)
    return true
  }
}
