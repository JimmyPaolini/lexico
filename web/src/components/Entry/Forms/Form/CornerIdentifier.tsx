import Typography from '@mui/material/Typography'

import {
  Identifier,
  IdentifierType,
  PillVariant,
} from 'src/components/accessories/Identifier'

type Props = { identifier?: IdentifierType }

export const CornerIdentifier = ({ identifier }: Props) => {
  return !identifier ? null : (
    <Typography variant="caption" sx={{ lineHeight: 1.2 }}>
      <Identifier identifier={identifier} pillVariant={PillVariant.SMALL} />
    </Typography>
  )
}
