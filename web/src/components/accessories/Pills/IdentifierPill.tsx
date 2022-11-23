import { Identifier, abbreviateIdentifier } from 'src/utils/identifiers'

import Pill, { PillVariant } from './Pill'
import { identifierStyles } from './identifierStyles'

type Props = { identifier: Identifier; variant?: PillVariant }

export default function IdentifierPill({ identifier, variant }: Props) {
  return (
    <Pill {...identifierStyles[identifier]} variant={variant}>
      {abbreviateIdentifier[identifier]}
    </Pill>
  )
}
