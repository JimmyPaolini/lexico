import { createTheme } from '@mui/material/styles'

let theme = createTheme({
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
    card: {
      // Largest iPhone screen width is 414px
      // Smallest reasonable smartphone screen width is 320px
      // allow for 8px margin on each side
      maxWidth: 398,
      minWidth: 304,
      width: '100%',
    },
    literature: {
      fontFamily: 'Serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.00938em',
    },
  },
})

export default createTheme({
  ...theme,
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 4,
      },
      styleOverrides: {
        root: {
          margin: theme.spacing(1),
          maxWidth: theme.custom.card.maxWidth,
          mixWidth: theme.custom.card.minWidth,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: theme.palette.background.paper,
          padding: theme.spacing(1),
          '&:last-child': {
            padding: theme.spacing(1),
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        focusHighlight: {
          display: 'none',
        },
      },
    },
  },
})

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      card: {
        maxWidth: number
        minWidth: number
        width: string
      }
      literature: {
        fontFamily: string
        fontWeight: number
        fontSize: string
        letterSpacing: string
      }
    }
  }
  interface ThemeOptions {
    custom?: Partial<Theme['custom']>
  }
}
