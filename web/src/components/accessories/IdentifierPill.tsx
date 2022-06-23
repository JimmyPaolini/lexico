import identifierAbbreviations from 'src/utils/identifierAbbreviations'
import identifierColors from 'src/utils/identifierColors'

import Pill from './Pill'

type Props = { identifier: keyof typeof identifierColors }

export default function IdentifierPill({ identifier }: Props) {
  const { backgroundColor, color } = identifierColors[identifier]
  return (
    <Pill {...{ backgroundColor, color }}>
      {identifierAbbreviations[identifier]}
    </Pill>
  )
}
