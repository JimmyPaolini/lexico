import React, { useContext, useEffect, useState } from 'react'

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
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Context } from './Context'
import pages from './pages'

const PREFIX = 'Navigation'

const classes = {
  drawerOpen: `${PREFIX}-drawerOpen`,
  drawerClosed: `${PREFIX}-drawerClosed`,
  title: `${PREFIX}-title`,
  header: `${PREFIX}-header`,
  expander: `${PREFIX}-expander`,
}

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  [`& .${classes.drawerOpen}`]: {
    width: theme.spacing(24),
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  [`& .${classes.drawerClosed}`]: {
    width: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      width: 0,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
  },

  [`& .${classes.title}`]: {
    position: 'relative',
    float: 'left',
    right: 12,
  },

  [`& .${classes.header}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  [`& .${classes.expander}`]: {
    display: 'inline-block',
    position: 'relative',
    left: 12,
  },
}))

export default function Navigation() {
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

  return (
    <StyledSwipeableDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => null}
      classes={{
        paper: open ? classes.drawerOpen : classes.drawerClosed,
      }}
      className={open ? classes.drawerOpen : classes.drawerClosed}
    >
      <Grid item>
        <List>
          <ListItem className={classes.header}>
            <Typography variant="h4" className={classes.title}>
              Lexico
            </Typography>
            <IconButton
              onClick={() => setOpen(!open)}
              className={classes.expander}
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
    </StyledSwipeableDrawer>
  )
}
