import React, { useContext, useEffect, useMemo, useState } from 'react'

import { ChevronLeft, Menu } from '@mui/icons-material'
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Context } from './Context'
import pages from './pages'

export default function Navigation() {
  const theme = useTheme()
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useContext(Context)
  const router = useRouter()
  const pageName = router.pathname.split('/')[1]
  const [selected, setSelected] = useState(pageName || 'search')

  const handleSelection = (pageName: any) => {
    setSelected(pageName)
    if (isMobile) setOpen(!open)
  }

  useEffect(() => {
    setSelected(pageName)
  }, [pageName])

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

  const drawerStyles = useMemo(
    () => (open ? drawerOpenStyles : drawerClosedStyles),
    [open],
  )

  return (
    <SwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => null}
      sx={{ ...drawerStyles, '& .MuiDrawer-paper': drawerStyles }}
    >
      <Grid item>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="h4"
              sx={{ position: 'relative', float: 'left', right: 12 }}
            >
              Lexico
            </Typography>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{ display: 'inline-block', position: 'relative', left: 12 }}
              aria-label="toggle navigation drawer"
              size="large"
            >
              {open ? <ChevronLeft /> : <Menu />}
            </IconButton>
          </ListItem>
          <Divider />
          {pages.map((page) => (
            <Link
              href={'/' + page.name}
              prefetch={false}
              key={page.name}
              passHref
            >
              <ListItem
                button
                selected={selected === page.name}
                onClick={() => handleSelection(page.name)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.Name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Grid>
    </SwipeableDrawer>
  )
}
