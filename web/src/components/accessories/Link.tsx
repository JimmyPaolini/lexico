import { ComponentProps } from 'react'

import NextLink from 'next/link'

type Props = ComponentProps<typeof NextLink>

export function Link(props: Props) {
  return <NextLink {...props} />
}
