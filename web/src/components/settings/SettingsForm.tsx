import { Grid, Slider, Switch, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { useMutation } from "react-query"
import { SettingsInput } from "../../../../entity/user/Settings"
import setSettingsMutation from "../../graphql/user/setSettings.graphql"
import { graphQLClient } from "../../pages/_app"
import { Context } from "../Context"

export default function SettingsCard() {
  const { user } = useContext(Context)

  const formik = useFormik({
    initialValues:
      user.settings ||
      ({
        theme: "dark",
        fontSize: 24,
        formsExpandedDefault: false,
        translationsExpandedDefault: false,
        dictionaryMacronized: false,
        literatureMacronized: false,
      } as SettingsInput),
    onSubmit: async () => {
      await setSettings()
    },
  })

  const { mutateAsync: setSettings } = useMutation(
    "setSettings",
    async () => {
      const { setSettings: data } = await graphQLClient.request(
        setSettingsMutation,
        {
          settings: formik.values,
        },
      )
      return data
    },
    { retryDelay: 0 },
  )

  interface BoolProps {
    field: string
    label: string
  }
  const Bool = ({ field, label }: BoolProps) => (
    <Grid container justify="space-between" alignItems="center">
      <Typography>{label}:</Typography>
      <Switch
        id={field}
        name={field}
        color="primary"
        value={formik.values[field]}
        checked={formik.values[field]}
        onChange={formik.handleChange}
      />
    </Grid>
  )

  const min = 16
  const max = 32
  const marks = new Array((max - min) / 2 + 1)
    .fill(0)
    .map((_, i) => ({ value: i * 2 + min, label: "" + (i * 2 + min) }))

  const handleSliderChange = (event: any, newValue: any) => {
    event.target.name = "fontSize"
    event.target.value = newValue
    formik.handleChange(event)
  }

  return (
    <form onChange={formik.handleSubmit}>
      {Bool({
        field: "translationsExpandedByDefault",
        label: "Translations expanded by default",
      })}
      {Bool({
        field: "formsExpandedByDefault",
        label: "Forms expanded by default",
      })}
      <Typography style={{ marginTop: 10, marginBottom: 4 }}>
        Literature Reader font size:
      </Typography>
      <Slider
        id="fontSize"
        name="fontSize"
        value={formik.values.fontSize}
        onChange={handleSliderChange}
        onChangeCommitted={() => formik.handleSubmit()}
        valueLabelDisplay="off"
        min={min}
        max={max}
        marks={marks}
        step={2}
      />
    </form>
  )
}
