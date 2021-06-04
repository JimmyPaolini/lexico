import { Typography } from "@material-ui/core"
import { useFormik } from "formik"
import React, { useContext } from "react"
import useSetSettings from "../../../hooks/user/useSetSettings"
import useSnackbarEnhanced from "../../../hooks/useSnackbarEnhanced"
import {
  getSettingsLocal,
  setSettingsLocal,
  showSettingsInstructions,
} from "../../../utils/localSettings"
import { Context } from "../../layout/Context"
import SettingsSlider from "./SettingsSlider"
import SettingsSwitch from "./SettingsSwitch"

export default function SettingsForm() {
  const { user } = useContext(Context)

  const { enqueueSnackbar } = useSnackbarEnhanced()
  const formik = useFormik({
    initialValues: !!user ? user.settings : getSettingsLocal(),
    onSubmit: async () => {
      if (!!user) {
        await setSettings()
      } else {
        setSettingsLocal(formik.values)
        if (showSettingsInstructions()) {
          enqueueSnackbar(
            `Your settings are saved locally, sign in to save them across devices/browsers`,
            {
              autoHideDuration: 10000,
            },
          )
        }
      }
    },
  })

  const { mutateAsync: setSettings } = useSetSettings(formik.values)

  return (
    <form onChange={formik.handleSubmit}>
      <SettingsSwitch
        field="translationsExpandedDefault"
        label="Translations expanded by default"
        formik={formik}
      />
      <SettingsSwitch
        field="formsExpandedDefault"
        label="Forms expanded by default"
        formik={formik}
      />
      <Typography style={{ marginTop: 10, marginBottom: 4 }}>
        Literature Reader font size:
      </Typography>
      <SettingsSlider formik={formik} />
    </form>
  )
}
