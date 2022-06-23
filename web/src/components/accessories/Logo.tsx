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
        }}
      >
        <Image
          src={logo}
          alt="lexico logo"
          // layout="fill"
          width={theme.custom.cardWidth}
          height={(theme.custom.cardWidth * 4) / 3}
          priority
          loading="eager"
        />
      </Box>
    </Fade>
  )
}
