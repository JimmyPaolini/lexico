import { QueryFunctionContext, useQuery } from "react-query"
import Text from "../../../../entity/literature/Text"
import getTextQuery from "../../graphql/literature/getText.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useGetText(textId: string, initialData: Text) {
  return useQuery(["getText", textId], getText, {
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    retryDelay: 0,
    initialData,
  })
}

export const getText = async ({
  queryKey: [, textId],
}: QueryFunctionContext<any>) => {
  const { getText: data } = await graphQLClient.request(getTextQuery, {
    id: textId,
  })
  return data as Text
}
