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
    <Card
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: 0,
        margin: theme.spacing(1),
      }}
    >
      <CardActionArea href="/literature/custom">
        <CardHeaderMui
          title="Your Literature"
          action={
            <Add
              sx={{
                margin: theme.spacing(1),
                marginRight: 12,
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
      <CardContent
        sx={{
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <CustomLiteratureRows />
      </CardContent>
    </Card>
  )
}
