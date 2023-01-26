import { Card, Divider } from '@mui/material'

import { VerbFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/VerbFormsTable'
import { VerbForms } from 'src/graphql/generated'

import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'

type Props = {
  expandedInitial?: boolean
  id: string
  title: string
  description: string
  forms: VerbForms
}

export const VerbConjugationCard = ({
  expandedInitial = false,
  id,
  title,
  description,
  forms,
}: Props) => {
  return (
    <Card key={id}>
      <CollapsibleCardHeader
        expandedInitial={expandedInitial}
        title={title}
        subheader={description}
        avatar={<PartOfSpeech partOfSpeech="verb" />}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <VerbFormsTable forms={forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
