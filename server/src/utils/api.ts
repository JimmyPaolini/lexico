import { ApolloServer, CorsOptions } from 'apollo-server-express'
import { Express } from 'express'
import path from 'path'
import { buildSchema } from 'type-graphql'

import {
  AuthenticationResolver,
  BookmarkResolver,
  CustomTextResolver,
  DictionaryResolver,
  LibraryResolver,
  UserResolver,
} from '../resolver'

export async function buildAPI(
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
        LibraryResolver,
        UserResolver,
      ],
      emitSchemaFile: path.join(process.cwd(), './src/graphql/schema.graphql'),
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: process.env.NODE_ENV !== 'production',
  })
  api.applyMiddleware({ app, cors })
  return api
}
