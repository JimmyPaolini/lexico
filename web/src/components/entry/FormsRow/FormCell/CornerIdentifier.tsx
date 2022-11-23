import Typography from '@mui/material/Typography'

import { Identifier } from 'src/utils/identifiers/types'

import IdentifierPill from '../../../accessories/Pills/IdentifierPill'

type Props = { identifier: Identifier }

export default function CornerIdentifier({ identifier }: Props) {
  return (
    <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
      <IdentifierPill identifier={identifier} />
    </Typography>
  )
}
