import { useMutation, UseMutationResult } from "react-query"
import Settings from "../../../../entity/user/Settings"
import setSettingsMutation from "../../graphql/user/setSettings.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSetSettings(): UseMutationResult<
  any,
  unknown,
  Settings,
  void
> {
  return useMutation(async (settings: Settings) => {
    const { setSettings: data } = await graphQLClient.request(
      setSettingsMutation,
      { settings },
    )
    return data
  })
}
