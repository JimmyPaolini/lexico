import { Grid, Switch, Typography } from '@mui/material'

import { FormikProps } from 'formik'

import { Settings } from 'src/graphql/generated'

type Props = {
  field: keyof Settings
  label: string
  formik: FormikProps<Settings>
}

export const SettingsSwitch = ({ field, label, formik }: Props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography>{label}:</Typography>
      <Switch
        id={field}
        name={field}
        color="primary"
        value={formik.values[field] as boolean}
        checked={formik.values[field] as boolean}
        onChange={formik.handleChange}
      />
    </Grid>
  )
}
