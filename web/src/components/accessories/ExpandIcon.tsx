import { ComponentProps } from 'react'

import ExpandMore from '@mui/icons-material/ExpandMore'

type Props = { expanded: boolean } & ComponentProps<typeof ExpandMore>

export const ExpandIcon = ({ expanded, ...props }: Props) => {
  const transform = expanded ? 'rotateZ(-180deg)' : 'rotateZ(0deg)'
  return (
    <ExpandMore
      {...props}
      sx={{ transition: '250ms ease', transform, ...props.sx }}
    />
  )
}
