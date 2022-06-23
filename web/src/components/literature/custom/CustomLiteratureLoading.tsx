import { memo } from 'react'

import { CircularProgress, Divider, ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

const PREFIX = 'CustomLiteratureLoading'

const classes = {
  divider: `${PREFIX}-divider`,
  row: `${PREFIX}-row`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.divider}`]: {
    marginRight: theme.spacing(1),
  },

  [`& .${classes.row}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default memo(function CustomLiteratureLoading() {
  return (
    <Root>
      <Divider className={classes.divider} />
      <ListItem className={classes.row}>
        <CircularProgress size={32} thickness={5.4} />
      </ListItem>
    </Root>
  )
})
