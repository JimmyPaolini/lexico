import { GetServerSideProps } from "next"
import { memo } from "react"
import Author from "../../../../../entity/literature/Author"
import Book from "../../../../../entity/literature/Book"
import Text from "../../../../../entity/literature/Text"
import useGetCustomText from "../../../hooks/user/useGetCustomText"
import { CustomText, getCustomTextLocal } from "../../../utils/literatureLocal"
import Reader from "../[textId]"

interface CustomReaderProps {
  id: string
}
export default memo(function CustomReader({
  id,
}: CustomReaderProps): JSX.Element {
  const { data: userText, isSuccess } = useGetCustomText(id)
  const localText = getCustomTextLocal(id)
  const text = (isSuccess ? userText : localText) as CustomText
  return !text ? <></> : <Reader text={customTextToText(text)} />
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return { props: { id: params?.customTextId } }
}

function customTextToText({ id, title, text, local }: CustomText): Text {
  const customText = {
    id,
    title,
    author: { id: "custom", name: "custom" } as Author,
    book: (local
      ? { id: "local", title: "local" }
      : { id: "user", title: "user" }) as Book,
    lines: [],
    linesSlice: () => [],
  }
  customText.author.texts = [customText as never]
  customText.book.author = customText.author
  customText.book.texts = [customText as never]
  customText.lines = text.split("\n").map((line, i) => {
    return {
      id: `${i}`,
      line: line.replace(/^#\S+ ?/, ""),
      lineNumber: i + 1,
      lineLabel: line.match(/^#\S+/)?.[0].slice(1) || `${i + 1}`,
      text: customText,
    }
  }) as never[]
  return customText
}
