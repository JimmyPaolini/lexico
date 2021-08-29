import { useQuery } from "react-query"
import loginQuery from "../../../graphql/user/login/login.graphql"
import { graphQLClient, queryClient } from "../../../pages/_app"

interface UserInfo {
  email: string
  password: string
}
export default function useLogin(
  userInfo: UserInfo,
): ReturnType<typeof useQuery> {
  return useQuery(
    "login",
    async () => {
      const { searchLatin: data } = await graphQLClient.request(
        loginQuery,
        userInfo,
      )
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
