import { CorsOptions } from 'cors'

const origin = ['https://lexicolatin.com', 'https://www.lexicolatin.com']
if (process.env.NODE_ENV === 'production') {
  origin.push('http://web:3000')
} else {
  origin.push('http://localhost:3000')
  origin.push('http://localhost:6006')
}

export const corsOptions = { credentials: true, origin } as CorsOptions
