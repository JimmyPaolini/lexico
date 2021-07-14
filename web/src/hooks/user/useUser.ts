import { useQuery } from "react-query"
import userQuery from "../../graphql/user/user.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useUser(): ReturnType<typeof useQuery> {
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
    {
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      retryDelay: 0,
    },
  )
}
