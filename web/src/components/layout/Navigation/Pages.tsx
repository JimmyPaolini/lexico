import { Dispatch, SetStateAction, useContext } from 'react'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { Link } from 'src/components/accessories/Link'
import { capitalizeFirstLetter } from 'src/utils/string'

import { Context } from '../Context'
import { PAGES } from './Pages.constants'

type Props = {
  selectedPage: string
  setSelectedPage: Dispatch<SetStateAction<string>>
}

export const Pages = ({ selectedPage, setSelectedPage }: Props) => {
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useContext(Context)

  const handleSelection = (page: string) => {
    setSelectedPage(page)
    if (isMobile) setOpen(!open)
  }

  return (
    <>
      {PAGES.map(({ name, Icon }) => (
        <Link href={'/' + name} key={name}>
          <ListItem sx={{ padding: 0 }}>
            <ListItemButton
              selected={selectedPage === name}
              onClick={() => handleSelection(name)}
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText
                primary={capitalizeFirstLetter(name)}
                primaryTypographyProps={{ variant: 'h4' }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </>
  )
}
