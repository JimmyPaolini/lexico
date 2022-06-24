import React, { useRef } from 'react'

import { Box, Fade } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import Image from 'next/image'
import logo from 'public/lexico_logo.svg'

export default function Logo() {
  const theme = useTheme()
  const ref = useRef<any>()
  const announcement = `Announcement, not always present, this day in latin history, roman holiday, link to <a href="https://www.wikipedia.org/">wikipedia</a>, medieval scientific research, featured content, contains emojis🐋😤💯👀`
  if (ref && ref.current && ref.current.innerHTML)
    ref.current.innerHTML = announcement

  return (
    <Fade in>
      <Box
        sx={{
          padding: theme.spacing(2),
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          maxwidth: theme.custom.card.maxWidth,
          minwidth: theme.custom.card.minWidth,
        }}
      >
        <Image
          src={logo}
          alt="lexico logo"
          // layout="fill"
          width={theme.custom.card.maxWidth}
          height={(theme.custom.card.maxWidth * 4) / 3}
          priority
          loading="eager"
        />
      </Box>
    </Fade>
  )
}
