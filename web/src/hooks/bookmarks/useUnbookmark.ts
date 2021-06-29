import { Dispatch, SetStateAction } from "react"
import { useMutation, UseMutationResult } from "react-query"
import unbookmarkMutation from "../../graphql/bookmarks/unbookmark.graphql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useUnbookmark(
  setBookmarked: Dispatch<SetStateAction<boolean>>,
): UseMutationResult<any, unknown, string, void> {
  return useMutation(
    async (entryId: string) => {
      const { unbookmark: data } = await graphQLClient.request(
        unbookmarkMutation,
        { entryId },
      )
      return data
    },
    {
      onMutate: async () => {
        await queryClient.cancelMutations()
        setBookmarked(false)
      },
      onError: async () => {
        await queryClient.cancelMutations()
        setBookmarked(true)
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries("bookmarks")
      },
    },
  )
}
