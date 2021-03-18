import dotenv from "dotenv"
import expand from "dotenv-expand"

const env = dotenv.config({ path: "../.env" })
expand(env)

export const {
  LOG_SQL,

  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,

  DATABASE_HOST,
  SERVER_HOST,
  WEB_HOST,
  ELASTICSEARCH_HOST,

  JWT_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
} = process.env
