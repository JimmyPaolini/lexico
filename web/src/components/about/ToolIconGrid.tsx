import Image from 'next/image'

import { Grid } from '@mui/material'

import { TOOLS } from 'src/components/about/ToolIconGrid.constants'
import { Link } from 'src/components/accessories/Link'

import { CollapsibleCardHeader } from '../accessories/CollapsibleCardHeader'

export const ToolIconGrid = () => {
  return (
    <CollapsibleCardHeader
      title="Frameworks, Libraries, and Tools"
      expandedInitial
    >
      <Grid container spacing={1} justifyContent="space-between">
        {TOOLS.map((tool) => (
          <Grid item key={tool.name}>
            <Link href={tool.url} target="_blank">
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
    </CollapsibleCardHeader>
  )
}
