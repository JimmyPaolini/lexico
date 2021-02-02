import { verify } from "argon2"
import { GraphQLLocalStrategy } from "graphql-passport"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { getConnection } from "typeorm"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config.json"
import User from "../entity/user/User"
import { validateEmail, validatePassword } from "./string"

passport.use(
  new GraphQLLocalStrategy(async (email: any, password: any, done: any) => {
    if (!validateEmail(email)) return done(new Error("invalid email"))
    if (!validatePassword(password)) return done(new Error("invalid password"))
    const Users = getConnection().getRepository(User)
    const user = await Users.findOne({ email: email.toLowerCase() })
    if (!user) return done(new Error("user not found"))
    if (!(await verify(user.password, password)))
      return done(new Error("incorrect password"))
    done(null, user)
  }),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/google/callback",
    },
    async (_, __, profile: any, done: any) => {
      console.log(profile)
      const Users = getConnection().getRepository(User)
      let user = await Users.findOne({ where: { googleId: profile.id } })
      if (!user)
        user = await Users.save({
          googleId: profile.id,
          email: profile._json.email_verified ? profile._json.email : undefined,
        })
      return done(null, user)
    },
  ),
)

passport.serializeUser<number>((user, done) => {
  console.log("serialize", user)
  done(null, (user as User).id)
})

passport.deserializeUser(async (id: number, done) => {
  console.log("deserialize", id)
  const Users = getConnection().getRepository(User)
  let user = await Users.findOne(id)
  if (!user) return new Error("user not found")
  return done(null, user)
})
