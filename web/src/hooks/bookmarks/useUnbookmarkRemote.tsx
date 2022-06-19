import { Dispatch, SetStateAction } from "react"
import { QueryClient } from "react-query"
import { useUnbookmarkMutation } from "../../graphql/generated"

export default function useUnbookmarkRemote(
  queryClient: QueryClient,
  setBookmarked: Dispatch<SetStateAction<boolean>>,
) {
  const { mutateAsync: unbookmarkRemote } = useUnbookmarkMutation({
    onMutate: async () => {
      await queryClient.cancelMutations()
      setBookmarked(false)
    },
    onError: async () => {
      await queryClient.cancelMutations()
      setBookmarked(true)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("Bookmarks")
    },
  })
  return unbookmarkRemote
}
