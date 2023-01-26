import { Card } from '@mui/material'

import { CardHeader } from '../../accessories/CardHeader'
import { ToolsForm } from './Tools.form'

export const Tools = () => {
  return (
    <Card>
      <CardHeader title="Tools" />
      <ToolsForm />
    </Card>
  )
}
