import { Request, Response } from 'express'

import Entry from '../entity/dictionary/Entry'
import User from '../entity/user/User'

export type ResolverContext = {
  req: Request
  res: Response
  user: User
  bookmarks?: Entry[]
}
