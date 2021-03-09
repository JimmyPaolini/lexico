import { QueryFunctionContext, useQuery } from "react-query"
import Text from "../../../../entity/literature/Text"
import getTextQuery from "../../graphql/literature/getText.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useGetText(textId: string) {
  return useQuery(["getText", textId], getText, {
    keepPreviousData: true,
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
