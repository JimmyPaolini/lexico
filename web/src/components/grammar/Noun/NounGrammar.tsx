import { useState } from 'react'

import { Card, Divider, Tab, Tabs, Typography } from '@mui/material'

import { NounFormsTable } from '../../Entry/Forms/PartsOfSpeech/NounFormsTable'
import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'
import { nounGrammarData } from './NounGrammar.constants'

type Props = { expandedInitial?: boolean }

export const NounGrammar = ({ expandedInitial = false }: Props) => {
  const [tab, setTab] = useState(0)

  return (
    <Card>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title="Nouns"
        subheader="Declensions, Endings, Translations"
        avatar={<PartOfSpeech partOfSpeech="noun" />}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <Tabs
          value={tab}
          onChange={(_: unknown, tab: number) => setTab(tab)}
          variant="fullWidth"
          aria-label="noun declensions"
        >
          {nounGrammarData.map((nounGrammarData) => (
            <Tab
              key={nounGrammarData.id}
              label={nounGrammarData.id}
              aria-label={nounGrammarData.id}
              sx={{ minWidth: 0, padding: 0 }}
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
