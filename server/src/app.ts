import { ApolloServer } from "apollo-server-express"
import express from "express"
import "reflect-metadata"
import { Logger } from "tslog"
import { createConnection } from "typeorm"
import apolloServerConfig from "./apolloServer.config"
import ingestAll from "./ingestion/dictionary/index"
import ingestWord from "./ingestion/dictionary/ingestWord"
import typeormConfig from "./typeorm.config"
import clearDatabase from "./utils/clearDatabase"

export const log = new Logger()

async function main() {
  await createConnection(typeormConfig)

  const app = express()
  app.listen(2048, () => console.log("Listening @ http://localhost:2048"))
  app.use(express.json())

  app.get("/clear-database", clearDatabase)

  app.post("/ingest-word", async (req, res) => {
    try {
      await ingestWord(req.body.latin)
      res.status(200).send()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  app.post("/ingest-all", async (req, res) => {
    await ingestAll()
    try {
      await ingestAll(req.body.firstLetter, req.body.lastLetter)
      res.status(200).send()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  const api = new ApolloServer(await apolloServerConfig())
  api.applyMiddleware({ app })
}
main()
