import { Add } from '@mui/icons-material'
import { CardActionArea, CardHeader as CardHeaderMui } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Link } from 'src/components/accessories/Link'

export const CreateCustomText = () => {
  const theme = useTheme()
  return (
    <CardActionArea
      sx={{ '& .MuiCardActionArea-focusHighlight': { display: 'block' } }}
    >
      <Link href="/library/customText">
        <CardHeaderMui
          title="User Texts"
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
  )
}
