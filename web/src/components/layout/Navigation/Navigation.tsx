import { useState } from 'react'

import { ChevronLeft, Menu } from '@mui/icons-material'
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

import { Pages } from './Pages'

type Props = { page?: string }

export const Navigation = ({ page: initialPage }: Props) => {
  const theme = useTheme()
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useLexicoContext()
  const [selectedPage, setSelectedPage] = useState(initialPage ?? 'search')

  const drawerOpenStyles = {
    width: theme.spacing(27),
    backgroundImage: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }

  const drawerClosedStyles = {
    width: theme.spacing(8),
    [theme.breakpoints.down('md')]: { width: 0 },
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }

  const drawerStyles = open ? drawerOpenStyles : drawerClosedStyles

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      onMouseOver={() => !isMobile && setOpen(true)}
      onMouseOut={() => !isMobile && setOpen(false)}
      sx={{ ...drawerStyles, '& .MuiDrawer-paper': drawerStyles }}
    >
      <Grid item>
        <List sx={{ paddingTop: 0 }}>
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ListItemText
              primary="Lexico"
              primaryTypographyProps={{ variant: 'h4' }}
              sx={{ minWidth: 'auto' }}
            />
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'relative',
                left: '2px',
              }}
            >
              {open ? (
                <ChevronLeft fontSize="large" />
              ) : (
                <Menu fontSize="large" />
              )}
            </ListItemIcon>
          </ListItem>
          <Divider />
          <Pages {...{ selectedPage, setSelectedPage }} />
        </List>
      </Grid>
    </SwipeableDrawer>
  )
}
