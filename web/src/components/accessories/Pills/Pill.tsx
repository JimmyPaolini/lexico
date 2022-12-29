import { PropsWithChildren } from 'react'

import { Typography } from '@mui/material'

import { IdentifierStyles } from './identifierStyles'

export enum PillVariant {
  REGULAR,
  SMALL,
}

type Props = PropsWithChildren<IdentifierStyles & { variant?: PillVariant }>

export const Pill = ({ variant, children, ...identifierStyles }: Props) => {
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
              minWidth: '16px',
              borderRadius: '8px',
              fontSize: '0.625rem',
              padding: '0px 3px',
              margin: 'auto 0px',
            }
          : {
              height: '20px',
              minWidth: '20px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              padding: '0px 6px',
              margin: 'auto 2px',
            }),
      }}
    >
      {children}
    </Typography>
  )
}
