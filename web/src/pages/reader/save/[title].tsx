import { GetServerSideProps } from "next"
import { memo } from "react"
import { getLiteratureLocal } from "../../../utils/localLiterature"
import CustomReaderNew from "../save"

interface CustomReaderEditProps {
  title: string
}
export default memo(function CustomReaderEdit({
  title,
}: CustomReaderEditProps): JSX.Element {
  const customText = getLiteratureLocal(title)
  return <CustomReaderNew text={customText} />
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { title: params?.title } }
}
