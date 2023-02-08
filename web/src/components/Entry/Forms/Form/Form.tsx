import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

import { Identifier } from 'src/utils/identifiers'
import { normalize } from 'src/utils/string'

import { CenterText } from './CenterText'
import { Sidebar } from './Sidebar'

export type FormCellPosition =
  | 'topLeft'
  | 'topRight'
  | 'midLeft'
  | 'midRight'
  | 'bottomLeft'
  | 'bottomRight'

type Props = {
  position?: FormCellPosition
  centerText: string
  topLeftText?: Identifier
  topRightText?: Identifier
  bottomLeftText?: Identifier
  bottomRightText?: Identifier
  search?: string
}

export const Form = ({
  position,
  centerText,
  topLeftText,
  topRightText,
  bottomLeftText,
  bottomRightText,
  search,
}: Props) => {
  const theme = useTheme()
  const border = '0.5px solid rgba(255, 255, 255, 0.12)'
  const isSearched = normalize(centerText) === search

  return (
    <Tooltip
      title={
        centerText?.length > 38 || centerText.split('\n').length > 2
          ? centerText
          : ''
      }
      placement="top"
      arrow
      aria-label={centerText}
      sx={{
        '&.MuiTooltip-tooltip': {
          maxWidth: theme.custom.card.maxWidth / 2,
          fontSize: 14,
          textAlign: 'center',
        },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        wrap="nowrap"
        sx={{
          background: isSearched
            ? theme.palette.grey['900']
            : theme.palette.background.paper,
          height: 48,
          position: 'relative',
          borderTop: position?.match(/bottom|mid/i) ? border : '',
          borderBottom: position?.match(/top|mid/i) ? border : '',
          borderRight: position?.match(/Left/i) ? border : '',
          borderLeft: position?.match(/Right/i) ? border : '',
        }}
      >
        <Sidebar top={topLeftText} bottom={bottomLeftText} side="left" />
        <CenterText centerText={centerText} />
        <Sidebar top={topRightText} bottom={bottomRightText} side="right" />
      </Grid>
    </Tooltip>
  )
}
