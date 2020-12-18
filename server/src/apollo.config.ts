import { ApolloServer } from "apollo-server-express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import EntryResolver from "./resolver/entryResolver"
import IngestionResolver from "./resolver/ingestionResolver"
import TranslationResolver from "./resolver/translationResolver"

export default async function apolloServerConfig(): Promise<ApolloServerExpressConfig> {
  return {
    schema: await buildSchema({
      resolvers: [EntryResolver, TranslationResolver, IngestionResolver],
    }),
  }
}

type ApolloServerExpressConfig = ConstructorParameters<typeof ApolloServer>[0]
