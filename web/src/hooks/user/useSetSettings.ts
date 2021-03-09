import { useMutation } from "react-query"
import { SettingsInput } from "../../../../entity/user/Settings"
import setSettingsMutation from "../../graphql/user/setSettings.graphql"
import { graphQLClient } from "../../pages/_app"

export default function useSetSettings() {
  return useMutation(
    "setSettings",
    async (settings: SettingsInput) => {
      const { setSettings: data } = await graphQLClient.request(
        setSettingsMutation,
        settings,
      )
      return data
    },
    { retryDelay: 0 },
  )
}
