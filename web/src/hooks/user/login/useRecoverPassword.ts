import { useMutation, UseMutationResult } from "react-query"
import recoverPasswordMutation from "../../../graphql/user/login/recoverPassword.graphql"
import { graphQLClient } from "../../../pages/_app"

export default function useRecoverPassword(
  email: string,
): UseMutationResult<any, unknown, void, unknown> {
  return useMutation(["recoverPassword", email], async () => {
    const { recoverPassword: data } = await graphQLClient.request(
      recoverPasswordMutation,
      { email },
    )
    return data
  })
}
