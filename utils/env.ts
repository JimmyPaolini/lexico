import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

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
