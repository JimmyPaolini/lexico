import { Request, Response } from "express"
import User from "../entity/user/User"

export interface ResolverContext {
  req: Request
  res: Response
  user: User
}
