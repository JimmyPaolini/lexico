import React, { useContext } from 'react'

import { Menu } from '@mui/icons-material'
import { CardHeader as CardHeaderMui, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Context } from '../layout/Context'

const PREFIX = 'CardHeader'

const classes = {
  hiddenAction: `${PREFIX}-hiddenAction`,
}

const StyledIconButton = styled(IconButton)(() => ({
  [`& .${classes.hiddenAction}`]: {
    marginTop: 8,
    marginRight: 8,
    visibility: 'hidden',
  },
}))

type Props = {
  title: string
  [key: string]: any
}

export default function CardHeader({ title, ...props }: Props) {
  const { isMobile, isNavOpen, setNavOpen } = useContext(Context)

  return (
    <CardHeaderMui
      title={title}
      titleTypographyProps={{ variant: 'h4', align: 'center' }}
      avatar={
        isMobile && (
          <StyledIconButton
            onClick={() => setNavOpen(!isNavOpen)}
            aria-label="menu"
            size="large"
          >
            <Menu />
          </StyledIconButton>
        )
      }
      action={
        isMobile && (
          <IconButton
            onClick={() => null}
            aria-label="empty space"
            className={classes.hiddenAction}
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
