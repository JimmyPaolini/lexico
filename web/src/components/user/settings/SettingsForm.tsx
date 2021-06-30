import { Divider, Typography } from "@material-ui/core"
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

export default function SettingsForm(): JSX.Element {
  const { user } = useContext(Context)

  const { enqueueSnackbar } = useSnackbarEnhanced()
  const formik = useFormik({
    initialValues: user ? user.settings : getSettingsLocal(),
    onSubmit: async () => {
      if (user) {
        await setSettings(formik.values)
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
      <Divider />
      <SettingsSwitch
        field="translationsExpandedDefault"
        label="Translations expanded by default"
        formik={formik}
      />
      <Divider />
      <SettingsSwitch
        field="formsExpandedDefault"
        label="Forms expanded by default"
        formik={formik}
      />
      <Divider />
      <Typography align="center" style={{ marginTop: 10, marginBottom: 4 }}>
        Literature Reader font size:
      </Typography>
      <SettingsSlider formik={formik} />
    </form>
  )
}
