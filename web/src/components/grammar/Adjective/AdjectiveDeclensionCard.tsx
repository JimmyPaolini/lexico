import { Card, Divider } from '@mui/material'

import { AdjectiveFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/AdjectiveFormsTable'
import { CollapsibleCardHeader } from 'src/components/accessories/CollapsibleCardHeader'
import { AdjectiveForms } from 'src/graphql/generated'

import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'

type Props = {
  expandedInitial?: boolean
  id: string
  title: string
  description: string
  forms: AdjectiveForms
}

export const AdjectiveDeclensionCard = ({
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
        avatar={<PartOfSpeech partOfSpeech="adjective" />}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <AdjectiveFormsTable forms={forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
