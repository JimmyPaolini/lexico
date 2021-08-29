import { useMutation, UseMutationResult } from "react-query"
import unregisterMutation from "../../../graphql/user/login/unregister.graphql"
import { graphQLClient, queryClient } from "../../../pages/_app"

export default function useUnregister(): UseMutationResult<
  any,
  unknown,
  void,
  unknown
> {
  return useMutation(
    "unregister",
    async () => {
      const { unregister: data } = await graphQLClient.request(
        unregisterMutation,
      )
      return data
    },
    {
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries("user")
      },
    },
  )
}
