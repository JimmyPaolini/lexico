import { Card, Divider } from '@mui/material'

import { NounFormsTable } from 'src/components/Entry/Forms/PartsOfSpeech/NounFormsTable'
import { NounForms } from 'src/graphql/generated'

import { CollapsibleCardHeader } from '../../accessories/CollapsibleCardHeader'
import { PartOfSpeech } from '../../accessories/Icons/PartOfSpeech'

type Props = {
  expandedInitial?: boolean
  id: string
  title: string
  description: string
  forms: NounForms
}

export const NounDeclensionCard = ({
  expandedInitial,
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
        avatar={<PartOfSpeech partOfSpeech="noun" />}
        cardContentProps={{
          sx: { padding: 0, '&:last-child': { padding: 0 } },
        }}
      >
        <Divider variant="middle" />
        <NounFormsTable forms={forms} />
      </CollapsibleCardHeader>
    </Card>
  )
}
