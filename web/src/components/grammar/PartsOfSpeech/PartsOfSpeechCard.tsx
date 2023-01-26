import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'

type Props = {
  expandedInitial?: boolean
  id: string
  title: string
  description: string
  partsOfSpeech: { id: string; title: string; description: string }[]
}

export const PartsOfSpeechCard = ({
  expandedInitial,
  id,
  title,
  description,
  partsOfSpeech,
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
          {partsOfSpeech.map((partOfSpeech) => (
            <ListItem key={partOfSpeech.id}>
              {partOfSpeech.id && (
                <ListItemIcon
                  sx={{
                    marginRight: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <PartOfSpeech partOfSpeech={partOfSpeech.id} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={partOfSpeech.title}
                secondary={partOfSpeech.description}
              />
            </ListItem>
          ))}
        </List>
      </CollapsibleCardHeader>
    </Card>
  )
}
