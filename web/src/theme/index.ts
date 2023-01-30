import { createTheme } from '@mui/material/styles'

const themeInitial = createTheme({
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
      maxWidth: 400,
      minWidth: 300,
      width: '100%',
    },
    literature: {
      fontFamily: 'Serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.00938em',
    },
    lineClamp: (numLines: number) => ({
      display: '-webkit-box',
      WebkitLineClamp: `${numLines}`,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
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
          width: '100%',
          maxWidth: themeInitial.custom.card.maxWidth,
          minWidth: themeInitial.custom.card.minWidth,
          // margin: themeInitial.spacing(1),
          background: themeInitial.palette.background.paper,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        action: { margin: 'auto' },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: themeInitial.spacing(2),
          '&:last-child': {
            paddingBottom: themeInitial.spacing(2),
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
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabScrollButton-root.Mui-disabled': {
            opacity: 0.2,
          },
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
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          a: {
            textDecoration: 'none',
            color: 'inherit',
          },
        },
      },
    },
  },
})

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
      lineClamp: (numLines: number) => Record<string, string>
    }
  }
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ThemeOptions {
    custom?: Partial<Theme['custom']>
  }
}

export * from './createEmotionCache'
