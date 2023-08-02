import { useState } from 'react'

import { Card, Divider, Tab, Tabs, Typography } from '@mui/material'

import { AdjectiveFormsTable } from '../../Entry/Forms/PartsOfSpeech/AdjectiveFormsTable'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { Identifier } from '../../accessories/Identifier/Identifier'
import { adjectiveGrammarData } from './AdjectiveGrammar.constants'

type Props = { expandedInitial?: boolean }

export const AdjectiveGrammar = ({ expandedInitial = false }: Props) => {
  const [tab, setTab] = useState(0)

  return (
    <Card>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={'Adjectives'}
        subheader={'Declensions, Endings, Translations'}
        avatar={<Identifier identifier="adjective" />}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <Tabs
          value={tab}
          onChange={(_: unknown, tab: number) => setTab(tab)}
          variant="fullWidth"
          aria-label="adjective declensions"
        >
          {adjectiveGrammarData.map((adjectiveGrammarData) => (
            <Tab
              key={adjectiveGrammarData.id}
              label={adjectiveGrammarData.id}
              aria-label={adjectiveGrammarData.id}
              sx={{ minWidth: 0, padding: 0 }}
            />
          ))}
        </Tabs>
        <Typography align="center" variant="h6">
          {adjectiveGrammarData[tab].title}
        </Typography>
        <Typography align="center" variant="subtitle1" gutterBottom>
          {adjectiveGrammarData[tab].description}
        </Typography>
        <AdjectiveFormsTable forms={adjectiveGrammarData[tab].forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
