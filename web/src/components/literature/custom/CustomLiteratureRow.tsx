import { memo } from 'react'

import { Divider, ListItem, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

import { CustomText } from '../../../utils/literatureLocal'
import CustomLiteratureOptions from './CustomLiteratureOptions'

const PREFIX = 'CustomLiteratureRow'

const classes = {
  divider: `${PREFIX}-divider`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(({ theme }) => ({
  [`& .${classes.divider}`]: {
    marginRight: theme.spacing(1),
  },
}))

type Props = {
  text: CustomText
  refreshCustomTexts: () => Promise<void>
}
export default memo(function CustomLiteratureRow({
  text,
  refreshCustomTexts,
}: Props) {
  const router = useRouter()

  return (
    <Root>
      <Divider className={classes.divider} />
      <ListItem button onClick={() => router.push(`/reader/custom/` + text.id)}>
        <ListItemText
          primary={text.title}
          primaryTypographyProps={{ variant: 'body1' }}
        />
        <CustomLiteratureOptions {...{ text, refreshCustomTexts }} />
      </ListItem>
    </Root>
  )
})
