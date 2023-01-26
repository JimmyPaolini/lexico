import { CardContent, Divider, List, useTheme } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { useCustomTexts } from 'src/components/library/CustomTextsCard/CustomTexts/useCustomTexts'

import { CustomText } from './CustomText'
import { CustomTextsError } from './CustomTextsError'
import { CustomTextsLoading } from './CustomTextsLoading'

export const CustomTexts = () => {
  const theme = useTheme()
  const { user } = useLexicoContext()
  const { customTexts, refreshCustomTexts, isLoading, isError } =
    useCustomTexts()

  return !customTexts.length ? null : (
    <CardContent
      sx={{
        padding: 0,
        '&:last-child': {
          paddingBottom: 0,
        },
      }}
    >
      <List style={{ padding: 0 }}>
        {(customTexts.length || isLoading) && (
          <Divider sx={{ marginLeft: theme.spacing(1) }} />
        )}
        {user && isLoading && <CustomTextsLoading />}
        {user && isError && <CustomTextsError />}
        {customTexts.map((text) => (
          <CustomText {...{ text, refreshCustomTexts }} key={text.id} />
        ))}
      </List>
    </CardContent>
  )
}
