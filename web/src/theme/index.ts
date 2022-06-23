import createCache from '@emotion/cache'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      cardWidth: number
      literature: {
        fontFamily: String
        fontWeight: number
        fontSize: String
        letterSpacing: String
      }
    }
  }
  interface ThemeOptions {
    custom: {
      cardWidth: number
      literature: {
        fontFamily: String
        fontWeight: number
        fontSize: String
        letterSpacing: String
      }
    }
  }
}

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true })
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#66023C',
    },
    secondary: {
      main: '#02662C',
    },
    background: {
      default: '#66023C',
    },
  },
  typography: {
    fontFamily: 'Helvetica Neue',
  },
  custom: {
    cardWidth: 382,
    literature: {
      fontFamily: 'Serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.00938em',
    },
  },
})

export default theme
