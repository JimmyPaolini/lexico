import { useQuery } from "react-query"
import logoutQuery from "../../graphql/authentication/logout.gql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useLogout() {
  return useQuery(
    "logout",
    async () => {
      const { logout: data } = await graphQLClient.request(logoutQuery)
      return data
    },
    {
      enabled: false,
      retry: false,
      onSuccess: async () => {
        await queryClient.invalidateQueries("user")
      },
    },
  )
}
