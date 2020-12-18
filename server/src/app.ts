import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"
import express from "express"
import "reflect-metadata"
import { Logger } from "tslog"
import { createConnection } from "typeorm"
import apolloServerConfig from "./apollo.config"
import typeormConfig from "./typeorm.config"
import script from "./utils/script"
export const log = new Logger()

async function main() {
  dotenv.config()

  await createConnection(typeormConfig)

  const app = express()
  app.use(express.json())
  app.listen(process.env.PORT, () =>
    log.info(`Listening @ http://localhost:${process.env.PORT}`),
  )
  app.get("/script", async (_, res) => {
    try {
      await script()
      res.status(200).send()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  const api = new ApolloServer(await apolloServerConfig())
  api.applyMiddleware({ app })
}
main()
