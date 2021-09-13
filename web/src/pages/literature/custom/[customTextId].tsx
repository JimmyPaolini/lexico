import { GetServerSideProps } from "next"
import { memo } from "react"
import { useGetCustomTextQuery } from "../../../graphql/generated"
import { CustomText, getCustomTextLocal } from "../../../utils/literatureLocal"
import CustomReaderNew from "../custom"

interface CustomReaderEditProps {
  id: string
}
export default memo(function CustomReaderEdit({
  id,
}: CustomReaderEditProps): JSX.Element {
  const { data: userText, isSuccess } = useGetCustomTextQuery({ id })
  const localText = getCustomTextLocal(id)
  const text = (isSuccess ? userText : localText) as CustomText
  return !text ? <></> : <CustomReaderNew text={text} />
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}
