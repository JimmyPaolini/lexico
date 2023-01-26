import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { Identifier } from '../../../utils/identifiers'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { IdentifierPill } from '../../accessories/Pills/IdentifierPill'

type Props = {
  expandedInitial?: boolean
  id: string
  title: string
  description: string
  identifiers: { id: Identifier; title: string; description: string }[]
}

export const IdentifierCard = ({
  expandedInitial,
  id,
  title,
  description,
  identifiers,
}: Props) => {
  return (
    <Card key={id}>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={title}
        subheader={description}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <List>
          {identifiers.map((identifier) => (
            <ListItem key={identifier.id}>
              {identifier.id && (
                <ListItemIcon
                  sx={{
                    marginRight: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <IdentifierPill identifier={identifier.id as Identifier} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={identifier.title}
                secondary={identifier.description}
              />
            </ListItem>
          ))}
        </List>
      </CollapsibleCardHeader>
    </Card>
  )
}
