import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { connectDatabase } from "../../utils/database"
import { PORT } from "../../utils/env"
import log from "../../utils/log"
import AuthenticationResolver from "./resolver/authentication"
import DictionaryResolver from "./resolver/dictionary"
import LiteratureResolver from "./resolver/literature"
import UserResolver from "./resolver/user"
import { createDbViews } from "./utils/database"

async function main() {
  if (process.env.NODE_ENV === "production")
    log.info("environment is production")
  await connectDatabase()
  await createDbViews()

  const app = express()
  const corsOptions = {
    credentials: true,
    origin: ["http://localhost:3000", "https://lexicolatin.com"],
  }
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.get("/", (_, res) => res.send("ok"))

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        LiteratureResolver,
        AuthenticationResolver,
        UserResolver,
      ],
      emitSchemaFile: "./server/src/schema.gql",
    }),
    context: ({ req, res }) => ({ req, res }),
  })
  server.applyMiddleware({ app, cors: corsOptions })

  app.listen(PORT, () => log.info(`listening at http://localhost:${PORT}`))
}
main()
