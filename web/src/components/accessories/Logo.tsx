import Image from 'next/image'

import { Box, Fade } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import logo from 'public/lexico_logo.svg'

const LOGO_DIMENTIONS = 4 / 3

export const Logo = () => {
  const theme = useTheme()

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
          width={theme.custom.card.maxWidth}
          height={theme.custom.card.maxWidth * LOGO_DIMENTIONS}
          priority
          loading="eager"
        />
      </Box>
    </Fade>
  )
}
