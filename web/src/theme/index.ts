import { Theme, ThemeOptions, createTheme } from '@material-ui/core/styles'
import {
  Typography,
  TypographyOptions,
} from '@material-ui/core/styles/createTypography'

export interface LexicoTheme extends Theme {
  typography: LexicoTypography
  custom: {
    cardWidth: number
  }
}
interface LexicoTypography extends Typography {
  literature: Record<string, unknown>
}

interface LexicoThemeOptions extends ThemeOptions {
  typography?: LexicoTypographyOptions
  custom?: {
    cardWidth?: number
  }
}

interface LexicoTypographyOptions extends TypographyOptions {
  literature?: Record<string, unknown>
}

const theme = createTheme({
  palette: {
    type: 'dark',
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
    literature: {
      fontFamily: 'Serif',
      fontWeight: 400,
      fontSize: '1.5rem',
      letterSpacing: '0.00938em',
    },
  },
  custom: {
    cardWidth: 382,
  },
} as LexicoThemeOptions) as LexicoTheme

export default theme
