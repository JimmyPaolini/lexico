import { PropsWithChildren } from 'react'

import { Typography } from '@mui/material'

import { IdentifierStyles } from './identifierStyles'

export enum PillVariant {
  REGULAR,
  SMALL,
}

type Props = PropsWithChildren<IdentifierStyles & { variant?: PillVariant }>

export default function Pill({
  variant,
  children,
  ...identifierStyles
}: Props) {
  return (
    <Typography
      variant="caption"
      noWrap
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 500,
        ...identifierStyles,
        ...(variant === PillVariant.SMALL
          ? {
              height: '16px',
              fontSize: '0.625rem',
              borderRadius: '8px',
              margin: 'auto 0px',
              padding: '0px 3px',
            }
          : {
              height: '20px',
              fontSize: '0.875rem',
              borderRadius: '10px',
              padding: '0px 6px',
              margin: 'auto 2px',
            }),
      }}
    >
      {children}
    </Typography>
  )
}
