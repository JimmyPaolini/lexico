import { rawRequest } from 'graphql-request'

import {
  AuthorDocument,
  AuthorQuery,
  AuthorQueryVariables,
  EntryDocument,
  EntryQuery,
  EntryQueryVariables,
} from 'src/graphql/generated'

export async function getEntry(id: string) {
  const response = await rawRequest<EntryQuery, EntryQueryVariables>(
    'http://localhost:3001/graphql',
    EntryDocument,
    { id }
  )
  if (!response?.data?.entry) throw new Error(`Error getEntry("${id}")`)
  return response.data.entry
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
