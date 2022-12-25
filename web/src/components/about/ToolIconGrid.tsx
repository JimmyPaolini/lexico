import { useState } from 'react'

import Image from 'next/image'

import {
  Box,
  CardActionArea,
  CardHeader as CardHeaderMui,
  Collapse,
  Grid,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Link } from 'src/components/accessories/Link'
import { tools } from 'src/utils/tools'

import { ExpandIcon } from '../accessories/ExpandIcon'

export const ToolIconGrid = () => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <CardActionArea
        onClick={() => setExpanded((expanded) => !expanded)}
        disableRipple
        disableTouchRipple
      >
        <CardHeaderMui
          title="Frameworks, Libraries, and Tools"
          titleTypographyProps={{ variant: 'body1' }}
          sx={{ paddingTop: 0, paddingBottom: 0, padding: theme.spacing(1) }}
          action={
            <Box p={1.5} mt={1} mr={1}>
              <ExpandIcon expanded={expanded} />
            </Box>
          }
        />
      </CardActionArea>
      <Collapse in={expanded} appear>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ padding: theme.spacing(1) }}
        >
          {tools.map((tool) => (
            <Grid item key={tool.name}>
              <Link
                href={tool.url}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={64}
                  height={64}
                  priority
                  loading="eager"
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  )
}
