import { Dispatch, SetStateAction } from 'react'

import { QueryClient } from 'react-query'

import { useBookmarkMutation } from '../../graphql/generated'

export default function useBookmarkRemote(
  queryClient: QueryClient,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) {
  const { mutateAsync: bookmarkRemote } = useBookmarkMutation({
    onMutate: async () => {
      await queryClient.cancelMutations()
      setBookmarked(true)
    },
    onError: async () => {
      await queryClient.cancelMutations()
      setBookmarked(false)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('Bookmarks')
    },
  })
  return bookmarkRemote
}
