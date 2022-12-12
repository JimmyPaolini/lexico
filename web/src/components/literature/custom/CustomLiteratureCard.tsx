import { Add } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader as CardHeaderMui,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CustomLiteratureRows } from './CustomLiteratureRows'

export const CustomLiteratureCard = () => {
  const theme = useTheme()
  return (
    <Card>
      <CardActionArea href="/literature/custom">
        <CardHeaderMui
          title="Your Literature"
          action={
            <Add
              sx={{
                margin: theme.spacing(1),
                marginRight: '12px',
              }}
            />
          }
          sx={{
            '&.MuiCardHeader-action': {
              marginTop: 'auto',
              marginBottom: 'auto',
            },
          }}
        />
      </CardActionArea>
      <CustomLiteratureRows />
    </Card>
  )
}
