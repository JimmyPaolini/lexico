import { sign } from 'jsonwebtoken'

import User from '../../../entity/user/User'

export function createAccessToken(user: User): string {
  return sign(
    { sub: user.id, iss: 'https://www.lexicolatin.com' },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' },
  )
}

export function createPasswordResetToken(email: string): string {
  return sign(
    { sub: email.toLowerCase(), iss: 'https://www.lexicolatin.com' },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  )
}
