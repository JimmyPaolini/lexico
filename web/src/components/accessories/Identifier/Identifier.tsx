import { ComponentProps } from 'react'

import { Box, Tooltip } from '@mui/material'

import { abbreviateIdentifier } from './Identifier.constants'
import { identifierStyles } from './Identifier.styles'
import { Identifier as IdentifierType } from './Identifier.types'
import { Pill, PillVariant } from './Pill'

type Props = ComponentProps<typeof Pill> & {
  identifier: IdentifierType
  pillVariant?: PillVariant
}

export const Identifier = ({ identifier, pillVariant, ...props }: Props) => {
  return (
    <Tooltip title={identifier} enterDelay={500} placement="top" arrow>
      {/* Box here so that Tooltip can forwardRef to it */}
      <Box>
        <Pill
          pillVariant={pillVariant}
          {...props}
          sx={{ ...identifierStyles[identifier], ...props.sx }}
        >
          {abbreviateIdentifier[identifier]}
        </Pill>
      </Box>
    </Tooltip>
  )
}
