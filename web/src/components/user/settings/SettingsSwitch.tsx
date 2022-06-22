import React from 'react'

import { Grid, Switch, Typography } from '@material-ui/core'

type Props = {
  field: string
  label: string
  formik: any
}
export default function SettingsSwitch({ field, label, formik }: Props) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
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
