import { Dispatch, SetStateAction } from 'react'

import { Menu as MenuMui } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { CustomText } from 'src/graphql/generated'

import { Delete, Edit, MoveToLocal, MoveToUser } from './Actions'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  anchor: HTMLElement | null
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>
}

export const Menu = ({
  text,
  refreshCustomTexts,
  anchor,
  setAnchor,
}: Props) => {
  const { user } = useLexicoContext()
  const closeMenu = () => setAnchor(null)

  return (
    <MenuMui
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={closeMenu}
      elevation={4}
      MenuListProps={{ style: { padding: 0 }, onMouseLeave: closeMenu }}
      onClick={(e) => e.stopPropagation()}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Edit {...{ text }} />
      <Delete {...{ text, refreshCustomTexts }} />
      {user && !text.user && (
        <MoveToUser {...{ text, refreshCustomTexts, closeMenu }} />
      )}
      {user && text.user && (
        <MoveToLocal {...{ text, refreshCustomTexts, closeMenu }} />
      )}
    </MenuMui>
  )
}
