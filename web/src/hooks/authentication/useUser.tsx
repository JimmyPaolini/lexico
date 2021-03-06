import { useQuery } from "react-query"
import userQuery from "../../graphql/authentication/user.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useUser() {
  return useQuery(
    "user",
    async () => {
      try {
        const { user: data } = await graphQLClient.request(userQuery)
        return data
      } catch {
        return null
      }
    },
    { retryDelay: 0, staleTime: 0, cacheTime: 0 },
  )
}
