import { ApolloServer } from "apollo-server-express"
import dotenv from "dotenv"
import express from "express"
import "reflect-metadata"
import { Logger } from "tslog"
import { createConnection } from "typeorm"
import apolloServerConfig from "./apollo.config"
import typeormConfig, { createViews } from "./typeorm.config"

export const log = new Logger()

async function main() {
  dotenv.config()
  console.log("here")
  await createConnection(typeormConfig)
  await createViews()
  console.log("there")
  const app = express()
  app.use(express.json())
  app.listen(process.env.PORT, () =>
    log.info(`Listening at http://localhost:${process.env.PORT}`),
  )

  const api = new ApolloServer(await apolloServerConfig())
  api.applyMiddleware({ app })
}
main()
