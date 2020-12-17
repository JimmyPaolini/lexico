import "reflect-metadata"
import { createConnection } from "typeorm"
import Translation from "./entity/Translation"
import Word from "./entity/Word"

export default {
  name: "default",
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "admin",
  password: "admin",
  database: "lexico",
  entities: [Word, Translation],
  logging: ["log", "info", "warn", "error"],
  synchronize: true,
} as Parameters<typeof createConnection>[0]
