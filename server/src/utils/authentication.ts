import { verify } from "argon2"
import { GraphQLLocalStrategy as LocalStrategy } from "graphql-passport"
import passport from "passport"
import {
  Profile as FacebookProfile,
  Strategy as FacebookStrategy,
} from "passport-facebook"
import {
  Profile as GoogleProfile,
  Strategy as GoogleStrategy,
  VerifyCallback as VerifyCallback,
} from "passport-google-oauth20"
import { getConnection } from "typeorm"
import {
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
} from "../config.json"
import User from "../entity/user/User"
import { validateEmail, validatePassword } from "./string"

passport.use(
  new LocalStrategy(async (email: any, password: any, done: VerifyCallback) => {
    if (!validateEmail(email)) return done(new Error("invalid email"))
    if (!validatePassword(password)) return done(new Error("invalid password"))
    const Users = getConnection().getRepository(User)
    const user = await Users.findOne({ email: email.toLowerCase() })
    if (!user) return done(new Error("user not found"))
    if (!user.password) return done(new Error("user has no password"))
    if (!(await verify(user.password, password)))
      return done(new Error("incorrect password"))
    done(undefined, user)
  }),
)

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: "http://localhost:3001/google/callback",
    },
    async (_, __, profile: GoogleProfile, done: VerifyCallback) => {
      const Users = getConnection().getRepository(User)
      let user = await Users.findOne({ googleId: profile.id })
      if (!user) {
        user = await Users.save({
          googleId: profile.id,
          email: profile._json.email,
          provider: "google",
        })
      }
      return done(undefined, user)
    },
  ),
)

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: FACEBOOK_SECRET,
      callbackURL: "http://localhost:3001/facebook/callback",
      profileFields: ["id", "email"],
    },
    async (_, __, profile: FacebookProfile, done: VerifyCallback) => {
      console.log(profile)
      const Users = getConnection().getRepository(User)
      let user = await Users.findOne({ facebookId: profile.id })
      if (!user) {
        user = await Users.save({
          facebookId: profile.id,
          email: profile._json.email,
          provider: "facebook",
        })
      }
      return done(undefined, user)
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, (user as User).id)
})

passport.deserializeUser(async (id: number, done) => {
  const Users = getConnection().getRepository(User)
  let user = await Users.findOne(id)
  if (!user) return done(new Error("user not found"))
  return done(null, user)
})
