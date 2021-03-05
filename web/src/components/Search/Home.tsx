import { Box, Fade, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Image from "next/image"
import React, { useRef } from "react"

export default function Home() {
  const classes = useStyles()
  const ref = useRef<any>()
  const announcement = `Announcement, not always present, this day in latin history, roman holiday, link to <a href="https://www.wikipedia.org/">wikipedia</a>, medieval scientific research, featured content, contains emojis🐋😤💯👀`
  if (ref && ref.current && ref.current.innerHTML)
    ref.current.innerHTML = announcement

  return (
    <Fade in={true}>
      <Box position="relative">
        <Box>
          <Image
            src="/lexico_logo.svg"
            alt="lexico logo"
            height={500}
            width={375}
          />
        </Box>
        {!!announcement ? (
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

const useStyles = makeStyles(() => ({
  announcement: {
    width: 236,
    position: "absolute",
    right: 32,
    top: 64,
  },
}))
