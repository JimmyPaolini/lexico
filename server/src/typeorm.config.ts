import dotenv from "dotenv"
import "reflect-metadata"
import { createConnection } from "typeorm"
import Entry from "./entity/Entry"
import Translation from "./entity/Translation"
import Word from "./entity/Word"

dotenv.config()
export default {
  name: "default",
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "lexico",
  charset: "utf8mb4",
  entities: [Entry, Translation, Word],
  logging: ["log", "info", "schema", "migration", "warn", "error"],
  synchronize: true,
} as Parameters<typeof createConnection>[0]
