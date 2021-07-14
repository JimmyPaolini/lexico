import { useMutation } from "react-query"
import Settings from "../../../../entity/user/Settings"
import setSettingsMutation from "../../graphql/user/setSettings.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSetSettings(
  settings: Settings,
): ReturnType<typeof useMutation> {
  return useMutation(
    "setSettings",
    async () => {
      const { setSettings: data } = await graphQLClient.request(
        setSettingsMutation,
        settings,
      )
      return data
    },
    { retryDelay: 0 },
  )
}
