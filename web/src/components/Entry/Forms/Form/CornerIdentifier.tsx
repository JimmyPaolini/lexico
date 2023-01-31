import Typography from '@mui/material/Typography'

import { Identifier } from 'src/components/accessories/Pills/identifierTypes'

import { IdentifierPill } from '../../../accessories/Pills/IdentifierPill'
import { PillVariant } from '../../../accessories/Pills/Pill'

type Props = { identifier?: Identifier }

export const CornerIdentifier = ({ identifier }: Props) => {
  return !identifier ? null : (
    <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
      <IdentifierPill identifier={identifier} variant={PillVariant.SMALL} />
    </Typography>
  )
}
