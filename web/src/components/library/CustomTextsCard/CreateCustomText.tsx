import { useMemo } from 'react'

import { Add } from '@mui/icons-material'
import { CardActionArea, CardHeader as CardHeaderMui } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { v4 as uuid } from 'uuid'

import { Link } from 'src/components/accessories/Link'

export const CreateCustomText = () => {
  const theme = useTheme()
  const newUserTextId = useMemo(() => uuid(), [])
  return (
    <CardActionArea
      sx={{ '& .MuiCardActionArea-focusHighlight': { display: 'block' } }}
    >
      <Link href={`/userText/${encodeURIComponent(newUserTextId)}/edit`}>
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
