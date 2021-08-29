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
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { ChevronLeft, Menu } from "@material-ui/icons"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { Context } from "./Context"
import pages from "./pages"

export default function Navigation(): JSX.Element {
  const classes = useStyles()
  const { isMobile, isNavOpen: open, setNavOpen: setOpen } = useContext(Context)
  const router = useRouter()
  const pageName = router.pathname.split("/")[1]
  const [selected, setSelected] = useState(pageName || "search")

  const handleSelection = (pageName: any) => {
    setSelected(pageName)
    if (isMobile) setOpen(!open)
  }

  useEffect(() => {
    setSelected(pageName)
  }, [pageName])

  return (
    <SwipeableDrawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => null}
      classes={{
        paper: open ? classes.drawerOpen : classes.drawerClosed,
      }}
      className={open ? classes.drawerOpen : classes.drawerClosed}>
      <Grid item>
        <List>
          <ListItem className={classes.header}>
            <Typography variant="h4" className={classes.title}>
              Lexico
            </Typography>
            <IconButton
              onClick={() => setOpen(!open)}
              className={classes.expander}
              aria-label="toggle navigation drawer">
              {open ? <ChevronLeft /> : <Menu />}
            </IconButton>
          </ListItem>
          <Divider />
          {pages.map((page) => (
            <Link
              href={"/" + page.name}
              prefetch={false}
              key={page.name}
              passHref>
              <ListItem
                button
                selected={selected === page.name}
                onClick={() => handleSelection(page.name)}>
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

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: theme.spacing(24),
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosed: {
    width: theme.spacing(7),
    [theme.breakpoints.down("sm")]: {
      width: 0,
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  },
  title: {
    position: "relative",
    float: "left",
    right: 12,
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  expander: {
    display: "inline-block",
    position: "relative",
    left: 12,
  },
}))
