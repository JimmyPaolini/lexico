import { abbreviateIdentifier } from 'src/utils/identifierAbbreviations'
import identifierColors from 'src/utils/identifierColors'

import Pill from './Pill'

type Props = { identifier: keyof typeof identifierColors }

export default function IdentifierPill({ identifier }: Props) {
  return (
    <Pill {...identifierColors[identifier]}>
      {abbreviateIdentifier[identifier]}
    </Pill>
  )
}
