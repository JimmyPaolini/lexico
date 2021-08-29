import { useMutation, UseMutationResult } from "react-query"
import logoutMutation from "../../../graphql/user/login/logout.graphql"
import { graphQLClient, queryClient } from "../../../pages/_app"

export default function useLogout(): UseMutationResult<
  any,
  unknown,
  void,
  unknown
> {
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
