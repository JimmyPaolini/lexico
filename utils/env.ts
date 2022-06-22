import dotenv from 'dotenv'
import expand from 'dotenv-expand'

if (process.env.NODE_ENV !== 'production') {
  const env = dotenv.config({ path: '../.env' })
  expand(env)
}

export const {
  LOG_SQL,

  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,

  JWT_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,

  SLACK_WEBHOOK,
  SENDGRID_API_KEY,
  GOOGLE_ANALYTICS_ID,
} = process.env
