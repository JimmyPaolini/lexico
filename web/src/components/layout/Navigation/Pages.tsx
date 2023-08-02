import { Dispatch, SetStateAction } from 'react'

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { Link } from 'src/components/accessories/Link'
import { useLexicoContext } from 'src/components/layout/LexicoContext'
import { capitalizeFirstLetter } from 'src/utils/string'

import { PAGES } from './Pages.constants'

type Props = {
  selectedPage: string
  setSelectedPage: Dispatch<SetStateAction<string>>
}

export const Pages = ({ selectedPage, setSelectedPage }: Props) => {
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useLexicoContext()

  const handleSelection = (page: string): void => {
    setSelectedPage(page)
    if (isMobile) setOpen(!open)
  }

  return (
    <>
      {PAGES.map(({ name, Icon }) => (
        <Link href={'/' + name} key={name} prefetch={false}>
          <ListItem sx={{ padding: 0 }} key={name}>
            <ListItemButton
              selected={selectedPage === name}
              onClick={() => handleSelection(name)}
            >
              <ListItemIcon>{Icon}</ListItemIcon>
              <ListItemText
                primary={capitalizeFirstLetter(name)}
                primaryTypographyProps={{ variant: 'h5' }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </>
  )
}
