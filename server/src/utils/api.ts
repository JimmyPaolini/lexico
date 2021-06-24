import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import path from "path"
import { buildSchema } from "type-graphql"
import AuthenticationResolver from "../resolver/authentication"
import DictionaryResolver from "../resolver/dictionary"
import LiteratureResolver from "../resolver/literature"
import UserResolver from "../resolver/user"

export default async function buildAPI(app: Express, cors: any) {
  const api = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        LiteratureResolver,
        AuthenticationResolver,
        UserResolver,
      ],
      emitSchemaFile: path.join(process.cwd(), "./src/utils/schema.graphql"),
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  })
  api.applyMiddleware({ app, cors })
  return api
}
