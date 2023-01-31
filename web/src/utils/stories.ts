import { rawRequest } from 'graphql-request'

import {
  AuthorDocument,
  AuthorQuery,
  AuthorQueryVariables,
  EntriesDocument,
  EntriesQuery,
  EntriesQueryVariables,
} from 'src/graphql/generated'

export async function getEntry(id: string) {
  const response = await rawRequest<EntriesQuery, EntriesQueryVariables>(
    'http://localhost:3001/graphql',
    EntriesDocument,
    { ids: [id] }
  )
  if (!response?.data?.entries?.[0]) throw new Error(`Error getEntry("${id}")`)
  return response.data.entries[0]
}

export async function getAuthor(id: string) {
  const response = await rawRequest<AuthorQuery, AuthorQueryVariables>(
    'http://localhost:3001/graphql',
    AuthorDocument,
    { id }
  )
  if (!response?.data?.author) throw new Error(`Error getAuthor("${id}")`)
  return response.data.author
}
