import { Grid, Slider, Switch, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { useMutation } from "react-query"
import { SettingsInput } from "../../../../entity/user/Settings"
import setSettingsMutation from "../../graphql/user/setSettings.graphql"
import { graphQLClient } from "../../pages/_app"
import { Context } from "../Context"

export default function SettingsCard() {
  const classes = useStyles()
  const { user } = useContext(Context)
  classes
  const formik = useFormik({
    initialValues:
      user.settings ||
      ({
        theme: "dark",
        fontSize: 24,
        formsExpandedByDefault: false,
        translationsExpandedByDefault: false,
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
    console.log(event, newValue)
    event.target.name = "fontSize"
    event.target.value = newValue
    formik.handleChange(event)
    formik.handleSubmit()
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
        Literature Reader Font Size:
      </Typography>
      <Slider
        id="fontSize"
        name="fontSize"
        value={formik.values.fontSize}
        onChangeCommitted={handleSliderChange}
        valueLabelDisplay="off"
        min={min}
        max={max}
        marks={marks}
        step={2}
      />
    </form>
  )
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    margin: theme.spacing(2),
    width: theme.custom.cardWidth,
  },
  columnItem: {
    marginBottom: theme.spacing(2),
  },
  hiddenAction: {
    marginTop: 8,
    marginRight: 8,
    visibility: "hidden",
  },
}))
