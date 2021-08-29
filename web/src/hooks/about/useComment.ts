import { useMutation, UseMutationResult } from "react-query"
import commentMutation from "../../graphql/about/comment.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useComment(): UseMutationResult<
  boolean,
  unknown,
  string,
  unknown
> {
  return useMutation("comment", async (comment: string) => {
    const { comment: data } = await graphQLClient.request(commentMutation, {
      comment,
    })
    return data
  })
}
