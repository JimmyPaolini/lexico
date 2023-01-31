import { useState } from 'react'

import { Card, Divider, Tab, Tabs, Typography } from '@mui/material'

import { AdjectiveFormsTable } from '../../Entry/Forms/PartsOfSpeech/AdjectiveFormsTable'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'
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
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        avatar={<PartOfSpeech partOfSpeech="adjective" />}
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
          {adjectiveGrammarData.map((adjectiveGrammarData) => (
            <Tab
              key={adjectiveGrammarData.id}
              label={adjectiveGrammarData.id}
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
