import { ComponentProps, PropsWithChildren } from 'react'

import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { SearchBar } from '../search/SearchBar'

type Props = PropsWithChildren<ComponentProps<typeof SearchBar>>

export const SearchBarLayout = ({ children, ...props }: Props) => {
  const theme = useTheme()
  return (
    <Grid container direction="column" alignItems="stretch">
      <Grid
        container
        justifyContent="center"
        sx={{ margin: `${theme.spacing(4)} 0px` }}
      >
        <SearchBar {...props} />
      </Grid>
      <Grid
        container
        justifyContent="center"
        sx={{ margin: `${theme.spacing(4)} 0px` }}
      >
        {children}
      </Grid>
    </Grid>
  )
}
