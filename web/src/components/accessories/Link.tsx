// https://gist.github.com/kachar/028b6994eb6b160e2475c1bb03e33e6a#file-linkmuiv5-tsx
import NextLink from 'next/link'

import { LinkProps, Link as MuiLink } from '@mui/material'

export function Link(props: LinkProps<'a'>) {
  return (
    <MuiLink
      component={NextLink}
      style={{ textDecoration: 'none', color: 'inherit' }}
      {...props}
    />
  )
}
