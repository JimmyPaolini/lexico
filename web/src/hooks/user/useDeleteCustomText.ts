import { useMutation, UseMutationOptions } from "react-query"
import deleteCustomTextMutation from "../../graphql/user/deleteCustomText.graphql"
import { graphQLClient } from "../../pages/_app"
import { CustomText } from "../../utils/literatureLocal"

export default function useDeleteCustomText(
  customText: CustomText,
  options?: UseMutationOptions<unknown, unknown, unknown, unknown>,
): ReturnType<typeof useMutation> {
  return useMutation(
    ["deleteCustomText", customText.id],
    async () => {
      const { deleteCustomText: data } = await graphQLClient.request(
        deleteCustomTextMutation,
        { id: customText.id },
      )
      return data
    },
    options,
  )
}
