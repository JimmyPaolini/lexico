import { ExpandMore } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

const PREFIX = 'ExpandIcon'

const classes = {
  rightSideUp: `${PREFIX}-rightSideUp`,
  upSideDown: `${PREFIX}-upSideDown`,
}

const StyledExpandMore = styled(ExpandMore)(() => ({
  [`& .${classes.rightSideUp}`]: {
    transition: '250ms ease',
    transform: 'rotateZ(0deg)',
  },

  [`& .${classes.upSideDown}`]: {
    transition: '250ms ease',
    transform: 'rotateZ(-180deg)',
  },
}))

type Props = {
  expanded: boolean
  [key: string]: any
}

export default function ExpandIcon({ expanded, ...props }: Props) {
  const direction = expanded ? classes.upSideDown : classes.rightSideUp
  return <StyledExpandMore className={direction} {...props} />
}
