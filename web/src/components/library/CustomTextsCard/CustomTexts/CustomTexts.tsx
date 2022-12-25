import { useContext } from 'react'

import { CardContent, Divider, List, useTheme } from '@mui/material'

import { useCustomTexts } from 'src/components/library/CustomTextsCard/CustomTexts/useCustomTexts'

import { Context } from '../../../layout/Context'
import { CustomText } from './CustomText'
import { CustomTextsError } from './CustomTextsError'
import { CustomTextsLoading } from './CustomTextsLoading'

export const CustomTexts = () => {
  const theme = useTheme()
  const { user } = useContext(Context)
  const { customTexts, refreshCustomTexts, isLoading, isError } =
    useCustomTexts()

  return !customTexts.length ? (
    <></>
  ) : (
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
