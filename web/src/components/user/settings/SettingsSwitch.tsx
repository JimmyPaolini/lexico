import { Grid, Switch, Typography } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"

interface Props {
  field: string
  label: string
  formik: ReturnType<typeof useFormik>
}
export default function SettingsSwitch({
  field,
  label,
  formik,
}: Props): JSX.Element {
  return (
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
}
