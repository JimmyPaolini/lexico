import { Request, Response } from "express"
import { PassportContext } from "graphql-passport"
import User from "../entity/user/User"

export interface ResolverContext extends PassportContext<User, Request> {
  req: Request
  res: Response
  authenticate: any
  login: any
}
