import {
  AuthorDocument,
  AuthorQuery,
  AuthorQueryVariables,
  EntriesDocument,
  EntriesQuery,
  EntriesQueryVariables,
} from 'src/graphql/generated'

import { fetcher } from '../graphql/fetcher'

export async function getEntry(id: string) {
  const data = await fetcher<EntriesQuery, EntriesQueryVariables>(
    EntriesDocument,
    { ids: [id] }
  )()
  if (!data?.entries?.[0]) throw new Error(`Error getEntry("${id}")`)
  return data.entries[0]
}

export async function getAuthor(id: string) {
  const data = await fetcher<AuthorQuery, AuthorQueryVariables>(
    AuthorDocument,
    { id }
  )()
  if (!data?.author) throw new Error(`Error getAuthor("${id}")`)
  return data.author
}
