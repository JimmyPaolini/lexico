import { useContext, useState } from 'react'

import Link from 'next/link'

import { ChevronLeft, Menu } from '@mui/icons-material'
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { capitalizeFirstLetter } from 'src/utils/string'

import { Context } from './Context'
import { pages } from './pages'

type Props = { page?: string }

export const Navigation = ({ page: initialPage }: Props) => {
  const theme = useTheme()
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useContext(Context)
  const [selectedPage, setSelectedPage] = useState(initialPage ?? 'search')

  const handleSelection = (page: string) => {
    setSelectedPage(page)
    if (isMobile) setOpen(!open)
  }

  const drawerOpenStyles = {
    width: theme.spacing(24),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }

  const drawerClosedStyles = {
    width: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      width: 0,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  }

  const drawerStyles = open ? drawerOpenStyles : drawerClosedStyles

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => null}
      sx={{ ...drawerStyles, '& .MuiDrawer-paper': drawerStyles }}
    >
      <Grid item>
        <List sx={{ paddingTop: 0 }}>
          <ListItemButton
            onClick={() => setOpen(!open)}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <ListItemText
              primary="Lexico"
              primaryTypographyProps={{ variant: 'h4' }}
              sx={{ minWidth: 'auto' }}
            />
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {open ? <ChevronLeft /> : <Menu />}
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          {pages.map((page) => (
            <Link
              href={'/' + page.name}
              prefetch={false}
              key={page.name}
              passHref
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              <ListItem
                button
                selected={selectedPage === page.name}
                onClick={() => handleSelection(page.name)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={capitalizeFirstLetter(page.name)} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </SwipeableDrawer>
  )
}
