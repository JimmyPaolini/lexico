import { ToggleButton } from '@mui/material'

import { TOOLS } from './Tools.constants'
import { useToolsForm } from './useToolsForm'

type Props = {
  tool: keyof typeof TOOLS
  formik: ReturnType<typeof useToolsForm>
}

export const Tool = ({ tool, formik }: Props) => {
  return (
    <ToggleButton
      value={tool}
      selected={formik.values.tools.includes(tool)}
      color="secondary"
      onClick={() => {
        if (formik.values.tools.includes(tool)) {
          formik.setFieldValue(
            'tools',
            formik.values.tools.filter((oldTool) => oldTool !== tool)
          )
        } else {
          formik.setFieldValue('tools', [...formik.values.tools, tool])
        }
      }}
    >
      {TOOLS[tool].label}
    </ToggleButton>
  )
}
