import { Card } from '@mui/material'

import { CreateCustomText } from './CreateCustomText'
import { CustomTexts } from './CustomTexts'

export const CustomTextsCard = () => {
  return (
    <Card>
      <CreateCustomText />
      <CustomTexts />
    </Card>
  )
}
