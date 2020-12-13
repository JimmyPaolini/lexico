import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"
import Translation from "./entity/Translation"
import Word from "./entity/Word"

main()
async function main() {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "lexico",
    entities: [Word, Translation],
    migrations: ["src/migration/**/*.ts"],
    logging: true,
    synchronize: true,
  })

  const app = express()
  app.listen(4020, () => {
    console.log("app.ts listening on localhost:4020")
  })

  connection.createEntityManager()
  // await create(em)
  // await script(em)
}
