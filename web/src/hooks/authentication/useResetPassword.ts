import { useMutation } from "react-query"
import resetPasswordMutation from "../../graphql/authentication/resetPassword.graphql"
import { graphQLClient, queryClient } from "../../pages/_app"

export default function useResetPassword(
  passwordResetToken: string,
  password: string,
) {
  return useMutation(
    ["resetPassword", passwordResetToken],
    async () => {
      const { resetPassword: data } = await graphQLClient.request(
        resetPasswordMutation,
        {
          passwordResetToken,
          password,
        },
      )
      return data
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("user")
      },
    },
  )
}
