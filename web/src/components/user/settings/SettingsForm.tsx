import { Divider, Typography } from '@mui/material'

import { useFormik } from 'formik'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import {
  getSettingsLocal,
  setSettingsLocal,
  shouldShowSettingsInstructions,
} from 'src/components/user/settings/settingsLocal'
import { Settings, useSetSettingsMutation } from 'src/graphql/generated'
import { useSnackbar } from 'src/hooks/useSnackbar'

import { SettingsSlider } from './SettingsSlider'
import { SettingsSwitch } from './SettingsSwitch'

export const SettingsForm = () => {
  const { user } = useLexicoContext()

  const enqueueSnackbar = useSnackbar()
  const formik = useFormik({
    initialValues: (user ? user.settings : getSettingsLocal()) as Settings,
    onSubmit: async () => {
      if (user) {
        await setSettingsUser({ settings: formik.values })
      } else {
        setSettingsLocal(formik.values)
        if (shouldShowSettingsInstructions()) {
          enqueueSnackbar(
            'Your settings are saved locally, sign in to save them across devices/browsers'
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
        Text font size:
      </Typography>
      <SettingsSlider formik={formik} />
    </form>
  )
}
