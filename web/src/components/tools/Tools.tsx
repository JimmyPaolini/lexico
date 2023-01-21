import { Card } from '@mui/material'

import { CardHeader } from '../accessories/CardHeader'
import { ToolsForm } from './ToolsForm'

export const Tools = () => {
  return (
    <Card>
      <CardHeader title="Text Tools" />
      <ToolsForm />
    </Card>
  )
}
