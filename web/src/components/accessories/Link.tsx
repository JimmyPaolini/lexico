// https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a#file-linkmuiv5-tsx
import { forwardRef } from 'react'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import { Link as LinkMUI, LinkProps as LinkMUIProps } from '@mui/material'

export type LinkProps = Omit<LinkMUIProps, 'href' | 'classes'> &
  Pick<NextLinkProps, 'href' | 'as' | 'prefetch'>

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, as, prefetch, ...props }, ref) => (
    <NextLink
      href={href}
      as={as}
      prefetch={prefetch}
      passHref
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <LinkMUI
        ref={ref}
        sx={{ textDecoration: 'none', color: 'inherit' }}
        {...props}
      />
    </NextLink>
  )
)

Link.displayName = 'Link'

export { Link }
