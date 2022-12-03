import { useContext } from 'react'

import { Divider, Typography } from '@mui/material'

import { useFormik } from 'formik'

import { Settings, useSetSettingsMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'
import {
  getSettingsLocal,
  setSettingsLocal,
  showSettingsInstructions,
} from 'src/utils/settingsLocal'

import { Context } from '../../layout/Context'
import { SettingsSlider } from './SettingsSlider'
import { SettingsSwitch } from './SettingsSwitch'

export const SettingsForm = () => {
  const { user } = useContext(Context)

  const enqueueSnackbar = useSnackbar()
  const formik = useFormik({
    initialValues: (user ? user.settings : getSettingsLocal()) as Settings,
    onSubmit: async () => {
      if (user) {
        await setSettingsUser({ settings: formik.values })
      } else {
        setSettingsLocal(formik.values)
        if (showSettingsInstructions()) {
          enqueueSnackbar(
            `Your settings are saved locally, sign in to save them across devices/browsers`,
          )
        }
      }
    },
  })

  const { mutateAsync: setSettingsUser } = useSetSettingsMutation()

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
