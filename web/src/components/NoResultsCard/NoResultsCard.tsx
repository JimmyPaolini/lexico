import Error from '@mui/icons-material/Error'
import { Card, CardHeader } from '@mui/material'

type Props = { search?: string }
export const NoResultsCard = ({ search }: Props) => {
  let subheader = 'No results'
  if (search) subheader += ` for search "${search}"`
  return (
    <Card>
      <CardHeader
        title="Nescītur"
        titleTypographyProps={{ variant: 'h4' }}
        subheader={subheader}
        subheaderTypographyProps={{ variant: 'subtitle1' }}
        avatar={<Error fontSize="large" />}
      />
    </Card>
  )
}
