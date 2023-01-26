import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { Entry, useBookmarksQuery } from 'src/graphql/generated'

export const useBookmarksRemote = () => {
  const { user } = useLexicoContext()

  const { data, isLoading, isSuccess } = useBookmarksQuery(
    {},
    {
      enabled: !!user,
      retryDelay: 0,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    }
  )

  return {
    bookmarks: (data?.bookmarks ?? []) as Entry[],
    isLoading,
    isSuccess,
  }
}
