import { sign } from 'jsonwebtoken'

import User from '../entity/user/User'

export function createAccessToken(user: User): string {
  return sign(
    { sub: user.id, iss: 'https://www.lexicolatin.com' },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )
}
