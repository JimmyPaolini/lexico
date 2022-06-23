import React, { useRef } from 'react'

import { Box, Fade } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import logo from 'public/lexico_logo.svg'

const PREFIX = 'Logo'

const classes = {
  container: `${PREFIX}-container`,
  logo: `${PREFIX}-logo`,
}

const StyledFade = styled(Fade)(({ theme }) => ({
  [`& .${classes.container}`]: {
    padding: theme.spacing(2),
  },

  [`& .${classes.logo}`]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export default function Logo() {
  const theme = useTheme() as any
  const ref = useRef<any>()
  const announcement = `Announcement, not always present, this day in latin history, roman holiday, link to <a href="https://www.wikipedia.org/">wikipedia</a>, medieval scientific research, featured content, contains emojis🐋😤💯👀`
  if (ref && ref.current && ref.current.innerHTML)
    ref.current.innerHTML = announcement

  return (
    <StyledFade in={true}>
      <Box className={classes.container}>
        <Image
          src={logo}
          alt="lexico logo"
          className={classes.logo}
          // layout="fill"
          width={theme.custom.cardWidth}
          height={(theme.custom.cardWidth * 4) / 3}
          priority
          loading="eager"
        />
      </Box>
    </StyledFade>
  )
}
