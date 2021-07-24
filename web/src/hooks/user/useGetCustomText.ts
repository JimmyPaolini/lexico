import { useQuery } from "react-query"
import getCustomTextQuery from "../../graphql/user/getCustomText.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useGetCustomText(
  id: string,
): ReturnType<typeof useQuery> {
  return useQuery(
    ["getCustomText", id],
    async () => {
      const { getCustomText: data } = await graphQLClient.request(
        getCustomTextQuery,
        { id },
      )
      return data
    },
  )
}
