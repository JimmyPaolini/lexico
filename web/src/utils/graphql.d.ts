// graphql.d.ts file
declare module "*.gql" {
  import { DocumentNode } from "graphql"

  const value: DocumentNode
  export default value
}
