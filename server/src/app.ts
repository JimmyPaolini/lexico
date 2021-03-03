import { ApolloServer } from "apollo-server-express"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { PORT } from "../../config.json"
import { connectDatabase } from "../../utils/database"
import logger from "../../utils/log"
import AuthenticationResolver from "./resolver/authentication"
import DictionaryResolver from "./resolver/dictionary"
import LiteratureResolver from "./resolver/literature"
import UserResolver from "./resolver/user"
import { createDbViews } from "./utils/database"

const log = logger.getChildLogger()

async function main() {
  await connectDatabase()
  await createDbViews()

  const app = express()
  const corsOptions = {
    credentials: true,
    // origin: ["http://localhost:3000", "https://lexicolatin.com"],
  }
  app.use(cors(corsOptions))
  app.use(cookieParser())

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
