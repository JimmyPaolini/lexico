import { CardContent, Grid, Typography, useTheme } from '@mui/material'

import { SubmitButton } from '../accessories/SubmitButton'
import { TextBox } from '../accessories/TextBox'
import { Tool } from './Tool'
import { ToolGroup } from './ToolGroup'
import { useToolsForm } from './useToolsForm'

export const ToolsForm = () => {
  const theme = useTheme()
  const formik = useToolsForm()

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing(1),
        }}
      >
        <TextBox
          name="text"
          formik={formik}
          disabled={formik.isSubmitting}
          multiline
          rows={6}
        />
        {formik.values.text?.match(/[ÄËÏÖÜäëïöü]/) && (
          <Typography align="center">ÄËÏÖÜäëïöü = ambiguous macron</Typography>
        )}
        <ToolGroup tools={['macronize', 'demacronize']} formik={formik} />
        <ToolGroup tools={['capitalize', 'uncapitalize']} formik={formik} />
        <Grid container m={0} gap={1} justifyContent="center" wrap="nowrap">
          <Tool tool="u2v" formik={formik} />
          <Tool tool="i2j" formik={formik} />
        </Grid>

        <SubmitButton name="Transform" disabled={formik.isSubmitting} />
      </CardContent>
    </form>
  )
}
