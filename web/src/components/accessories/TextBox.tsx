import { ComponentProps, MutableRefObject, forwardRef } from 'react'

import { TextField } from '@mui/material'

import { FormikValues } from 'formik'

import { sentenceCase } from 'src/utils/string'

type Props = ComponentProps<typeof TextField> & {
  formik: FormikValues
  name: string
}

export const TextBox = forwardRef(function TextBox(
  { formik, name, ...props }: Props,
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | MutableRefObject<HTMLDivElement | null>
    | null
) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={name}
      name={name}
      label={sentenceCase(name)}
      ref={ref}
      value={formik.values[name]}
      InputLabelProps={{ shrink: Boolean(formik.values[name]) }}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
      {...props}
    />
  )
})
