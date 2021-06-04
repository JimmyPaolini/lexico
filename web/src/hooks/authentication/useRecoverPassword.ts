import { useMutation } from "react-query"
import recoverPasswordMutation from "../../graphql/authentication/recoverPassword.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useRecoverPassword(email: string) {
  return useMutation(["recoverPassword", email], async () => {
    const {
      recoverPassword: data,
    } = await graphQLClient.request(recoverPasswordMutation, { email })
    return data
  })
}
