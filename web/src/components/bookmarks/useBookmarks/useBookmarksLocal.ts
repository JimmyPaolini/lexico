import { useContext } from 'react'

import { Context } from 'src/components/layout/Context'
import { Entry, useEntriesQuery } from 'src/graphql/generated'

import { getBookmarksLocal } from './getBookmarksLocal'

export const useBookmarksLocal = () => {
  const { user } = useContext(Context)

  const { data, isLoading, isSuccess } = useEntriesQuery(
    { ids: getBookmarksLocal() },
    {
      enabled: !user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }
  )

  return {
    bookmarks: (data?.entries ?? []) as Entry[],
    isLoading,
    isSuccess,
  }
}
