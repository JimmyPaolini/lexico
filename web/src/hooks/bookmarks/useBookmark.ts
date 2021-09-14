import { Dispatch, SetStateAction } from "react"
import { useMutation, UseMutationResult } from "react-query"
import bookmarkMutation from "../../graphql/bookmarks/bookmark.graphql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useBookmark(
  setBookmarked: Dispatch<SetStateAction<boolean>>,
): UseMutationResult<any, unknown, string, void> {
  return useMutation(
    async (entryId: string) => {
      console.log(typeof entryId)
      const { bookmark: data } = await graphQLClient.request(bookmarkMutation, {
        entryId,
      })
      return data
    },
    {
      onMutate: async () => {
        await queryClient.cancelMutations()
        setBookmarked(true)
      },
      onError: async () => {
        await queryClient.cancelMutations()
        setBookmarked(false)
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries("bookmarks")
      },
    },
  )
}
