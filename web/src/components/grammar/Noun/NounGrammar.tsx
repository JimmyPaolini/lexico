import { useState } from 'react'

import { Card, Divider, Tab, Tabs, Typography, useTheme } from '@mui/material'

import { NounFormsTable } from '../../Entry/Forms/PartsOfSpeech/NounFormsTable'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { nounGrammarData } from './NounGrammar.constants'

type Props = { expandedInitial?: boolean }

export const NounGrammar = ({ expandedInitial = false }: Props) => {
  const theme = useTheme()
  const [tab, setTab] = useState(0)

  return (
    <Card>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={'Nouns'}
        subheader={'Declensions, Endings, Translations'}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <Tabs
          value={tab}
          onChange={(_: unknown, tab: number) => setTab(tab)}
          textColor="secondary"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          {nounGrammarData.map((nounGrammarData) => (
            <Tab
              key={nounGrammarData.id}
              label={nounGrammarData.id}
              sx={{ minWidth: 0, padding: 0, maxWidth: theme.spacing(7) }}
            />
          ))}
        </Tabs>
        <Typography align="center" variant="h6">
          {nounGrammarData[tab].title}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {nounGrammarData[tab].description}
        </Typography>
        <NounFormsTable forms={nounGrammarData[tab].forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
