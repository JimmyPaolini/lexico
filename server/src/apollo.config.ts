import { ApolloServer } from "apollo-server-express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import IngestionResolver from "./resolver/ingestion"
import TranslationResolver from "./resolver/translation"
import WordResolver from "./resolver/word"

export default async function apolloServerConfig(): Promise<ApolloServerExpressConfig> {
  return {
    schema: await buildSchema({
      resolvers: [WordResolver, TranslationResolver, IngestionResolver],
    }),
  }
}

type ApolloServerExpressConfig = ConstructorParameters<typeof ApolloServer>[0]
