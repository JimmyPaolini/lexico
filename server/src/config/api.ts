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
import { EntryResolver } from '../resolver/entry'
import { WordResolver } from '../resolver/word'

export async function initializeGraphqlApi(
  app: Express,
  cors: CorsOptions
): Promise<ApolloServer> {
  const api = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthenticationResolver,
        BookmarkResolver,
        CustomTextResolver,
        DictionaryResolver,
        EntryResolver,
        LibraryResolver,
        UserResolver,
        WordResolver,
      ],
      emitSchemaFile: path.join(process.cwd(), './src/graphql/schema.graphql'),
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
  })
  await api.start()
  api.applyMiddleware({ app, cors })
  return api
}
