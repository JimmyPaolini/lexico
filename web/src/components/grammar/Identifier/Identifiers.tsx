import { useState } from 'react'

import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material'

import { Identifier } from '../../../utils/identifiers'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { Identifier } from '../../accessories/Identifier/Identifier'
import { identifiersData } from './Identifiers.constants'

type Props = { expandedInitial?: boolean }

export const Identifiers = ({ expandedInitial = false }: Props) => {
  const theme = useTheme()
  const [tab, setTab] = useState(0)

  return (
    <Card sx={{ transition: theme.transitions.create(['all']) }}>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={'Icon Guide'}
        subheader={'Identifier Abbreviations'}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <Tabs
          value={tab}
          onChange={(_: unknown, tab: number) => setTab(tab)}
          variant="fullWidth"
          aria-label="identifiers"
        >
          {identifiersData.map((identifierData) => (
            <Tab
              key={identifierData.id}
              label={
                <Identifier
                  identifier={identifierData.identifiers[0].id as Identifier}
                />
              }
              aria-label={identifierData.id}
              sx={{ minWidth: 0, padding: 0, flexBasis: 'auto' }}
            />
          ))}
        </Tabs>
        <Typography align="center" variant="h6">
          {identifiersData[tab].title}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {identifiersData[tab].description}
        </Typography>
        <Divider variant="middle" />
        <List
          sx={{
            transition: theme.transitions.create(['all']),
            height: identifiersData[tab].height,
          }}
        >
          {identifiersData[tab].identifiers.map((identifier) => (
            <ListItem key={identifier.id}>
              {identifier.id && (
                <ListItemIcon
                  sx={{
                    marginRight: 2,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Identifier identifier={identifier.id as Identifier} />
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
