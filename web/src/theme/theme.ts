import { createMuiTheme, Theme, ThemeOptions } from "@material-ui/core/styles"
import {
  Typography,
  TypographyOptions,
} from "@material-ui/core/styles/createTypography"

export interface MyTheme extends Theme {
  typography: MyTypography
  custom: {
    cardWidth: number
  }
}
interface MyTypography extends Typography {
  literature: Record<string, unknown>
}

interface MyThemeOptions extends ThemeOptions {
  typography?: MyTypographyOptions
  custom?: {
    cardWidth?: number
  }
}

interface MyTypographyOptions extends TypographyOptions {
  literature?: Record<string, unknown>
}

const myThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#66023C",
    },
    secondary: {
      main: "#02662C",
    },
    background: {
      default: "#66023C",
    },
  },
  typography: {
    fontFamily: "Helvetica Neue",
    literature: {
      fontFamily: "Serif",
      fontWeight: 400,
      fontSize: "1.5rem",
      letterSpacing: "0.00938em",
    },
  },
  custom: {
    cardWidth: 382,
  },
} as unknown
const theme = createMuiTheme(myThemeOptions as MyThemeOptions)

export default theme
