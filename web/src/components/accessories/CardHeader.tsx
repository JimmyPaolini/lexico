import { ComponentProps } from 'react'

import { Menu } from '@mui/icons-material'
import { CardHeader as CardHeaderMui, IconButton } from '@mui/material'

import { useLexicoContext } from 'src/components/layout/LexicoContext'

type Props = { title: string } & ComponentProps<typeof CardHeaderMui>

export const CardHeader = ({ title, ...props }: Props) => {
  const { isMobile, isNavOpen, setNavOpen } = useLexicoContext()

  return (
    <CardHeaderMui
      title={title}
      titleTypographyProps={{
        variant: 'h4',
        align: 'center',
        ...props.titleTypographyProps,
      }}
      subheaderTypographyProps={{
        align: 'center',
        ...props.subheaderTypographyProps,
      }}
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
            sx={{ visibility: 'hidden' }}
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
