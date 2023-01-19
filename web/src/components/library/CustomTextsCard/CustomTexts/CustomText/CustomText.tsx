import { ListItem, ListItemButton, ListItemText } from '@mui/material'

import { Link } from 'src/components/accessories/Link'
import { CustomText as CustomTextGql } from 'src/graphql/generated'

import { Options } from './Options'

type Props = {
  text: CustomTextGql
  refreshCustomTexts: () => Promise<void>
}
export const CustomText = ({ text, refreshCustomTexts }: Props) => {
  return (
    <Link href={`/userText/${encodeURIComponent(text.id)}`}>
      <ListItem sx={{ padding: 0 }}>
        <ListItemButton>
          <ListItemText
            primary={text.title}
            primaryTypographyProps={{ variant: 'body1' }}
          />
          <Options {...{ text, refreshCustomTexts }} />
        </ListItemButton>
      </ListItem>
    </Link>
  )
}
