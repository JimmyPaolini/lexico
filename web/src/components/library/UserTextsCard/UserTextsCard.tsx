import { Card } from '@mui/material'

import { CreateUserText } from './CreateUserText'
import { UserTexts } from './UserTexts'

export const UserTextsCard = () => {
  return (
    <Card>
      <CreateUserText />
      <UserTexts />
    </Card>
  )
}
