import { ComponentProps } from 'react'

import { ExpandMore } from '@mui/icons-material'

type Props = { expanded: boolean } & ComponentProps<typeof ExpandMore>

export default function ExpandIcon({ expanded, ...props }: Props) {
  const transform = expanded ? 'rotateZ(-180deg)' : 'rotateZ(0deg)'
  return <ExpandMore sx={{ transition: '250ms ease', transform }} {...props} />
}
