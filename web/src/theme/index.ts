import { createTheme } from '@mui/material/styles'

let themeInitial = createTheme({
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

export const theme = createTheme({
  ...themeInitial,
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 4,
      },
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          maxWidth: themeInitial.custom.card.maxWidth,
          minWidth: themeInitial.custom.card.minWidth,
          width: '100%',
          // margin: themeInitial.spacing(1),
          background: themeInitial.palette.background.paper,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          background: themeInitial.palette.background.paper,
          paddingTop: themeInitial.spacing(1),
          paddingBottom: themeInitial.spacing(1),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          background: themeInitial.palette.background.paper,
          padding: themeInitial.spacing(1),
          '&:last-child': {
            padding: themeInitial.spacing(1),
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
    MuiGrid: {
      styleOverrides: {
        root: {
          outline: 'none',
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
