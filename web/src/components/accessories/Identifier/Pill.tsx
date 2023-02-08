import { ComponentProps } from 'react'

import { Typography } from '@mui/material'

export enum PillVariant {
  REGULAR = 'regular',
  SMALL = 'small',
}

type Props = ComponentProps<typeof Typography> & { pillVariant?: PillVariant }

export function Pill({
  pillVariant = PillVariant.REGULAR,
  children,
  ...props
}: Props) {
  return (
    <Typography
      variant="caption"
      noWrap
      {...props}
      sx={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 500,
        userSelect: 'none',
        cursor: 'inherit',
        ...(pillVariant === PillVariant.SMALL
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
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  )
}
