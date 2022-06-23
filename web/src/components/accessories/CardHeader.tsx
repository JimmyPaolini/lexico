import React, { ComponentProps, useContext } from 'react'

import { Menu } from '@mui/icons-material'
import { CardHeader as CardHeaderMui, IconButton } from '@mui/material'

import { Context } from '../layout/Context'

type Props = { title: string } & ComponentProps<typeof CardHeaderMui>

export default function CardHeader({ title, ...props }: Props) {
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  return (
    <CardHeaderMui
      title={title}
      titleTypographyProps={{ variant: 'h4', align: 'center' }}
      avatar={
        isMobile && (
          <IconButton
            onClick={() => setNavOpen(!isNavOpen)}
            aria-label="menu"
            size="large"
          >
            <Menu />
          </IconButton>
        )
      }
      action={
        isMobile && (
          <IconButton
            onClick={() => null}
            aria-label="empty space"
            sx={{ marginTop: 8, marginRight: 8, visibility: 'hidden' }}
            size="large"
          >
            <Menu />
          </IconButton>
        )
      }
      {...props}
    />
  )
}
