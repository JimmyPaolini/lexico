import { useQuery } from "react-query"
import Author from "../../../entity/literature/Author"
import getAuthorsQuery from "../graphql/literature/getAuthors.graphql"
import { graphQLClient } from "../pages/_app"

export default function useGetAuthors() {
  return useQuery("getAuthors", async () => {
    const { getAuthors: data } = await graphQLClient.request(getAuthorsQuery)
    return data as Author[]
  })
}
