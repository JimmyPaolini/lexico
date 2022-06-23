import { createTheme } from '@mui/material/styles'

export default createTheme({
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
      paper: '#424242',
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

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      cardWidth: number
      literature: {
        fontFamily: string
        fontWeight: number
        fontSize: string
        letterSpacing: string
      }
    }
  }
  interface ThemeOptions {
    custom?: {
      cardWidth?: number
      literature?: {
        fontFamily?: string
        fontWeight?: number
        fontSize?: string
        letterSpacing?: string
      }
    }
  }
}
