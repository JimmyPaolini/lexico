import { print } from 'graphql'
import { rawRequest } from 'graphql-request'

import { Search, SearchQuery } from 'src/graphql/generated'

export async function searchEntry(search: string) {
  const response = await rawRequest<SearchQuery>(
    'http://localhost:3001/graphql',
    print(Search),
    { search },
  )
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const entry = response.data!.search[0]
  return entry
}
