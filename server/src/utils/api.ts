import { ApolloServer, CorsOptions } from 'apollo-server-express'
import { Express } from 'express'
import path from 'path'
import { buildSchema } from 'type-graphql'
import AuthenticationResolver from '../resolver/authentication'
import BookmarkResolver from '../resolver/bookmark'
import CustomTextResolver from '../resolver/customText'
import DictionaryResolver from '../resolver/dictionary'
import LiteratureResolver from '../resolver/literature'
import UserResolver from '../resolver/user'

export default async function buildAPI(
  app: Express,
  cors: CorsOptions,
): Promise<ApolloServer> {
  const api = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthenticationResolver,
        BookmarkResolver,
        CustomTextResolver,
        DictionaryResolver,
        LiteratureResolver,
        UserResolver,
      ],
      emitSchemaFile: path.join(process.cwd(), './src/utils/schema.graphql'),
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: process.env.NODE_ENV !== 'production',
  })
  api.applyMiddleware({ app, cors })
  return api
}
