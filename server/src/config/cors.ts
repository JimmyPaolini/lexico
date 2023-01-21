import { CorsOptions } from 'cors'

export const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === 'production'
      ? [
          'https://lexicolatin.com',
          'https://www.lexicolatin.com',
          'http://web:3000',
        ]
      : ['http://localhost:3000', 'http://localhost:6006'],
} as CorsOptions
