import { useContext } from 'react'

import {
  Entry,
  useBookmarksQuery,
  useEntriesQuery,
} from 'src/graphql/generated'
import { getBookmarksLocal } from 'src/utils/bookmarksLocal'

import { Context } from '../../components/layout/Context'

export const useBookmarks = () => {
  const { user } = useContext(Context)

  const {
    data: remoteBookmarks,
    isLoading: remoteIsLoading,
    isSuccess: remoteIsSuccess,
  } = useBookmarksQuery(
    {},
    {
      enabled: !!user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  )

  const {
    data: localBookmarks,
    isLoading: localIsLoading,
    isSuccess: localIsSuccess,
  } = useEntriesQuery(
    { ids: getBookmarksLocal() },
    {
      enabled: !user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  )

  return {
    bookmarks: ((user ? remoteBookmarks?.bookmarks : localBookmarks?.entries) ??
      []) as Entry[],
    isLoading: user ? remoteIsLoading : localIsLoading,
    isSuccess: user ? remoteIsSuccess : localIsSuccess,
  }
}
