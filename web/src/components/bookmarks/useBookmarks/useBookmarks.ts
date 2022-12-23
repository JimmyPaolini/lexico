import { useContext } from 'react'

import { Context } from 'src/components/layout/Context'
import { Entry } from 'src/graphql/generated'

import { useBookmarksLocal } from './useBookmarksLocal'
import { useBookmarksRemote } from './useBookmarksRemote'

export const useBookmarks = () => {
  const { user } = useContext(Context)

  const {
    bookmarks: remoteBookmarks,
    isLoading: remoteIsLoading,
    isSuccess: remoteIsSuccess,
  } = useBookmarksRemote()

  const {
    bookmarks: localBookmarks,
    isLoading: localIsLoading,
    isSuccess: localIsSuccess,
  } = useBookmarksLocal()

  return {
    bookmarks: ((user ? remoteBookmarks : localBookmarks) ?? []) as Entry[],
    isLoading: user ? remoteIsLoading : localIsLoading,
    isSuccess: user ? remoteIsSuccess : localIsSuccess,
  }
}