import { ApolloServer } from "apollo-server-express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import { Connection } from "typeorm"
import WordResolver from "./resolver/word"

export default async function apolloServerConfig(
  context: Context,
): Promise<ApolloServerExpressConfig> {
  return {
    schema: await buildSchema({
      resolvers: [WordResolver],
    }),
    context: () => context,
  }
}

export type Context = {
  orm: Connection
}

type ApolloServerExpressConfig = ConstructorParameters<typeof ApolloServer>[0]
