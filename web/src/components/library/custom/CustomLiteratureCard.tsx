import { Add } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardHeader as CardHeaderMui,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CustomLiteratureRows } from './CustomLiteratureRows'

export const CustomLiteratureCard = () => {
  const theme = useTheme()
  return (
    <Card>
      <CardActionArea href="/library/custom">
        <CardHeaderMui
          title="Your Literature"
          action={
            <Add
              sx={{
                margin: theme.spacing(1),
                marginRight: theme.spacing(1.5),
                marginTop: theme.spacing(1.5),
              }}
            />
          }
        />
      </CardActionArea>
      <CustomLiteratureRows />
    </Card>
  )
}
