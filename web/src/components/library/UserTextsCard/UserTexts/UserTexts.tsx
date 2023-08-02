import { CardContent, Divider, List, useTheme } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { useUserTexts } from 'src/components/library/UserTextsCard/UserTexts/userUserTexts'

import { UserText } from './UserText'
import { UserTextsError } from './UserTextsError'
import { UserTextsLoading } from './UserTextsLoading'

export const UserTexts = () => {
  const theme = useTheme()
  const { user } = useLexicoContext()
  const { userTexts, refreshUserTexts, isLoading, isError } = useUserTexts()

  return !userTexts.length ? null : (
    <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
      <List style={{ padding: 0 }}>
        {(userTexts.length || isLoading) && (
          <Divider sx={{ marginLeft: theme.spacing(1) }} />
        )}
        {user && isLoading && <UserTextsLoading />}
        {user && isError && <UserTextsError />}
        {userTexts.map((text) => (
          <UserText {...{ text, refreshUserTexts }} key={text.id} />
        ))}
      </List>
    </CardContent>
  )
}
