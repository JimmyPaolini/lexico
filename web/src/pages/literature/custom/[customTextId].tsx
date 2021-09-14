import { GetServerSideProps } from "next"
import { memo } from "react"
import useGetCustomText from "../../../hooks/user/useGetCustomText"
import { CustomText, getCustomTextLocal } from "../../../utils/literatureLocal"
import CustomReaderNew from "../custom"

interface CustomReaderEditProps {
  id: string
}
export default memo(function CustomReaderEdit({
  id,
}: CustomReaderEditProps): JSX.Element {
  const { data: userText, isSuccess } = useGetCustomText(id)
  const localText = getCustomTextLocal(id)
  const text = (isSuccess ? userText : localText) as CustomText
  return !text ? <></> : <CustomReaderNew text={text} />
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}
