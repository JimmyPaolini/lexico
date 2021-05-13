import { useMutation } from "react-query"
import unregisterMutation from "../../graphql/authentication/unregister.graphql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useUnregister() {
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
