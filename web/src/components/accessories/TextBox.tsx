import { TextField } from "@material-ui/core"
import React, { forwardRef } from "react"
import { sentenceCase } from "../../utils/string"

interface props {
  formik: any
  name: string
  [key: string]: any
}
export default forwardRef(({ formik, name, ...props }: props, ref: any) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={name}
      name={name}
      label={sentenceCase(name)}
      ref={ref}
      {...props}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && !!formik.errors[name]}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
})
