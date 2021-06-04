import { useMutation } from "react-query"
import logoutMutation from "../../graphql/authentication/logout.graphql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useLogout() {
  return useMutation(
    "logout",
    async () => {
      const { logout: data } = await graphQLClient.request(logoutMutation)
      return data
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("user")
      },
    },
  )
}
