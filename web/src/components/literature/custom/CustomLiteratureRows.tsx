import { useContext } from 'react'

import { List } from '@mui/material'

import { useCustomTexts } from 'src/hooks/literature/useCustomTexts'

import { Context } from '../../layout/Context'
import { CustomLiteratureLoading } from './CustomLiteratureLoading'
import { CustomLiteratureRow } from './CustomLiteratureRow'

export const CustomLiteratureRows = () => {
  const { user } = useContext(Context)
  const { customTexts, refreshCustomTexts, isLoading } = useCustomTexts()

  if (!customTexts.length) return <></>
  return (
    <List style={{ padding: 0 }}>
      {user && isLoading ? <CustomLiteratureLoading /> : null}{' '}
      {customTexts.map((text) => (
        <CustomLiteratureRow {...{ text, refreshCustomTexts }} key={text.id} />
      ))}
    </List>
  )
}
