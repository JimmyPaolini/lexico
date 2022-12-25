import Link from 'next/link'

import { Add } from '@mui/icons-material'
import {
  CardActionArea,
  CardHeader as CardHeaderMui,
  ListItemButton,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const CreateCustomText = () => {
  const theme = useTheme()
  return (
    <ListItemButton sx={{ padding: 0 }}>
      <CardActionArea>
        <Link
          href="/library/customText"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
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
        </Link>
      </CardActionArea>
    </ListItemButton>
  )
}
