import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Entry } from '../../../hooks/search/useSearch'

type Props = { translation: NonNullable<Entry['translations']>[0] }

export default function TranslationBullet({ translation }: Props) {
  const theme = useTheme()
  return (
    <Grid
      container
      item
      spacing={1}
      xs
      alignItems="flex-start"
      wrap="nowrap"
      sx={{ margin: 0, background: theme.palette.background.paper }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: theme.palette.text.primary,
          margin: theme.spacing(1),
          flexShrink: 0,
        }}
      />
      <Typography color="textPrimary">{translation.translation}</Typography>
    </Grid>
  )
}
