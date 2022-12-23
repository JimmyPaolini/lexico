import { Dispatch, SetStateAction, useContext } from 'react'

import { Menu } from '@mui/material'

import { CustomText } from 'src/components/library/custom/customTextsLocal'

import { Context } from '../../../layout/Context'
import { CustomLiteratureDelete } from './CustomLiteratureDelete'
import { CustomLiteratureEdit } from './CustomLiteratureEdit'
import { CustomLiteratureMoveToLocal } from './CustomLiteratureMoveToLocal'
import { CustomLiteratureMoveToUser } from './CustomLiteratureMoveToUser'

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
  anchor: HTMLElement | null
  setAnchor: Dispatch<SetStateAction<HTMLElement | null>>
}

export const CustomLiteratureMenu = ({
  text,
  refreshCustomTexts,
  anchor,
  setAnchor,
}: Props) => {
  const { user } = useContext(Context)
  const closeMenu = () => {
    setAnchor(null)
  }

  return (
    <Menu
      onClick={(event) => event.stopPropagation()}
      anchorEl={anchor}
      open={!!anchor}
      onClose={closeMenu}
      elevation={4}
      MenuListProps={{ style: { padding: 0 }, onMouseLeave: closeMenu }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {user ? (
        text.local ? (
          <CustomLiteratureMoveToUser
            {...{ text, refreshCustomTexts, closeMenu }}
          />
        ) : (
          <CustomLiteratureMoveToLocal
            {...{ text, refreshCustomTexts, closeMenu }}
          />
        )
      ) : null}
      <CustomLiteratureEdit {...{ text }} />
      <CustomLiteratureDelete {...{ text, refreshCustomTexts }} />
    </Menu>
  )
}
