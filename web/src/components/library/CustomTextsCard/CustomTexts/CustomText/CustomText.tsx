import Link from 'next/link'

import { ListItemButton, ListItemText } from '@mui/material'

import { CustomText as CustomTextGql } from 'src/graphql/generated'

import { Options } from './Options'

type Props = {
  text: CustomTextGql
  refreshCustomTexts: () => Promise<void>
}
export const CustomText = ({ text, refreshCustomTexts }: Props) => {
  return (
    <Link
      href={`/reader/customText/${text.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItemButton>
        <ListItemText
          primary={text.title}
          primaryTypographyProps={{ variant: 'body1' }}
        />
        <Options {...{ text, refreshCustomTexts }} />
      </ListItemButton>
    </Link>
  )
}
