import dotenv from "dotenv"

dotenv.config({ path: "../.env" })

export const {
  PORT,
  POSTGRES_HOST: DB_HOST,
  POSTGRES_PORT: DB_PORT,
  POSTGRES_PASSWORD: DB_PASSWORD,
  POSTGRES_USER: DB_USERNAME,
  POSTGRES_DB: DB_DATABASE,
  LOG_SQL,
  ELASTICSEARCH_HOST,
  JWT_SECRET,
  GOOGLE_ID,
  GOOGLE_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  COMMENT_BOX_EMAIL,
} = process.env
