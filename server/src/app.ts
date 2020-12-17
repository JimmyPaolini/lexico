// import { ApolloServer } from "apollo-server-express"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import "reflect-metadata"
import { createConnection } from "typeorm"
import apolloServerConfig from "./apolloServer.config"
import ingestAll from "./ingestion/dictionary/index"
import dictoinaryTest from "./ingestion/dictionary/index.test"
// import apolloServerConfig from "./apolloServer.config"
import typeormConfig from "./typeorm.config"
import clearDatabase from "./utils/clearDatabase"

async function main() {
  const orm = await createConnection(typeormConfig)

  const app = express()
  app.listen(2048)
  app.use(express.json())

  const api = new ApolloServer(await apolloServerConfig({ orm }))
  api.applyMiddleware({ app })

  app.get("/clear-database", clearDatabase)

  app.get("/dictionary-test", async (_, res) => {
    try {
      await dictoinaryTest()
      res.status(200).send()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  app.post("/ingest", async (req, res) => {
    try {
      console.log(req.body)
      await dictoinaryTest(req.body.latin)
      res.status(200).send()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  app.get("/ingest-all", async () => await ingestAll())
}
main()
