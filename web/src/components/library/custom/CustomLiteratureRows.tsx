import { useContext } from 'react'

import { List, CardContent } from '@mui/material'

import { useCustomTexts } from 'src/hooks/library/useCustomTexts'

import { Context } from '../../layout/Context'
import { CustomLiteratureLoading } from './CustomLiteratureLoading'
import { CustomLiteratureRow } from './CustomLiteratureRow'

export const CustomLiteratureRows = () => {
  const { user } = useContext(Context)
  const { customTexts, refreshCustomTexts, isLoading } = useCustomTexts()

  if (!customTexts.length) return <></>
  return (
    <CardContent
      sx={{
        padding: 0,
        '&:last-child': {
          paddingBottom: 0,
        },
      }}
    >
      <List style={{ padding: 0 }}>
        {user && isLoading ? <CustomLiteratureLoading /> : null}{' '}
        {customTexts.map((text) => (
          <CustomLiteratureRow
            {...{ text, refreshCustomTexts }}
            key={text.id}
          />
        ))}
      </List>
    </CardContent>
  )
}
