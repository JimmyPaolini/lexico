import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import { TOOLS } from './Tools.constants'
import { useTextToolsForm } from './useToolsForm'

type Props = {
  tools: (keyof typeof TOOLS)[]
  formik: ReturnType<typeof useTextToolsForm>
}
export const ToolGroup = ({ tools, formik }: Props) => {
  return (
    <ToggleButtonGroup
      exclusive
      value={formik.values.tools.find((tool) => tools.includes(tool))}
      onChange={(_, tool) => {
        formik.setFieldValue('tools', [
          ...formik.values.tools.filter((tool) => !tools.includes(tool)),
          tool,
        ])
      }}
    >
      {tools.map((tool) => (
        <ToggleButton value={tool} key={tool} color="secondary">
          {TOOLS[tool].label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
