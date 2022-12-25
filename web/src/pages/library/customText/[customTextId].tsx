import { GetServerSideProps } from 'next'

import { getCustomTextLocal } from 'src/components/library/CustomTextsCard/CustomTexts'
import { CustomText, useCustomTextQuery } from 'src/graphql/generated'

import CustomReaderNew from '../customText'

type Props = { id: string }

export default function CustomReaderEdit({ id }: Props) {
  const { data, isSuccess } = useCustomTextQuery({ id })
  const localText = getCustomTextLocal(id)
  const remoteText = data?.customText
  const text = (isSuccess ? remoteText : localText) as CustomText
  return !text ? <></> : <CustomReaderNew text={text} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}
