import { print } from "graphql"
import { rawRequest } from "graphql-request"
import { SearchLatin, SearchLatinQuery } from "../graphql/generated"

export async function searchEntry(search: string) {
  const response = await rawRequest<SearchLatinQuery>(
    "http://localhost:3001/graphql",
    print(SearchLatin),
    { search },
  )
  const entry = response.data!.searchLatin[0]
  return entry
}
