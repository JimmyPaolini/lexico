import { useMutation, UseMutationOptions } from "react-query"
import createCustomTextMutation from "../../graphql/user/createCustomText.graphql"
import { graphQLClient } from "../../pages/_app"
import { CustomText } from "../../utils/literatureLocal"

export default function useCreateCustomText(
  customText: CustomText,
  options?: UseMutationOptions<any, unknown, unknown, unknown>,
): ReturnType<typeof useMutation> {
  return useMutation(
    ["createCustomText", customText],
    async () => {
      const { createCustomText: data } = await graphQLClient.request(
        createCustomTextMutation,
        customText,
      )
      return data
    },
    options,
  )
}
