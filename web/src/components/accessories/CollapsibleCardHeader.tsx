import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react'

import {
  CardActionArea,
  CardContent,
  CardHeader,
  Collapse,
} from '@mui/material'

import { ExpandIcon } from './ExpandIcon'

type Props = PropsWithChildren<
  ComponentProps<typeof CardHeader> & {
    expandedInitial?: boolean
    cardActionAreaProps?: ComponentProps<typeof CardActionArea>
    cardContentProps?: ComponentProps<typeof CardContent>
    collapseProps?: ComponentProps<typeof Collapse>
  }
>

export const CollapsibleCardHeader = ({
  expandedInitial = false,
  children,
  cardActionAreaProps,
  collapseProps,
  cardContentProps,
  ...cardHeaderProps
}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(expandedInitial)
  useEffect(() => {
    setExpanded(expandedInitial)
  }, [expandedInitial])

  return (
    <>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
        {...cardActionAreaProps}
      >
        <CardHeader
          titleTypographyProps={{
            variant: 'h5',
            ...cardHeaderProps.titleTypographyProps,
          }}
          subheaderTypographyProps={{
            variant: 'subtitle1',
            ...cardHeaderProps.subheaderTypographyProps,
          }}
          action={<ExpandIcon expanded={expanded} />}
          {...cardHeaderProps}
        />
      </CardActionArea>
      <Collapse in={expanded} {...collapseProps}>
        <CardContent {...cardContentProps}>{children}</CardContent>
      </Collapse>
    </>
  )
}
