import { ApolloServer } from "apollo-server-express"
import "reflect-metadata"
import { buildSchema } from "type-graphql"
import DictionaryIngestionResolver from "./resolver/dictionaryIngestionResolver"
import DictionaryResolver from "./resolver/dictionaryResolver"
import LiteratureIngestionResolver from "./resolver/literatureIngestionResolver"
import LiteratureResolver from "./resolver/literatureResolver"

export default async function apolloServerConfig(): Promise<ApolloServerExpressConfig> {
  return {
    schema: await buildSchema({
      resolvers: [
        DictionaryResolver,
        DictionaryIngestionResolver,
        LiteratureResolver,
        LiteratureIngestionResolver,
      ],
    }),
  }
}

type ApolloServerExpressConfig = ConstructorParameters<typeof ApolloServer>[0]
