import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { getConnection } from "typeorm"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../config.json"
import User from "../entity/user/User"

// passport.use(
//   new LocalStrategy((email: any, password: any, done: any) => {
//     console.log("local strategy", email, password, done)
//     // const Users = getConnection().getRepository(User)
//     return done(null, { hi: "there" })
//     // const user = await Users.findOne({ email })
//     // if (!user) return done(new Error("incorrect email"))
//     // if (!(await verify(user.password, password)))
//     //   return done(new Error("incorrect password"))
//     // return done(null, user)
//   }),
// )

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2048/auth/google/callback",
    },
    async (token: any, _, profile: any, done: any) => {
      console.log(token, profile)
      const Users = getConnection().getRepository(User)
      try {
        let user = await Users.findOne({ where: { googleId: profile.id } })
        if (!user) user = await Users.save({ googleId: profile.id })
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user: User, done) => {
  done(null, user)
})
