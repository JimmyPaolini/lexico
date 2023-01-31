import { Pill, PillVariant } from './Pill'
import { abbreviateIdentifier } from './identifierAbbreviations'
import { identifierStyles } from './identifierStyles'
import { Identifier } from './identifierTypes'

type Props = { identifier: Identifier; variant?: PillVariant }

export const IdentifierPill = ({ identifier, variant }: Props) => {
  return (
    <Pill {...identifierStyles[identifier]} variant={variant}>
      {abbreviateIdentifier[identifier]}
    </Pill>
  )
}
