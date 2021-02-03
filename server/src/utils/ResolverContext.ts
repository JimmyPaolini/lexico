import { Context } from "graphql-passport/lib/buildContext"
import User from "../entity/user/User"

export interface ResolverContext extends Context<User> {}
