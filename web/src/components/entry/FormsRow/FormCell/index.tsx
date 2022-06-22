import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

import { LexicoTheme } from '../../../../theme'
import CenterText from './CenterText'
import SideCornerTexts from './SideCornerTexts'

export type FormCellPosition =
  | 'topLeftText'
  | 'topRightText'
  | 'midLeft'
  | 'midRight'
  | 'bottomLeftText'
  | 'bottomRightText'

export type Props = {
  position: FormCellPosition
  centerText: string
  topLeftText: string
  topRightText: string
  bottomLeftText: string
  bottomRightText: string
}

export default function FormCell({
  position,
  centerText,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
}: Props) {
  const classes = useStyles()
  const borderRule = '1px solid rgba(255, 255, 255, 0.12)'

  return (
    <Tooltip
      title={centerText?.length > 20 ? centerText : ''}
      placement="top"
      enterDelay={0}
      interactive
      arrow
      classes={{ tooltip: classes.tooltip }}
      aria-label={centerText}
    >
      <Grid
        container
        justifyContent="space-between"
        wrap="nowrap"
        className={classes.formCell}
        style={{
          borderTop: position.match(/bottom|mid/i) ? borderRule : '',
          borderBottom: position.match(/top|mid/i) ? borderRule : '',
          borderRight: position.match(/Left/i) ? borderRule : '',
          borderLeft: position.match(/Right/i) ? borderRule : '',
        }}
      >
        <SideCornerTexts
          top={topLeftText}
          bottom={bottomLeftText}
          side="left"
        />
        <CenterText centerText={centerText} />
        <SideCornerTexts
          top={topRightText}
          bottom={bottomRightText}
          side="right"
        />
      </Grid>
    </Tooltip>
  )
}

const useStyles = makeStyles((theme: LexicoTheme) => ({
  tooltip: {
    maxWidth: theme.custom.cardWidth / 2,
    fontSize: 14,
    textAlign: 'center',
  },
  formCell: {
    background: theme.palette.background.paper,
    height: 48,
    position: 'relative',
  },
}))
