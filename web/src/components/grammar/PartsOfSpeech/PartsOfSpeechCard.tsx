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
import { partsOfSpeechCardData } from './PartsOfSpeechCard.constants'

type Props = { expandedInitial?: boolean }

export const PartsOfSpeechCard = ({ expandedInitial }: Props) => {
  return (
    <Card>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={partsOfSpeechCardData.title}
        subheader={partsOfSpeechCardData.description}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <List>
          {partsOfSpeechCardData.partsOfSpeech.map((partOfSpeech) => (
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
