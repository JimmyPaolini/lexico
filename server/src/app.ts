import { ApolloServer } from "apollo-server-express"
import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"
import apolloServerConfig from "./apolloServer.config"
import ingestAll from "./ingestion/dictionary/index"
import dictoinaryTest from "./ingestion/dictionary/index.test"
import typeormConfig from "./typeorm.config"
import clearDatabase from "./utils/clearDatabase"

async function main() {
  await createConnection(typeormConfig)

  const app = express()
  app.listen(2048)
  app.use(express.json())

  const api = new ApolloServer(await apolloServerConfig())
  api.applyMiddleware({ app })

  app.get("/clear-database", clearDatabase)

  app.post("/ingest-word", async (req, res) => {
    try {
      console.log(req.body)
      await dictoinaryTest(req.body.latin)
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
}
main()
