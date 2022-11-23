import {
  Identifier,
  abbreviateIdentifier,
  identifierColors,
} from 'src/utils/identifiers'

import Pill from './Pill'

type Props = { identifier: Identifier }

export default function IdentifierPill({ identifier }: Props) {
  return (
    <Pill {...identifierColors[identifier]}>
      {abbreviateIdentifier[identifier]}
    </Pill>
  )
}
