import { Box, Fade, Typography } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Image from "next/image"
import React, { useRef } from "react"

export default function Logo(): JSX.Element {
  const classes = useStyles()
  const theme = useTheme() as any
  const ref = useRef<any>()
  const announcement = `Announcement, not always present, this day in latin history, roman holiday, link to <a href="https://www.wikipedia.org/">wikipedia</a>, medieval scientific research, featured content, contains emojis🐋😤💯👀`
  if (ref && ref.current && ref.current.innerHTML)
    ref.current.innerHTML = announcement

  return (
    <Fade in={true}>
      <Box position="relative">
        <Box className={classes.container}>
          <Image
            src="/lexico_logo.svg"
            alt="lexico logo"
            className={classes.logo}
            // layout="fill"
            width={theme.custom.cardWidth}
            height={(theme.custom.cardWidth * 4) / 3}
            priority
            loading="eager"
          />
        </Box>
        {announcement ? (
          <Typography
            ref={ref}
            variant="body1"
            align="center"
            className={classes.announcement}
          />
        ) : null}
      </Box>
    </Fade>
  )
}

const useStyles = makeStyles((theme: any) => ({
  announcement: {
    width: 236,
    position: "absolute",
    right: 32,
    top: 64,
  },
  container: {
    padding: theme.spacing(2),
  },
  logo: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))
